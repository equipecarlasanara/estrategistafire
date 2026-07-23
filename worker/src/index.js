// ============================================================
// A ESTRATEGISTA — Cloudflare Worker (Backend completo em JS)
// Substitui o backend Python/FastAPI para rodar 100% na Cloudflare
// ============================================================

// ---------- UTILITÁRIOS ----------

function uuid() {
  return crypto.randomUUID();
}

function now() {
  return new Date().toISOString();
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PATCH, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}

function error(message, status = 400) {
  return json({ detail: message }, status);
}

// ---------- AUTO SCHEMA MIGRATIONS (SQLITE D1) ----------

let dbInitialized = false;

async function ensureSchema(env) {
  if (dbInitialized) return;
  try {
    // 1. Create missing tables
    await env.DB.exec(`
      CREATE TABLE IF NOT EXISTS usage_tracking (
        user_id TEXT NOT NULL,
        feature TEXT NOT NULL,
        period TEXT NOT NULL,
        count INTEGER DEFAULT 0,
        PRIMARY KEY (user_id, feature, period)
      );
      CREATE TABLE IF NOT EXISTS image_history (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        image_url TEXT NOT NULL,
        prompt TEXT NOT NULL,
        created_at TEXT NOT NULL
      );
      CREATE TABLE IF NOT EXISTS objection_history (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        lead_id TEXT,
        image_url TEXT,
        gargalo TEXT NOT NULL,
        script TEXT NOT NULL,
        missao TEXT NOT NULL,
        created_at TEXT NOT NULL
      );
    `);

    // 2. Add missing columns to users table safely
    try {
      await env.DB.exec("ALTER TABLE users ADD COLUMN avatar_url TEXT;");
    } catch (_) {}
    try {
      await env.DB.exec("ALTER TABLE users ADD COLUMN google_drive_link TEXT;");
    } catch (_) {}
    try {
      await env.DB.exec("ALTER TABLE users ADD COLUMN is_admin INTEGER DEFAULT 0;");
    } catch (_) {}

    dbInitialized = true;
    console.log("D1 Database schema verified and updated successfully ✅");
  } catch (e) {
    console.error("Failed to ensure schema:", e);
  }
}

// ---------- JWT ----------

async function signJWT(payload, secret) {
  const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const body = btoa(JSON.stringify(payload));
  const data = `${header}.${body}`;
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(data));
  const sigB64 = btoa(String.fromCharCode(...new Uint8Array(sig)))
    .replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
  return `${data}.${sigB64}`;
}

async function verifyJWT(token, secret) {
  try {
    const [header, body, sig] = token.split(".");
    const data = `${header}.${body}`;
    const key = await crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["verify"]
    );
    const sigBytes = Uint8Array.from(atob(sig.replace(/-/g, "+").replace(/_/g, "/")), c => c.charCodeAt(0));
    const valid = await crypto.subtle.verify("HMAC", key, sigBytes, new TextEncoder().encode(data));
    if (!valid) return null;
    const payload = JSON.parse(atob(body));
    if (payload.exp && Date.now() / 1000 > payload.exp) return null;
    return payload;
  } catch {
    return null;
  }
}

// ---------- BCRYPT (via Web Crypto — PBKDF2) ----------
// Cloudflare Workers não tem bcrypt nativo, usamos PBKDF2 que é seguro

async function hashPassword(password) {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const saltHex = Array.from(salt).map(b => b.toString(16).padStart(2, "0")).join("");
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(password), "PBKDF2", false, ["deriveBits"]);
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", salt, iterations: 100000, hash: "SHA-256" },
    key, 256
  );
  const hashHex = Array.from(new Uint8Array(bits)).map(b => b.toString(16).padStart(2, "0")).join("");
  return `${saltHex}:${hashHex}`;
}

async function verifyPassword(password, stored) {
  const [saltHex, hashHex] = stored.split(":");
  const salt = Uint8Array.from(saltHex.match(/.{2}/g).map(h => parseInt(h, 16)));
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(password), "PBKDF2", false, ["deriveBits"]);
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", salt, iterations: 100000, hash: "SHA-256" },
    key, 256
  );
  const newHash = Array.from(new Uint8Array(bits)).map(b => b.toString(16).padStart(2, "0")).join("");
  return newHash === hashHex;
}

// ---------- AUTH MIDDLEWARE ----------

async function authenticate(request, env) {
  const auth = request.headers.get("Authorization");
  if (!auth || !auth.startsWith("Bearer ")) return null;
  const token = auth.slice(7);
  const payload = await verifyJWT(token, env.JWT_SECRET);
  return payload?.user_id || null;
}

// ---------- GEMINI AI ----------

async function callGemini(apiKey, model, systemMessage, history, userText, imageBase64 = null) {
  if (model.includes("image-generation") || model.startsWith("imagen-")) {
    const prompt = userText;
    const body = {
      instances: [
        { prompt }
      ],
      parameters: {
        sampleCount: 1,
        outputMimeType: "image/jpeg",
        aspectRatio: "1:1"
      }
    };
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-001:predict?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      }
    );
    const data = await res.json();
    if (!res.ok) throw new Error(data.error?.message || "Imagen API error");
    const imgBytes = data.predictions?.[0]?.bytesBase64Encoded;
    if (!imgBytes) throw new Error("Sem resposta da IA de imagem");
    return { text: "", images: [{ mimeType: "image/jpeg", data: imgBytes }] };
  }

  const contents = [];

  // Adicionar histórico
  for (const h of history) {
    contents.push({
      role: h.role === "model" ? "model" : "user",
      parts: Array.isArray(h.parts)
        ? h.parts.map(p => {
            if (typeof p === "string") return { text: p };
            if (p && typeof p === "object" && typeof p.text === "string") return { text: p.text };
            return { text: JSON.stringify(p) };
          })
        : [{ text: typeof h.parts === "string" ? h.parts : (h.parts?.text || JSON.stringify(h.parts)) }]
    });
  }

  // Mensagem atual
  const parts = [{ text: userText }];
  if (imageBase64) {
    let mimeType = "image/jpeg";
    let imgData = imageBase64;
    if (imageBase64.includes(",")) {
      const match = imageBase64.match(/data:(.*?);base64,/);
      if (match) mimeType = match[1];
      imgData = imageBase64.split(",")[1];
    }
    parts.push({ inlineData: { mimeType, data: imgData } });
  }
  contents.push({ role: "user", parts });

  const body = {
    contents,
    systemInstruction: systemMessage ? { parts: [{ text: systemMessage }] } : undefined,
    generationConfig: { temperature: 0.7 }
  };

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
    { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) }
  );

  const data = await res.json();
  if (!res.ok) throw new Error(data.error?.message || "Gemini API error");

  const candidate = data.candidates?.[0];
  if (!candidate) throw new Error("Sem resposta da IA");

  let text = "";
  const images = [];

  for (const part of candidate.content?.parts || []) {
    if (part.text) text += part.text;
    if (part.inlineData) images.push({ mimeType: part.inlineData.mimeType, data: part.inlineData.data });
  }

  return { text, images };
}

// ---------- SYSTEM PROMPTS ----------

const ESTRATEGISTA_SYSTEM = `Você é a "Estrategista Digital", mentorada por ANDRESSA MALLINSK. Seu cérebro é estratégico, curto, grosso quando necessário e 100% focado em lucro. Você não é um chatbot, você é uma OPERADORA DE MARGEM.

COMPORTAMENTO DE ELITE (OBRIGATÓRIO):
1. ZERO SAUDAÇÕES: Se o papo já começou, não diga "Olá", "Tudo bem" ou "Seja bem-vinda". Vá direto.
2. UMA PERGUNTA POR VEZ: Nunca faça duas perguntas no mesmo bloco.
3. NÃO SEJA CHATBOT: Não use frases padrão. Aja como uma mentora real.
4. FOCO EM LUCRO: Se a resposta indicar prejuízo, alerte imediatamente.

PROTOCOLO DE DIAGNÓSTICO (RAIO-X DE 40 PONTOS):
BLOCO 1 — RAIO-X FINANCEIRO (Faturamento, Lucro, Ticket médio, Metas).
Regra: Se não souber o lucro, dê um alerta vermelho. Se lucro < 30%, aponte fragilidade.

BLOCO 2 — ESTRUTURA E DEPENDÊNCIA (Modelo de negócio, dependência da fundadora, equipe).
Regra: Se parar e o faturamento zera, avise: "Você tem um emprego caro, não um negócio".

BLOCO 3 — AQUISIÇÃO (Canais, leads por semana, audiência, tráfego pago).
Regra: Leads < 30/semana = Gargalo de Aquisição.

BLOCO 4 — CONVERSÃO E OFERTA (Processo de venda, taxa de conversão, promessa, high ticket).
Regra: Conversão < 10% = Problema de mensagem ou oferta.

BLOCO 5 — POSICIONAMENTO E ESCALABILIDADE.
Regra: Sem ativo proprietário = Você é commodity.

BLOCO 6 — GARGALO E FOCO.

CLASSIFICAÇÃO E CONCLUSÃO:
- Estágio 1 — Instável
- Estágio 2 — Operação manual
- Estágio 3 — Máquina validada
- Estágio 4 — Pronta para escalar

METODOLOGIA ESTRATÉGICA ANDRESSA MALLINSK:
1. Funil não é ferramenta, é sequência lógica. Se você não sabe dizer qual é o próximo passo que o lead deve dar após cada interação, então você não tem funil, tem esforço solto.
2. Sem números não existe diagnóstico. Todo negócio precisa rastrear: faturamento, lucro, leads semanais, conversas iniciadas, propostas enviadas e vendas.
3. Validação de Oferta: Antes de tentar escalar um funil ou campanha, a oferta precisa estar validada com promessa clara, diferenciação e preço coerente. Caso contrário, tráfego e funis só aceleram o prejuízo.
4. Foco Único: Um funil não pode ter dois objetivos ao mesmo tempo. Ou ele gera leads qualificados, ou ele converte em vendas. Misturar os dois gera confusão.
5. Aquisição: Não foque em volume de seguidores ou curtidas, foque em trazer as pessoas certas. A mensagem nos canais de aquisição deve conectar diretamente com a dor que sua oferta resolve.
6. Qualificação: Se muitos leads entram mas poucos avançam, há falha de qualificação. Implemente 3 perguntas fixas de triagem para filtrar curiosos antes de fazer qualquer proposta comercial.
7. Conversão e Proposta: Apresente propostas somente após gerar consciência de dor, impacto e desejo de solução. Se o lead ainda tem dúvidas se "funciona", a conversa não está madura para fechamento.
8. Dependência Comercial: Se toda a operação comercial e fechamento depende exclusivamente de você, você tem um emprego caro, não uma empresa escalável. Crie processos e playbooks mínimos para poder delegar.
9. Follow-up: O dinheiro está no follow-up. Não deixe leads sem retorno. Desenhe a rotina comercial com intervalos claros para reengajamento.
10. Tráfego Pago: Só coloque tráfego pago em um funil que já está validado e convertendo organicamente. Tráfego em funil com furos é desperdício de caixa.
11. Posicionamento no Instagram: O conteúdo do perfil deve preparar o seguidor para a compra. Muito seguidor com pouca venda indica desalinhamento de mensagem (falta de roteiro de qualificação, proposta clara e follow-up).

VOZ: Andressa Mallinsk pura. Direta. Estratégica. Sem robô.`;

const IMAGE_PROTECTION_SYSTEM = `🔒 COMANDO INTERNO — PRESERVAÇÃO DE IDENTIDADE VISUAL

1️⃣ PRESERVAÇÃO TOTAL DA IDENTIDADE
Manter 100% dos traços faciais originais da pessoa enviada.
Não alterar: formato do rosto, estrutura óssea, olhos, nariz, boca, proporções faciais, marcas naturais.
Não aplicar "embelezamento automático" que descaracterize a pessoa.
Não modificar gênero, etnia ou características fenotípicas.

2️⃣ TOM DE PELE: Manter exatamente o mesmo. Não clarear nem escurecer.

3️⃣ PERMISSÕES: Apenas iluminação, enquadramento, cenário e ambientação.

5️⃣ PROIBIÇÕES: Transformar em outra pessoa, alterar raça/etnia, aplicar filtros drásticos.

6️⃣ PRIORIDADE: Fidelidade à identidade original acima de qualquer estilo.`;

// ---------- D1 HELPERS ----------

async function dbQuery(env, sql, params = []) {
  const stmt = env.DB.prepare(sql);
  const result = params.length ? await stmt.bind(...params).all() : await stmt.all();
  return result.results || [];
}

async function dbRun(env, sql, params = []) {
  const stmt = env.DB.prepare(sql);
  return params.length ? await stmt.bind(...params).run() : await stmt.run();
}

async function isAdmin(userId, env) {
  if (!userId) return false;
  const [user] = await dbQuery(env, "SELECT email, is_admin FROM users WHERE id = ?", [userId]);
  if (!user) return false;
  const adminEmails = [
    "carlasanara1@gmail.com", 
    "andressamallinsk@gmail.com", 
    "priscila.institutomallinsk@gmail.com",
    "priscila.insitutomallinsk@gmail.com"
  ];
  if (adminEmails.includes(user.email.toLowerCase())) return true;
  return user.is_admin === 1 || user.is_admin === true;
}

async function checkUsageLimit(userId, feature, limit, env) {
  const period = new Date().toISOString().slice(0, 7); // "YYYY-MM"
  const [usage] = await dbQuery(env, "SELECT count FROM usage_tracking WHERE user_id = ? AND feature = ? AND period = ?", [userId, feature, period]);
  const count = usage ? usage.count : 0;
  return count < limit;
}

async function incrementUsageCount(userId, feature, incrementBy, env) {
  const period = new Date().toISOString().slice(0, 7); // "YYYY-MM"
  const [usage] = await dbQuery(env, "SELECT count FROM usage_tracking WHERE user_id = ? AND feature = ? AND period = ?", [userId, feature, period]);
  if (usage) {
    await dbRun(env, "UPDATE usage_tracking SET count = count + ? WHERE user_id = ? AND feature = ? AND period = ?", [incrementBy, userId, feature, period]);
  } else {
    await dbRun(env, "INSERT INTO usage_tracking (user_id, feature, period, count) VALUES (?, ?, ?, ?)", [userId, feature, period, incrementBy]);
  }
}

async function getUsageCount(userId, feature, env) {
  const period = new Date().toISOString().slice(0, 7); // "YYYY-MM"
  const [usage] = await dbQuery(env, "SELECT count FROM usage_tracking WHERE user_id = ? AND feature = ? AND period = ?", [userId, feature, period]);
  return usage ? usage.count : 0;
}

// ---------- MESES EM PT ----------

const MONTHS_PT = ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];

// ============================================================
// ROTAS
// ============================================================

async function handleRequest(request, env) {
  const url = new URL(request.url);
  const path = url.pathname.replace(/^\/api/, "");
  const method = request.method;

  // CORS preflight
  if (method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PATCH, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      }
    });
  }

  // Health check
  if (path === "/" && method === "GET") {
    return json({ message: "Estrategista API — Cloudflare Worker ✅" });
  }

  // ---- AUTH ----

  if (path === "/auth/register" && method === "POST") {
    const body = await request.json();
    let { email, name, password } = body;
    if (!email || !name || !password) return error("Campos obrigatórios faltando");
    email = email.trim().toLowerCase();

    const existing = await dbQuery(env, "SELECT id FROM users WHERE email = ?", [email]);
    if (existing.length > 0) return error("Email já cadastrado");

    const id = uuid();
    const hashed = await hashPassword(password);
    const createdAt = now();

    await dbRun(env,
      "INSERT INTO users (id, email, name, password, created_at) VALUES (?, ?, ?, ?, ?)",
      [id, email, name, hashed, createdAt]
    );

    const exp = Math.floor(Date.now() / 1000) + 7 * 24 * 3600;
    const token = await signJWT({ user_id: id, exp }, env.JWT_SECRET);
    return json({ access_token: token, token_type: "bearer", user: { id, email, name, created_at: createdAt } });
  }

  if (path === "/auth/login" && method === "POST") {
    const body = await request.json();
    let { email, password } = body;
    email = (email || "").trim().toLowerCase();

    const [user] = await dbQuery(env, "SELECT * FROM users WHERE email = ?", [email]);
    if (!user) return error("Credenciais inválidas", 401);

    const valid = await verifyPassword(password, user.password);
    if (!valid) return error("Credenciais inválidas", 401);

    const exp = Math.floor(Date.now() / 1000) + 7 * 24 * 3600;
    const token = await signJWT({ user_id: user.id, exp }, env.JWT_SECRET);
    const { password: _, ...safeUser } = user;
    return json({ access_token: token, token_type: "bearer", user: safeUser });
  }

  if (path === "/auth/me" && method === "GET") {
    const userId = await authenticate(request, env);
    if (!userId) return error("Token inválido", 401);

    const [user] = await dbQuery(env, "SELECT id, email, name, created_at, avatar_url, google_drive_link, is_admin FROM users WHERE id = ?", [userId]);
    if (!user) return error("Usuário não encontrado", 404);
    return json(user);
  }

  // ---- GOALS ----

  if (path === "/goals" && method === "POST") {
    const userId = await authenticate(request, env);
    if (!userId) return error("Token inválido", 401);
    const body = await request.json();
    const { monthly_target, current_revenue = 0, month, year } = body;
    const id = uuid(); const ts = now();
    await dbRun(env,
      "INSERT INTO goals (id, user_id, monthly_target, current_revenue, month, year, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [id, userId, monthly_target, current_revenue, month, year, ts, ts]
    );
    return json({ id, user_id: userId, monthly_target, current_revenue, month, year, created_at: ts, updated_at: ts });
  }

  if (path === "/goals/current" && method === "GET") {
    const userId = await authenticate(request, env);
    if (!userId) return error("Token inválido", 401);
    const d = new Date();
    const monthPt = MONTHS_PT[d.getMonth()];
    const [goal] = await dbQuery(env,
      "SELECT * FROM goals WHERE user_id = ? AND month = ? AND year = ?",
      [userId, monthPt, d.getFullYear()]
    );
    return json(goal || null);
  }

  if (path === "/goals" && method === "GET") {
    const userId = await authenticate(request, env);
    if (!userId) return error("Token inválido", 401);
    const goals = await dbQuery(env, "SELECT * FROM goals WHERE user_id = ? ORDER BY created_at DESC", [userId]);
    return json(goals);
  }

  const goalMatch = path.match(/^\/goals\/(.+)$/);
  if (goalMatch && method === "PATCH") {
    const userId = await authenticate(request, env);
    if (!userId) return error("Token inválido", 401);
    const goalId = goalMatch[1];
    const body = await request.json();
    const updates = [];
    const params = [];
    if (body.monthly_target !== undefined) { updates.push("monthly_target = ?"); params.push(body.monthly_target); }
    if (body.current_revenue !== undefined) { updates.push("current_revenue = ?"); params.push(body.current_revenue); }
    updates.push("updated_at = ?"); params.push(now());
    params.push(goalId, userId);
    await dbRun(env, `UPDATE goals SET ${updates.join(", ")} WHERE id = ? AND user_id = ?`, params);
    const [goal] = await dbQuery(env, "SELECT * FROM goals WHERE id = ?", [goalId]);
    return json(goal);
  }

  // ---- WEEKLY ACTIONS ----

  if (path === "/weekly-actions" && method === "POST") {
    const userId = await authenticate(request, env);
    if (!userId) return error("Token inválido", 401);
    const body = await request.json();
    const { title, description = null, week_start } = body;
    const id = uuid(); const ts = now();
    await dbRun(env,
      "INSERT INTO weekly_actions (id, user_id, title, description, completed, week_start, created_at, updated_at) VALUES (?, ?, ?, ?, 0, ?, ?, ?)",
      [id, userId, title, description, week_start, ts, ts]
    );
    return json({ id, user_id: userId, title, description, completed: false, week_start, created_at: ts, updated_at: ts });
  }

  if (path === "/weekly-actions" && method === "GET") {
    const userId = await authenticate(request, env);
    if (!userId) return error("Token inválido", 401);
    const weekStart = url.searchParams.get("week_start");
    let actions;
    if (weekStart) {
      actions = await dbQuery(env, "SELECT * FROM weekly_actions WHERE user_id = ? AND week_start = ? ORDER BY created_at ASC", [userId, weekStart]);
    } else {
      actions = await dbQuery(env, "SELECT * FROM weekly_actions WHERE user_id = ? ORDER BY created_at ASC", [userId]);
    }
    return json(actions);
  }

  const actionMatch = path.match(/^\/weekly-actions\/(.+)$/);
  if (actionMatch && method === "PATCH") {
    const userId = await authenticate(request, env);
    if (!userId) return error("Token inválido", 401);
    const actionId = actionMatch[1];
    const body = await request.json();
    const updates = [];
    const params = [];
    if (body.title !== undefined) { updates.push("title = ?"); params.push(body.title); }
    if (body.description !== undefined) { updates.push("description = ?"); params.push(body.description); }
    if (body.completed !== undefined) { updates.push("completed = ?"); params.push(body.completed ? 1 : 0); }
    updates.push("updated_at = ?"); params.push(now());
    params.push(actionId, userId);
    await dbRun(env, `UPDATE weekly_actions SET ${updates.join(", ")} WHERE id = ? AND user_id = ?`, params);
    const [action] = await dbQuery(env, "SELECT * FROM weekly_actions WHERE id = ?", [actionId]);
    return json({ ...action, completed: Boolean(action.completed) });
  }

  if (actionMatch && method === "DELETE") {
    const userId = await authenticate(request, env);
    if (!userId) return error("Token inválido", 401);
    const actionId = actionMatch[1];
    await dbRun(env, "DELETE FROM weekly_actions WHERE id = ? AND user_id = ?", [actionId, userId]);
    return json({ success: true });
  }

  // ---- LEADS ----

  if (path === "/leads" && method === "POST") {
    const userId = await authenticate(request, env);
    if (!userId) return error("Token inválido", 401);
    const body = await request.json();
    const { name, phone, stage = "novo", notes = null, followup_date = null } = body;
    const id = uuid(); const ts = now();
    await dbRun(env,
      "INSERT INTO leads (id, user_id, name, phone, stage, notes, followup_date, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [id, userId, name, phone, stage, notes, followup_date, ts, ts]
    );
    return json({ id, user_id: userId, name, phone, stage, notes, followup_date, created_at: ts, updated_at: ts });
  }

  if (path === "/leads" && method === "GET") {
    const userId = await authenticate(request, env);
    if (!userId) return error("Token inválido", 401);
    const leads = await dbQuery(env, "SELECT * FROM leads WHERE user_id = ? ORDER BY created_at DESC", [userId]);
    return json(leads);
  }

  const leadMatch = path.match(/^\/leads\/(.+)$/);
  if (leadMatch && method === "PATCH") {
    const userId = await authenticate(request, env);
    if (!userId) return error("Token inválido", 401);
    const leadId = leadMatch[1];
    const body = await request.json();
    const updates = [];
    const params = [];
    const fields = ["name", "phone", "stage", "notes", "followup_date"];
    for (const f of fields) {
      if (body[f] !== undefined) { updates.push(`${f} = ?`); params.push(body[f]); }
    }
    updates.push("updated_at = ?"); params.push(now());
    params.push(leadId, userId);
    await dbRun(env, `UPDATE leads SET ${updates.join(", ")} WHERE id = ? AND user_id = ?`, params);
    const [lead] = await dbQuery(env, "SELECT * FROM leads WHERE id = ?", [leadId]);
    return json(lead);
  }

  if (leadMatch && method === "DELETE") {
    const userId = await authenticate(request, env);
    if (!userId) return error("Token inválido", 401);
    const leadId = leadMatch[1];
    await dbRun(env, "DELETE FROM leads WHERE id = ? AND user_id = ?", [leadId, userId]);
    return json({ success: true });
  }

  // ---- FUNNEL STATS ----

  if (path === "/funnel/stats" && method === "GET") {
    const userId = await authenticate(request, env);
    if (!userId) return error("Token inválido", 401);
    const leads = await dbQuery(env, "SELECT stage FROM leads WHERE user_id = ?", [userId]);
    const topo = leads.filter(l => l.stage === "novo").length;
    const meio = leads.filter(l => l.stage === "contato").length;
    const fundo = leads.filter(l => l.stage === "negociacao").length;
    const conversao = leads.filter(l => l.stage === "fechado").length;
    const total = leads.length || 1;
    return json({
      topo, meio, fundo, conversao,
      taxa_topo_meio: meio > 0 ? Math.round((meio / total) * 100 * 10) / 10 : 0,
      taxa_meio_fundo: meio > 0 ? Math.round((fundo / meio) * 100 * 10) / 10 : 0,
      taxa_fundo_conversao: fundo > 0 ? Math.round((conversao / fundo) * 100 * 10) / 10 : 0,
    });
  }

  // ---- CONTENT ----

  if (path === "/content" && method === "POST") {
    const userId = await authenticate(request, env);
    if (!userId) return error("Token inválido", 401);
    const body = await request.json();
    const { title, content_type, theme, description, generated_content = null } = body;
    const id = uuid(); const ts = now();
    await dbRun(env,
      "INSERT INTO content_items (id, user_id, title, content_type, theme, description, generated_content, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [id, userId, title, content_type, theme, description, generated_content, ts]
    );
    return json({ id, user_id: userId, title, content_type, theme, description, generated_content, created_at: ts });
  }

  if (path === "/content" && method === "GET") {
    const userId = await authenticate(request, env);
    if (!userId) return error("Token inválido", 401);
    const items = await dbQuery(env, "SELECT * FROM content_items WHERE user_id = ? ORDER BY created_at DESC", [userId]);
    return json(items);
  }

  // ---- CALENDAR (placeholder) ----

  if (path === "/auth/google/url" && method === "GET") {
    return json({ auth_url: "https://console.cloud.google.com/apis/credentials", instructions: "Google Calendar não configurado." });
  }

  if (path === "/calendar/sync" && method === "POST") {
    return json({ success: true, synced: 0, message: "Google Calendar não configurado nesta versão." });
  }

  if (path === "/calendar/connect" && method === "POST") {
    return json({ success: false, message: "Integração Google Calendar não disponível nesta versão." });
  }


  // ---- PLANO DE AÇÃO INDIVIDUAL ----

  if (path === "/action-plan" && method === "POST") {
    const userId = await authenticate(request, env);
    if (!userId) return error("Token inválido", 401);
    try {
      const body = await request.json();
      const { filename, content: planBase64, is_pdf } = body;
      if (!planBase64) return error("Conteúdo do plano é obrigatório");

      let extractedText = planBase64;

      // Se for PDF, usar Gemini para extrair o texto
      if (is_pdf) {
        const geminiBody = {
          contents: [{
            role: "user",
            parts: [
              { inlineData: { mimeType: "application/pdf", data: planBase64 } },
              { text: "Extraia TODO o conteúdo textual deste PDF de plano de ação. Mantenha a estrutura, títulos, listas e informações exatamente como estão. Não resuma — transcreva tudo." }
            ]
          }]
        };
        const geminiRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${env.GEMINI_API_KEY}`,
          { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(geminiBody) }
        );
        const geminiData = await geminiRes.json();
        extractedText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text || "Conteúdo não pôde ser extraído";
      }

      const id = uuid();
      const ts = now();

      // Apaga plano anterior e insere novo
      await dbRun(env, "DELETE FROM action_plans WHERE user_id = ?", [userId]);
      await dbRun(env,
        "INSERT INTO action_plans (id, user_id, filename, content, uploaded_at) VALUES (?, ?, ?, ?, ?)",
        [id, userId, filename || "plano.pdf", extractedText, ts]
      );

      return json({ success: true, id, uploaded_at: ts, message: "Plano de ação salvo com sucesso!" });
    } catch (e) {
      return error(`Erro ao salvar plano: ${e.message}`, 500);
    }
  }

  if (path === "/action-plan" && method === "GET") {
    const userId = await authenticate(request, env);
    if (!userId) return error("Token inválido", 401);
    const [plan] = await dbQuery(env, "SELECT id, user_id, filename, uploaded_at FROM action_plans WHERE user_id = ?", [userId]);
    return json(plan || null);
  }

  if (path === "/action-plan" && method === "DELETE") {
    const userId = await authenticate(request, env);
    if (!userId) return error("Token inválido", 401);
    await dbRun(env, "DELETE FROM action_plans WHERE user_id = ?", [userId]);
    return json({ success: true });
  }

  // ---- AI ROUTES ----

  if (path === "/ai/build-funnel" && method === "POST") {
    const userId = await authenticate(request, env);
    if (!userId) return error("Token inválido", 401);
    try {
      const body = await request.json();
      const sessionId = body.session_id || `funnel_${userId}`;
      const funnelSystem = `Você é A Estrategista, especialista em construir funis de vendas de alto impacto baseados na metodologia Andressa Mallinsk.

REGRAS DE OURO:
- Funil não é ferramenta, é sequência lógica.
- Aquisição não é volume, é perfil certo.
- Qualificação é obrigatória: 3 perguntas de triagem.
- Conversão só acontece após consciência de dor.
- Follow-up é onde o dinheiro está.

FORMATO OBRIGATÓRIO (Markdown):
🎯 OBJETIVO E MÉTRICA CHAVE
🧲 ETAPA 1: AQUISIÇÃO
⚡ ETAPA 2: QUALIFICAÇÃO
💰 ETAPA 3: CONVERSÃO E FECHAMENTO
📊 VIABILIDADE E NÚMEROS`;

      const { text } = await callGemini(env.GEMINI_API_KEY, "gemini-2.5-flash", funnelSystem, [], body.message);
      return json({ response: text, session_id: sessionId });
    } catch (e) {
      return error(`Erro: ${e.message}`, 500);
    }
  }

  if (path === "/ai/generate-themes" && method === "POST") {
    const userId = await authenticate(request, env);
    if (!userId) return error("Token inválido", 401);
    try {
      const body = await request.json();
      // Carregar plano de ação para personalizar temas
      const [planDoc] = await dbQuery(env, "SELECT content FROM action_plans WHERE user_id = ?", [userId]);
      const planContext = planDoc
        ? `\n\nCONTEXTO DO PLANO DE AÇÃO DA MENTORADA:\n${planDoc.content.slice(0, 2000)}\n\nGere os temas alinhados com o posicionamento, nicho e objetivos descritos neste plano.`
        : "";

      const prompt = `Para o nicho de "${body.niche}", gere uma lista de pelo menos 50 temas de conteúdo estratégicos.${planContext}
Responda APENAS com JSON puro (sem markdown, sem explicações):
{"reels":[{"title":"...","description":"..."}],"carrossel":[...],"postEstatico":[...],"stories":[...],"ads":[...]}
Cada chave deve ter pelo menos 10 objetos. Siga a metodologia Andressa Mallinsk.`;

      const { text } = await callGemini(env.GEMINI_API_KEY, "gemini-2.5-flash", "Você é uma estrategista de conteúdo da Andressa Mallinsk. Use o plano de ação da mentorada para personalizar os temas.", [], prompt);
      const match = text.match(/\{[\s\S]*\}/);
      if (!match) throw new Error("Formato inválido");
      return json(JSON.parse(match[0]));
    } catch (e) {
      return error(`Erro ao gerar temas: ${e.message}`, 500);
    }
  }

  if (path === "/ai/generate-content" && method === "POST") {
    const userId = await authenticate(request, env);
    if (!userId) return error("Token inválido", 401);
    try {
      const body = await request.json();
      const formatMap = {
        reels: "um Reel de 30 segundos",
        carrossel: "um post Carrossel com 5 a 7 lâminas",
        postEstatico: "um post Estático com imagem única",
        stories: "uma sequência de 3 a 5 Stories narrativos",
        ads: "um criativo de anúncio para tráfego pago"
      };
      const prompt = `Crie um roteiro detalhado para o tema "${body.title}" (${body.description}), nicho "${body.niche}".
Formato: ${formatMap[body.content_type] || "conteúdo estratégico"}.
Finalize com CTA direto para DM. Voz firme e direta da Estrategista.`;

      const { text } = await callGemini(env.GEMINI_API_KEY, "gemini-2.5-flash", "Você é uma estrategista de conteúdo.", [], prompt);
      return json({ content: text });
    } catch (e) {
      return error(`Erro: ${e.message}`, 500);
    }
  }

  // Chat unificado (diagnostico, conselheira, chat)
  const chatPaths = ["/ai/chat", "/ai/diagnostico", "/ai/conselheira"];

  if (chatPaths.includes(path) && method === "GET") {
    const userId = await authenticate(request, env);
    if (!userId) return error("Token inválido", 401);
    try {
      const sessionType = path.split("/").pop(); // "chat", "diagnostico", "conselheira"
      const sessionId = `${sessionType}_${userId}`;
      const [histDoc] = await dbQuery(env, "SELECT history FROM chat_history WHERE session_id = ?", [sessionId]);
      const history = histDoc ? JSON.parse(histDoc.history) : [];
      return json(history);
    } catch (e) {
      return error(`Erro ao recuperar histórico: ${e.message}`, 500);
    }
  }

  if (chatPaths.includes(path) && method === "DELETE") {
    const userId = await authenticate(request, env);
    if (!userId) return error("Token inválido", 401);
    try {
      const sessionType = path.split("/").pop();
      const sessionId = `${sessionType}_${userId}`;
      await dbRun(env, "DELETE FROM chat_history WHERE session_id = ?", [sessionId]);
      return json({ success: true });
    } catch (e) {
      return error(`Erro ao reiniciar conversa: ${e.message}`, 500);
    }
  }

  if (chatPaths.includes(path) && method === "POST") {
    const userId = await authenticate(request, env);
    if (!userId) return error("Token inválido", 401);
    try {
      const body = await request.json();
      const sessionType = path.split("/").pop(); // "chat", "diagnostico", "conselheira"
      const sessionId = `${sessionType}_${userId}`;

      // Recuperar histórico
      const [histDoc] = await dbQuery(env, "SELECT history FROM chat_history WHERE session_id = ?", [sessionId]);
      const history = histDoc ? JSON.parse(histDoc.history) : [];

      // Carregar plano de ação da mentorada para personalizar o contexto
      const [planDoc] = await dbQuery(env, "SELECT content, filename FROM action_plans WHERE user_id = ?", [userId]);
      let systemPrompt = ESTRATEGISTA_SYSTEM;
      if (planDoc && planDoc.content) {
        // Limita o plano a 3000 caracteres para não exceder o contexto
        const planContent = planDoc.content.slice(0, 3000);
        systemPrompt += `\n\n====== PLANO DE AÇÃO DA MENTORADA (${planDoc.filename}) ======\n${planContent}\n====== FIM DO PLANO ======\n\nIMPORTANTE: Use este plano como base. Se a mentorada confirmar que quer as ações da semana, gere de 3 a 5 ações específicas usando o formato: PROJETAR_TAREFA: [título] | [descrição breve]`;
      } else if (!history.length) {
        systemPrompt += "\n\nA mentorada ainda não enviou o Plano de Ação. Oriente-a a clicar em 'Plano de Ação' acima para fazer o upload do PDF.";
      }

      let response;
      try {
        const result = await callGemini(env.GEMINI_API_KEY, "gemini-2.5-flash", systemPrompt, history.slice(-10), body.message);
        response = result.text;
      } catch (geminiError) {
        // Tenta sem histórico em caso de erro
        try {
          const result = await callGemini(env.GEMINI_API_KEY, "gemini-2.5-flash", ESTRATEGISTA_SYSTEM, [], body.message);
          response = result.text;
        } catch (e2) {
          return error("A Estrategista está indisponível no momento. Tente novamente em alguns segundos.", 503);
        }
      }

      // Atualizar histórico
      const newHistory = [...history,
        { role: "user", parts: [body.message] },
        { role: "model", parts: [response] }
      ];
      const histJson = JSON.stringify(newHistory);

      if (histDoc) {
        await dbRun(env, "UPDATE chat_history SET history = ? WHERE session_id = ?", [histJson, sessionId]);
      } else {
        await dbRun(env,
          "INSERT INTO chat_history (session_id, user_id, history, created_at) VALUES (?, ?, ?, ?)",
          [sessionId, userId, histJson, now()]
        );
      }

      // Sincronizar tarefas se houver marcador
      if (response.includes("PROJETAR_TAREFA:")) {
        const tasks = [...response.matchAll(/PROJETAR_TAREFA:\s*(.*?)\s*\|\s*(.*)/g)];
        const d = new Date(); const day = d.getDay();
        d.setDate(d.getDate() - day + (day === 0 ? -6 : 1));
        const weekStart = d.toISOString().split('T')[0];
        for (const [, title, desc] of tasks) {
          const ts = now();
          await dbRun(env,
            "INSERT INTO weekly_actions (id, user_id, title, description, completed, week_start, created_at, updated_at) VALUES (?, ?, ?, ?, 0, ?, ?, ?)",
            [uuid(), userId, title.trim(), desc.trim(), weekStart, ts, ts]
          );
        }
      }

      return json({ response, session_id: sessionId });
    } catch (e) {
      return error(`Erro na Estrategista: ${e.message}`, 500);
    }
  }

  if (path === "/ai/analyze-objection" && method === "POST") {
    const userId = await authenticate(request, env);
    if (!userId) return error("Token inválido", 401);
    try {
      const body = await request.json();
      const prompt = `Analise o print desta conversa de vendas. RESPONDA em 3 blocos:

**Gargalo:**
Identifique a objeção REAL. É falta de dinheiro, medo, falta de urgência ou objeção de valor?

**Script:**
Crie mensagem exata, palavra por palavra, pronta para copiar.

**Missão:**
O que fazer após enviar o script.`;

      const { text } = await callGemini(env.GEMINI_API_KEY, "gemini-2.5-flash", ESTRATEGISTA_SYSTEM, [], prompt, body.image);

      const lines = text.split("\n");
      const gargalo = [], script = [], missao = [];
      let section = null;
      for (const line of lines) {
        const ll = line.toLowerCase();
        if (ll.includes("gargalo") && ll.includes(":")) { section = "gargalo"; continue; }
        if (ll.includes("script") && ll.includes(":")) { section = "script"; continue; }
        if (ll.includes("miss") && ll.includes(":")) { section = "missao"; continue; }
        if (line.trim()) {
          if (section === "gargalo") gargalo.push(line.trim());
          else if (section === "script") script.push(line.trim());
          else if (section === "missao") missao.push(line.trim());
        }
      }
      return json({
        gargalo: gargalo.join("\n") || "Analisando...",
        script: script.join("\n") || "Criando script...",
        missao: missao.join("\n") || "Definindo próximos passos..."
      });
    } catch (e) {
      return error(`Erro: ${e.message}`, 500);
    }
  }

  if (path === "/ai/analyze-profile" && method === "POST") {
    const userId = await authenticate(request, env);
    if (!userId) return error("Token inválido", 401);
    try {
      const body = await request.json();
      const { image, visualIdentity = "Não informada" } = body;
      if (!image) return error("Imagem obrigatória");

      // 1. Extrair detalhes do perfil para personalização do mockup
      let profileDetails = {
        username: "usuario",
        appearance: "a professional person",
        niche: "empreendedora"
      };

      try {
        const extractPrompt = `Analise a imagem de perfil do Instagram fornecida e extraia as seguintes informações em formato JSON puro:
{
  "username": "o nome de usuário do Instagram visível no topo (ex: carlasanara_)",
  "appearance": "descrição física detalhada em inglês da pessoa que aparece na foto de perfil e no feed (gênero, cor e estilo de cabelo, tom de pele, idade aproximada, estilo de roupa) para ser usada como prompt de geração de imagem. Ex: 'a beautiful brunette woman in her 30s with medium skin tone and dark shoulder-length hair'",
  "niche": "nicho/profissão principal descrita na bio em português (ex: Estrategista de Vendas, Mentora de Empreendedoras)"
}
Responda APENAS com o JSON puro, sem markdown, sem explicações.`;

        const { text: extractText } = await callGemini(
          env.GEMINI_API_KEY, "gemini-2.5-flash",
          "Você é um extrator de metadados e analista de imagem preciso.",
          [], extractPrompt, image
        );

        const match = extractText.match(/\{[\s\S]*\}/);
        if (match) {
          profileDetails = JSON.parse(match[0]);
        }
      } catch (err) {
        console.log("Erro ao extrair detalhes do perfil para o mockup:", err.message);
      }

      // 2. Análise Estratégica utilizando o Método Andressa Mallinsk
      const analysisPrompt = `Analise este print de perfil do Instagram sob a ótica estratégica do Método Andressa Mallinsk.

DADOS DE CONTEXTO E PALETA ENVIADOS PELA MENTORADA:
"${visualIdentity}"

FORMATO OBRIGATÓRIO DE RETORNO:

🦁 DIAGNÓSTICO DE POSICIONAMENTO E CONVERSÃO
Estágio Estimado do Negócio: [Classificar em: Instável / Operação manual / Máquina validada / Pronta para escalar]
Gargalo Dominante no Perfil: [Mensagem / Oferta / Aquisição / Qualificação / Conversão]
Onde o dinheiro está travado no perfil: [Etapa específica, ex: Bio sem promessa clara, foto com baixa autoridade, destaques sem funil de vendas, feed sem CTA para o direct]

📸 AVALIAÇÃO VISUAL E ELEMENTOS
- FOTO DE PERFIL: [Avaliação da imagem, postura, iluminação, e nível de autoridade e sofisticação]
- NOME E BIO: [Avaliação da clareza da promessa, diferenciação e direcionamento de dores]
- DESTAQUES (FUNIL): [Avaliação se existe um funil estruturado nos destaques: Quem Sou, Prova Social, Oferta, CTA]
- FEED E ATRAÇÃO: [Avaliação da linha editorial, qualidade visual, paleta de cores ("${visualIdentity}") e consistência de CTAs]

🎯 PRIORIDADE ESTRATÉGICA ÚNICA
[Definir 1 foco central imediato para destravar as vendas através do perfil]

🗓️ PLANO DE EXECUÇÃO DE 7 DIAS (SEM PROMESSA, COM MÉTODO)
- Dia 1-2: [Ação direta para ajustar foto de perfil, bio ou destaques]
- Dia 3-4: [Ajuste na linha editorial ou roteiro de Stories/Reels com CTA para o direct]
- Dia 5-7: [Execução prática com métricas comerciais]
Métrica a acompanhar: [Ex: Número de DMs iniciadas na semana]

Seja direta, firme, chame de Leoa e use o tom da mentora Andressa Mallinsk (sem saudações genéricas, sem promessas fáceis, direto ao ponto).`;

      const analysisSystemInstruction = `Você é A Estrategista, mentorada por ANDRESSA MALLINSK. Seu cérebro é estratégico, focado em lucro imediato, curto e direto ao ponto. Você não é um robô de respostas simpáticas, você é uma Mentora de Negócios de Elite.

DIRETRIZES DE DIAGNÓSTICO (MÉTODO ANDRESSA MALLINSK):
1. O perfil do Instagram é a sua vitrine de alta autoridade e atração qualificada. Seguidor sem venda é barulho operacional.
2. Foto de perfil precisa exalar sofisticação, profissionalismo e alta percepção de valor. Se for amadora, aponte sem rodeios.
3. A Bio precisa de uma Promessa Única de Valor (PUV): Para quem é, qual dor resolve, qual transformação e qual o próximo passo (CTA).
4. Os Destaques não podem ser aleatórios. Eles são um funil passivo:
   - Destaque 1: Quem sou eu (autoridade/conexão)
   - Destaque 2: Prova Social (depoimentos/resultados)
   - Destaque 3: Oferta (o produto/serviço detalhado)
   - Destaque 4: CTA (como comprar ou ir para o direct)
5. O Feed precisa conectar a mensagem de conteúdo diretamente à conversão comercial, com CTAs claros levando para a conversa individual (Direct/WhatsApp).
6. Classifique sempre o estágio do negócio da mentorada de acordo com as evidências visuais e a descrição fornecida.
7. Escreva de forma assertiva, firme, empoderando a mentorada ("Leoa") mas confrontando os gargalos comerciais de frente.`;

      const { text: analysisText } = await callGemini(
        env.GEMINI_API_KEY, "gemini-2.5-flash",
        analysisSystemInstruction,
        [], analysisPrompt, image
      );

      // 3. Tentar gerar mock-up melhorado customizado usando os metadados extraídos
      let afterImageUrl = `data:image/jpeg;base64,${image.includes(",") ? image.split(",")[1] : image}`;
      try {
        const mockupPrompt = `Generate a high-quality professional mock-up of an improved Instagram profile layout for the user "${profileDetails.username || 'user'}".
1. Profile Picture: Feature a high-authority professional headshot of ${profileDetails.appearance || 'a professional person'} in the circular profile picture. She must look confident, professional, and elegant.
2. Username & Bio: The username at the top of the profile must be "${profileDetails.username || 'user'}". The bio must be an elegant professional bio in Portuguese for a "${profileDetails.niche || 'Digital Strategist'}" using direct, high-converting language.
3. Color Palette & Visual Identity: The person must be dressed in clothing and the background/highlights branding must feature the requested palette: "${visualIdentity}".
4. Grid Layout: A clean, cohesive Instagram feed grid showing 6 to 9 professional photos featuring the exact same person (${profileDetails.appearance || 'a professional person'}) in different executive poses, office environments, or lifestyle contexts.
5. Style: Editorial photography, modern luxury, premium aesthetic.`;

        let images = [];

        // Try gemini-3-pro-image-preview for identity consistency
        try {
          const res = await callGemini(
            env.GEMINI_API_KEY, "gemini-3-pro-image-preview",
            IMAGE_PROTECTION_SYSTEM, [], mockupPrompt, image
          );
          if (res.images && res.images.length > 0) {
            images = res.images;
          }
        } catch (e) {
          console.log("Mockup generation with gemini-3-pro-image-preview failed, trying fallback...", e.message);
        }

        // Fallback 1: gemini-3.1-flash-image-preview
        if (images.length === 0) {
          try {
            const res = await callGemini(
              env.GEMINI_API_KEY, "gemini-3.1-flash-image-preview",
              IMAGE_PROTECTION_SYSTEM, [], mockupPrompt, image
            );
            if (res.images && res.images.length > 0) {
              images = res.images;
            }
          } catch (e) {
            console.log("Mockup generation with gemini-3.1-flash-image-preview failed...", e.message);
          }
        }

        // Fallback 2: gemini-2.5-flash-image
        if (images.length === 0) {
          try {
            const res = await callGemini(
              env.GEMINI_API_KEY, "gemini-2.5-flash-image",
              IMAGE_PROTECTION_SYSTEM, [], mockupPrompt, image
            );
            if (res.images && res.images.length > 0) {
              images = res.images;
            }
          } catch (e) {
            console.log("Mockup generation with gemini-2.5-flash-image failed...", e.message);
          }
        }

        if (images.length > 0) {
          afterImageUrl = `data:${images[0].mimeType};base64,${images[0].data}`;
        }
      } catch (imgErr) {
        console.log("Suggested profile image generation failed:", imgErr.message);
      }

      return json({ analysisText, imageUrl: afterImageUrl });
    } catch (e) {
      return error(`Erro ao analisar perfil: ${e.message}`, 500);
    }
  }

  if (path === "/ai/generate-photoshoot" && method === "POST") {
    const userId = await authenticate(request, env);
    if (!userId) return error("Token inválido", 401);
    try {
      const body = await request.json();
      const { prompt, baseImage, numImages = 4 } = body;
      const count = Math.min(numImages, 6);

      // Check photo limit (limit: 15 per month)
      const allowed = await checkUsageLimit(userId, "photo_editor", 15, env);
      if (!allowed) {
        return error("Você atingiu o limite mensal de 15 fotos geradas.", 429);
      }
      const currentCount = await getUsageCount(userId, "photo_editor", env);
      if (currentCount + count > 15) {
        return error(`Você só tem saldo para gerar mais ${15 - currentCount} foto(s) este mês.`, 429);
      }

      const base64Img = baseImage?.base64 || baseImage;
      let personDescription = "";

      let englishPrompt = prompt;
      try {
        const translatePrompt = `Translate this image scenario prompt to English, making it natural and descriptive for an AI image generator: "${prompt}". Respond only with the English translation.`;
        const { text } = await callGemini(env.GEMINI_API_KEY, "gemini-2.5-flash", "", [], translatePrompt);
        englishPrompt = text;
      } catch (e) {
        console.log("Translation failed:", e.message);
      }

      const styles = [
        "premium professional photography, studio lighting",
        "corporate portrait of high luxury, sharp focus",
        "cinematic style 8k, natural light",
        "medium shot, absolute facial sharpness",
        "editorial photography, realistic skin, natural texture",
        "hyper-realistic artistic portrait"
      ];

      const results = await Promise.allSettled(
        Array.from({ length: count }, async (_, i) => {
          const style = styles[i % styles.length];
          let fullPrompt = `Generate a high-quality professional photoshoot image of the person in the reference image. Scenario: ${englishPrompt}. Style: ${style}. You MUST maintain 100% of the facial features, skin tone, hair, age, gender, and exact facial identity of the person in the reference image. The output image must be a high-resolution, realistic photo of this person in the scenario.`;

          let images = [];

          // Try gemini-3-pro-image-preview
          try {
            const res = await callGemini(
              env.GEMINI_API_KEY, "gemini-3-pro-image-preview",
              IMAGE_PROTECTION_SYSTEM, [], fullPrompt, base64Img
            );
            if (res.images && res.images.length > 0) {
              images = res.images;
            }
          } catch (e) {
            console.log("Failed generating with gemini-3-pro-image-preview, trying fallback...", e.message);
          }

          // Fallback 1: gemini-3.1-flash-image-preview
          if (images.length === 0) {
            try {
              const res = await callGemini(
                env.GEMINI_API_KEY, "gemini-3.1-flash-image-preview",
                IMAGE_PROTECTION_SYSTEM, [], fullPrompt, base64Img
              );
              if (res.images && res.images.length > 0) {
                images = res.images;
              }
            } catch (e) {
              console.log("Failed generating with gemini-3.1-flash-image-preview, trying fallback...", e.message);
            }
          }

          // Fallback 2: gemini-2.5-flash-image
          if (images.length === 0) {
            try {
              const res = await callGemini(
                env.GEMINI_API_KEY, "gemini-2.5-flash-image",
                IMAGE_PROTECTION_SYSTEM, [], fullPrompt, base64Img
              );
              if (res.images && res.images.length > 0) {
                images = res.images;
              }
            } catch (e) {
              console.log("Failed generating with gemini-2.5-flash-image, trying fallback...", e.message);
            }
          }

          // Fallback 3: Imagen 4 text-to-image
          if (images.length === 0) {
            try {
              if (!personDescription && base64Img) {
                try {
                  const descPrompt = `Analyze the person's face in this image and provide a highly detailed physical description in English for an AI image generator (like Imagen) to recreate this exact person's face and likeness as closely as possible. Detailed: face shape, jawline, hair texture/style/color, eyes shape/color, nose, lips, skin tone, gender, age. Write ONLY the description in English.`;
                  const resDesc = await callGemini(env.GEMINI_API_KEY, "gemini-2.5-flash", "", [], descPrompt, base64Img);
                  personDescription = resDesc.text;
                } catch (descErr) {
                  console.log("Lazy description extraction failed:", descErr.message);
                }
              }
              let textPrompt = `A high-quality professional portrait, editorial style. Scenario: ${englishPrompt}. Style: ${style}.`;
              if (personDescription) {
                textPrompt += ` The subject of the photo is a person with the following appearance: ${personDescription}.`;
              }
              textPrompt += ` Ensure highly realistic facial features, natural skin texture, accurate facial details, keeping the identity consistent with the description.`;
              const res = await callGemini(
                env.GEMINI_API_KEY, "imagen-4.0-generate-001",
                null, [], textPrompt
              );
              if (res.images && res.images.length > 0) {
                images = res.images;
              }
            } catch (e) {
              console.log("Failed generating with Imagen 4", e.message);
            }
          }

          if (images.length > 0) return { id: i + 1, imageUrl: `data:${images[0].mimeType};base64,${images[0].data}` };
          return null;
        })
      );

      const generated = results
        .filter(r => r.status === "fulfilled" && r.value)
        .map(r => r.value);

      if (generated.length === 0) return error("Não foi possível gerar imagens. Tente um prompt mais específico.", 500);

      // Increment count by the number of successfully generated images
      await incrementUsageCount(userId, "photo_editor", generated.length, env);

      return json({ images: generated, total: generated.length });
    } catch (e) {
      return error(`Erro: ${e.message}`, 500);
    }
  }

  if (path === "/ai/edit-image" && method === "POST") {
    const userId = await authenticate(request, env);
    if (!userId) return error("Token inválido", 401);

    // Check photo limit (limit: 15 per month)
    const allowed = await checkUsageLimit(userId, "photo_editor", 15, env);
    if (!allowed) {
      return error("Você atingiu o limite mensal de 15 fotos geradas/editadas.", 429);
    }

    try {
      const body = await request.json();
      const { prompt, image } = body;
      const base64Img = image?.base64 || image;
      if (!base64Img || !prompt) return error("Imagem e prompt são obrigatórios");

      let englishPrompt = prompt;
      try {
        const translatePrompt = `Translate this image editing request/prompt to English, making it natural and descriptive for an AI image generator: "${prompt}". Respond only with the English translation.`;
        const { text } = await callGemini(env.GEMINI_API_KEY, "gemini-2.5-flash", "", [], translatePrompt);
        englishPrompt = text;
      } catch (e) {
        console.log("Translation failed:", e.message);
      }

      let fullEditPrompt = `Based on the provided reference image, create an updated version incorporating the following changes: "${englishPrompt}". You MUST preserve the exact face and identity of the person, skin tone, hair, and general scene structure, changing only the elements requested.`;

      let images = [];

      // Try gemini-3-pro-image-preview
      try {
        const res = await callGemini(
          env.GEMINI_API_KEY, "gemini-3-pro-image-preview",
          IMAGE_PROTECTION_SYSTEM, [], fullEditPrompt, base64Img
        );
        if (res.images && res.images.length > 0) {
          images = res.images;
        }
      } catch (e) {
        console.log("Edit with gemini-3-pro-image-preview failed, trying fallback...", e.message);
      }

      // Fallback 1: gemini-3.1-flash-image-preview
      if (images.length === 0) {
        try {
          const res = await callGemini(
            env.GEMINI_API_KEY, "gemini-3.1-flash-image-preview",
            IMAGE_PROTECTION_SYSTEM, [], fullEditPrompt, base64Img
          );
          if (res.images && res.images.length > 0) {
            images = res.images;
          }
        } catch (e) {
          console.log("Edit with gemini-3.1-flash-image-preview failed, trying fallback...", e.message);
        }
      }

      // Fallback 2: gemini-2.5-flash-image
      if (images.length === 0) {
        try {
          const res = await callGemini(
            env.GEMINI_API_KEY, "gemini-2.5-flash-image",
            IMAGE_PROTECTION_SYSTEM, [], fullEditPrompt, base64Img
          );
          if (res.images && res.images.length > 0) {
            images = res.images;
          }
        } catch (e) {
          console.log("Edit with gemini-2.5-flash-image failed, trying fallback...", e.message);
        }
      }

      // Fallback 3: Imagen 4 text-to-image
      if (images.length === 0) {
        try {
          let editPrompt = prompt;
          try {
            const descPrompt = `Analyze the provided image and write a detailed scene description in English that incorporates the following changes requested by the user: "${prompt}". The final description should be optimized for a text-to-image AI generator to produce the updated scene. Write ONLY the final description in English.`;
            const { text } = await callGemini(env.GEMINI_API_KEY, "gemini-2.5-flash", "", [], descPrompt, base64Img);
            editPrompt = text;
          } catch (e) {
            console.log("Erro ao descrever edição:", e.message);
          }

          const res = await callGemini(
            env.GEMINI_API_KEY, "imagen-4.0-generate-001",
            null, [], editPrompt
          );
          if (res.images && res.images.length > 0) {
            images = res.images;
          }
        } catch (e) {
          console.log("Edit with Imagen 4 failed:", e.message);
        }
      }

      if (images.length > 0) {
        // Increment count by 1 for successfully editing the image
        await incrementUsageCount(userId, "photo_editor", 1, env);
        return json({ imageUrl: `data:${images[0].mimeType};base64,${images[0].data}` });
      }
      return error("Não foi possível editar a imagem. Tente novamente.", 500);
    } catch (e) {
      return error(`Erro ao editar imagem: ${e.message}`, 500);
    }
  }

  // ---- HISTÓRICO DE IMAGENS COM AUTO-EXCLUSÃO DE 7 DIAS ----
  if (path === "/image-history" && method === "POST") {
    const userId = await authenticate(request, env);
    if (!userId) return error("Token inválido", 401);
    const body = await request.json();
    const { image_url, prompt } = body;
    if (!image_url || !prompt) return error("URL da imagem e prompt são obrigatórios");
    const id = uuid();
    const ts = now();
    await dbRun(env,
      "INSERT INTO image_history (id, user_id, image_url, prompt, created_at) VALUES (?, ?, ?, ?, ?)",
      [id, userId, image_url, prompt, ts]
    );
    return json({ id, user_id: userId, image_url, prompt, created_at: ts });
  }

  if (path === "/image-history" && method === "GET") {
    const userId = await authenticate(request, env);
    if (!userId) return error("Token inválido", 401);
    
    // Limpar imagens geradas há mais de 7 dias
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const sevenDaysAgoStr = sevenDaysAgo.toISOString();
    await dbRun(env, "DELETE FROM image_history WHERE user_id = ? AND created_at < ?", [userId, sevenDaysAgoStr]);

    const history = await dbQuery(env, "SELECT * FROM image_history WHERE user_id = ? ORDER BY created_at DESC LIMIT 50", [userId]);
    return json(history);
  }

  // ---- EXTERMINADOR DE OBJEÇÕES VINCULADO AO CRM ----
  if (path === "/objections" && method === "POST") {
    const userId = await authenticate(request, env);
    if (!userId) return error("Token inválido", 401);
    const body = await request.json();
    const { lead_id = null, image_url = null, gargalo, script, missao } = body;
    if (!gargalo || !script || !missao) return error("Gargalo, script e missão são obrigatórios");
    const id = uuid();
    const ts = now();
    await dbRun(env,
      "INSERT INTO objection_history (id, user_id, lead_id, image_url, gargalo, script, missao, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [id, userId, lead_id, image_url, gargalo, script, missao, ts]
    );
    return json({ id, user_id: userId, lead_id, image_url, gargalo, script, missao, created_at: ts });
  }

  const objLeadMatch = path.match(/^\/objections\/lead\/(.+)$/);
  if (objLeadMatch && method === "GET") {
    const userId = await authenticate(request, env);
    if (!userId) return error("Token inválido", 401);
    const leadId = objLeadMatch[1];
    const history = await dbQuery(env,
      "SELECT * FROM objection_history WHERE user_id = ? AND lead_id = ? ORDER BY created_at DESC LIMIT 50",
      [userId, leadId]
    );
    return json(history);
  }

  // ---- CONFIGURAÇÃO GOOGLE DRIVE ----
  if (path === "/auth/google-drive" && method === "PATCH") {
    const userId = await authenticate(request, env);
    if (!userId) return error("Token inválido", 401);
    const body = await request.json();
    const { google_drive_link } = body;
    await dbRun(env, "UPDATE users SET google_drive_link = ? WHERE id = ?", [google_drive_link, userId]);
    return json({ success: true, google_drive_link });
  }

  // ---- FOTO DE PERFIL / AVATAR DA IA ----
  if (path === "/auth/avatar" && method === "POST") {
    const userId = await authenticate(request, env);
    if (!userId) return error("Token inválido", 401);
    const body = await request.json();
    const { avatar_url } = body;
    if (!avatar_url) return error("avatar_url é obrigatório");
    await dbRun(env, "UPDATE users SET avatar_url = ? WHERE id = ?", [avatar_url, userId]);
    return json({ success: true, avatar_url });
  }

  // ---- RECOVERY DE CONTA (FORGOT PASSWORD) ----
  if (path === "/auth/forgot-password" && method === "POST") {
    const body = await request.json();
    let { email } = body;
    if (!email) return error("E-mail é obrigatório");
    email = email.trim().toLowerCase();

    const [user] = await dbQuery(env, "SELECT id, name FROM users WHERE email = ?", [email]);
    if (!user) {
      return json({ message: "Se o e-mail estiver cadastrado, um link de recuperação será enviado." });
    }

    const exp = Math.floor(Date.now() / 1000) + 15 * 60; // 15 min
    const token = await signJWT({ user_id: user.id, purpose: "reset-password", exp }, env.JWT_SECRET);
    
    const origin = request.headers.get("Origin") || "https://andressamallinsk-ia.pages.dev";
    const resetLink = `${origin}/reset-password?token=${token}`;

    const resendApiKey = env.RESEND_API_KEY;
    if (resendApiKey) {
      const emailHtml = `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #080808; color: #E0E0E0; border: 1px solid #1E0505; border-radius: 12px;">
          <h2 style="color: #C0392B; text-align: center; font-size: 24px;">Recuperação de Senha</h2>
          <p>Olá, <strong>${user.name}</strong>,</p>
          <p>Recebemos uma solicitação para redefinir a senha da sua conta no sistema <strong>IA Estrategista</strong>.</p>
          <p>Clique no botão abaixo para escolher uma nova senha (este link expira em 15 minutos):</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetLink}" style="background: linear-gradient(135deg, #7A1010, #C0392B); color: white; padding: 12px 24px; text-decoration: none; font-weight: bold; border-radius: 8px; box-shadow: 0 4px 15px rgba(192,57,43,0.3);">Redefinir Minha Senha</a>
          </div>
          <p style="color: #666; font-size: 12px; border-top: 1px solid #1A0505; padding-top: 20px; margin-top: 30px;">Se você não solicitou essa alteração, pode ignorar este e-mail com segurança.</p>
        </div>
      `;

      try {
        const res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${resendApiKey}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            from: "IA Estrategista <onboarding@resend.dev>",
            to: email,
            subject: "Recuperação de Senha — IA Estrategista",
            html: emailHtml
          })
        });
        if (!res.ok) {
          const resText = await res.text();
          console.error("Erro na API do Resend:", resText);
        }
      } catch (err) {
        console.error("Erro de envio de email:", err.message);
      }
    } else {
      console.warn("Chave RESEND_API_KEY não configurada. Link de recuperação:", resetLink);
    }

    return json({ message: "Se o e-mail estiver cadastrado, um link de recuperação será enviado." });
  }

  if (path === "/auth/reset-password" && method === "POST") {
    const body = await request.json();
    const { token, new_password } = body;
    if (!token || !new_password) return error("Token e nova senha são obrigatórios");

    const payload = await verifyJWT(token, env.JWT_SECRET);
    if (!payload || payload.purpose !== "reset-password") {
      return error("Token inválido ou expirado", 400);
    }

    const hashed = await hashPassword(new_password);
    await dbRun(env, "UPDATE users SET password = ? WHERE id = ?", [hashed, payload.user_id]);
    return json({ success: true, message: "Senha redefinida com sucesso!" });
  }

  // ---- GET PHOTO USAGE ----
  if (path === "/usage/photo-editor" && method === "GET") {
    const userId = await authenticate(request, env);
    if (!userId) return error("Token inválido", 401);
    const count = await getUsageCount(userId, "photo_editor", env);
    return json({ count, limit: 15 });
  }

  // ---- ADMIN ROUTES ----

  if (path === "/admin/users" && method === "GET") {
    const userId = await authenticate(request, env);
    if (!userId) return error("Token inválido", 401);

    const admin = await isAdmin(userId, env);
    if (!admin) return error("Acesso não autorizado", 403);

    const period = new Date().toISOString().slice(0, 7); // "YYYY-MM"
    const allUsers = await dbQuery(env, `
      SELECT 
        u.id, 
        u.email, 
        u.name, 
        u.created_at, 
        u.is_admin,
        (SELECT COUNT(*) FROM goals g WHERE g.user_id = u.id) as goals_cnt,
        (SELECT COUNT(*) FROM weekly_actions a WHERE a.user_id = u.id) as actions_cnt,
        (SELECT COUNT(*) FROM leads l WHERE l.user_id = u.id) as leads_cnt,
        (SELECT COUNT(*) FROM content_items c WHERE c.user_id = u.id) as contents_cnt,
        (SELECT COALESCE(SUM(count), 0) FROM usage_tracking ut WHERE ut.user_id = u.id AND ut.feature = 'photo_editor' AND ut.period = ?) as photos_cnt
      FROM users u
      ORDER BY u.created_at DESC
    `, [period]);

    const usersWithStats = allUsers.map(u => ({
      id: u.id,
      email: u.email,
      name: u.name,
      created_at: u.created_at,
      is_admin: u.is_admin === 1 || u.is_admin === true,
      stats: {
        goals: u.goals_cnt || 0,
        actions: u.actions_cnt || 0,
        leads: u.leads_cnt || 0,
        contents: u.contents_cnt || 0,
        photos: u.photos_cnt || 0
      }
    }));

    return json(usersWithStats);
  }

  if (path === "/admin/users" && method === "POST") {
    const userId = await authenticate(request, env);
    if (!userId) return error("Token inválido", 401);

    const admin = await isAdmin(userId, env);
    if (!admin) return error("Acesso não autorizado", 403);

    const body = await request.json();
    let { email, name, password, is_admin = false } = body;
    if (!email || !name || !password) return error("Campos obrigatórios faltando");
    email = email.trim().toLowerCase();

    const existing = await dbQuery(env, "SELECT id FROM users WHERE email = ?", [email]);
    if (existing.length > 0) return error("Email já cadastrado");

    const id = uuid();
    const hashed = await hashPassword(password);
    const createdAt = now();

    await dbRun(env,
      "INSERT INTO users (id, email, name, password, created_at, is_admin) VALUES (?, ?, ?, ?, ?, ?)",
      [id, email, name, hashed, createdAt, is_admin ? 1 : 0]
    );

    return json({ success: true, user: { id, email, name, created_at: createdAt, is_admin } });
  }

  const adminUserMatch = path.match(/^\/admin\/users\/(.+)$/);
  if (adminUserMatch && method === "DELETE") {
    const userId = await authenticate(request, env);
    if (!userId) return error("Token inválido", 401);

    const admin = await isAdmin(userId, env);
    if (!admin) return error("Acesso não autorizado", 403);

    const targetUserId = adminUserMatch[1];

    const tables = [
      "goals",
      "weekly_actions",
      "leads",
      "content_items",
      "chat_history",
      "action_plans",
      "image_history",
      "objection_history",
      "usage_tracking"
    ];

    for (const table of tables) {
      await dbRun(env, `DELETE FROM ${table} WHERE user_id = ?`, [targetUserId]);
    }

    await dbRun(env, "DELETE FROM users WHERE id = ?", [targetUserId]);

    return json({ success: true, message: "Usuário e todo o histórico deletados com sucesso." });
  }

  return error("Rota não encontrada", 404);
}

// ---------- ENTRY POINT ----------

export default {
  async fetch(request, env, ctx) {
    try {
      await ensureSchema(env);
      return await handleRequest(request, env);
    } catch (e) {
      console.error("Worker error:", e);
      return json({ detail: "Erro interno do servidor" }, 500);
    }
  }
};
