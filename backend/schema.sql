-- Schema SQL para Cloudflare D1 (IA Estrategista)
-- Execute este arquivo no console D1 da Cloudflare

CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    password TEXT NOT NULL,
    created_at TEXT NOT NULL,
    google_calendar_token TEXT,
    avatar_url TEXT,
    google_drive_link TEXT,
    is_admin INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS goals (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    monthly_target REAL NOT NULL,
    current_revenue REAL DEFAULT 0.0,
    month TEXT NOT NULL,
    year INTEGER NOT NULL,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS weekly_actions (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    completed BOOLEAN DEFAULT 0,
    week_start TEXT NOT NULL,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS leads (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    stage TEXT DEFAULT 'novo',
    notes TEXT,
    followup_date TEXT,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS content_items (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    title TEXT NOT NULL,
    content_type TEXT NOT NULL,
    theme TEXT NOT NULL,
    description TEXT,
    generated_content TEXT,
    created_at TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
CREATE TABLE IF NOT EXISTS chat_history (
    session_id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    history TEXT NOT NULL,
    created_at TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Plano de Ação Individual por mentorada (adicionado em 16/05/2026)
CREATE TABLE IF NOT EXISTS action_plans (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL UNIQUE,
    filename TEXT NOT NULL,
    content TEXT NOT NULL,
    uploaded_at TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Controle de uso de recursos por mês
CREATE TABLE IF NOT EXISTS usage_tracking (
    user_id TEXT NOT NULL,
    feature TEXT NOT NULL,
    period TEXT NOT NULL,
    count INTEGER DEFAULT 0,
    PRIMARY KEY (user_id, feature, period),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Histórico de imagens geradas com expiração automática
CREATE TABLE IF NOT EXISTS image_history (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    image_url TEXT NOT NULL,
    prompt TEXT NOT NULL,
    created_at TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Histórico do Exterminador de Objeções vinculado a Leads
CREATE TABLE IF NOT EXISTS objection_history (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    lead_id TEXT,
    image_url TEXT,
    gargalo TEXT NOT NULL,
    script TEXT NOT NULL,
    missao TEXT NOT NULL,
    created_at TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
