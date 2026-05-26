import { useState, useEffect } from 'react';
import axios from 'axios';
import { Send, Download } from 'lucide-react';
import { jsPDF } from 'jspdf';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const auth = () => ({ headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });

export default function SalesFunnel({ user }) {
  const [messages, setMessages] = useState([{ role: 'ai', text: 'Leoa! Vamos construir seu funil de vendas estratégico. 🔥\n\nPara começar, me diga: qual é o seu produto/serviço principal, para quem você vende e qual o preço?' }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const sessionId = `funnel_${user?.id || 'default'}`;

  // Carregar histórico do banco de dados ao montar
  useEffect(() => {
    const loadHistory = async () => {
      try {
        const { data } = await axios.get(`${API}/ai/chat?session_id=${sessionId}`, auth());
        if (data && data.length > 0) {
          const formatted = data.map(h => ({
            role: h.role === 'model' ? 'ai' : 'user',
            text: Array.isArray(h.parts) ? h.parts[0] : h.parts
          }));
          setMessages(formatted);
        }
      } catch {}
    };
    if (user?.id) {
      loadHistory();
    }
  }, [user, sessionId]);

  const send = async () => {
    if (!input.trim() || loading) return;
    const text = input.trim(); setInput('');
    setMessages(m => [...m, { role: 'user', text }]);
    setLoading(true);
    try {
      const { data } = await axios.post(`${API}/ai/build-funnel`, { message: text, session_id: sessionId }, auth());
      setMessages(m => [...m, { role: 'ai', text: data.response }]);
    } catch {
      setMessages(m => [...m, { role: 'ai', text: 'Erro ao processar. Tente novamente.' }]);
    } finally { setLoading(false); }
  };

  const downloadPDF = () => {
    const aiMessages = messages.filter(m => m.role === 'ai');
    if (aiMessages.length === 0) return;
    const funnelText = aiMessages[aiMessages.length - 1].text;

    const doc = new jsPDF();
    
    // Header do PDF
    doc.setFillColor(15, 5, 5);
    doc.rect(0, 0, 210, 40, 'F');
    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor(192, 57, 43); // Fire red
    doc.text("PLANO ESTRATÉGICO DE FUNIL", 14, 24);
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(150, 150, 150);
    doc.text(`Mentoria Andressa Mallinsk | Cliente: ${user?.name || 'Leoa'}`, 14, 32);
    
    // Divisor
    doc.setDrawColor(192, 57, 43);
    doc.setLineWidth(1.5);
    doc.line(0, 40, 210, 40);
    
    // Conteúdo
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10.5);
    doc.setTextColor(33, 33, 33);
    
    const splitText = doc.splitTextToSize(funnelText, 182);
    let y = 52;
    const pageHeight = doc.internal.pageSize.height;
    
    splitText.forEach(line => {
      if (y > pageHeight - 20) {
        doc.addPage();
        y = 20;
      }
      
      // Estilizar títulos markdown no PDF de forma básica
      if (line.startsWith('🎯') || line.startsWith('🧲') || line.startsWith('⚡') || line.startsWith('💰') || line.startsWith('📊')) {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(12);
        doc.setTextColor(192, 57, 43);
        y += 4;
        doc.text(line, 14, y);
        y += 2;
        doc.setFont("helvetica", "normal");
        doc.setFontSize(10.5);
        doc.setTextColor(33, 33, 33);
      } else {
        doc.text(line, 14, y);
      }
      y += 6.5;
    });
    
    doc.save(`funil_de_vendas_${user?.name?.toLowerCase().replace(/\s+/g, '_') || 'estrategia'}.pdf`);
  };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#080808' }}>
      <div style={{ padding: '20px 24px', borderBottom: '1px solid #1A0505', background: '#0C0C0C', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
        <div>
          <h1 style={{ fontSize: '20px', fontWeight: '700', color: '#E0E0E0', margin: 0 }}>Construtor de Funil de Vendas</h1>
          <p style={{ color: '#999', fontSize: '12px', marginTop: '4px' }}>Metodologia Andressa Mallinsk</p>
        </div>
        {messages.length > 1 && (
          <button onClick={downloadPDF} className="fire-btn" style={{ padding: '8px 16px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Download size={13} /> Baixar PDF
          </button>
        )}
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {messages.map((m, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
            <div style={{
              maxWidth: '80%', borderRadius: m.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
              padding: '14px 18px', fontSize: '14px', lineHeight: '1.6', whiteSpace: 'pre-wrap',
              background: m.role === 'user' ? 'linear-gradient(135deg, #5A0808, #C0392B)' : '#141414',
              border: m.role === 'user' ? 'none' : '1px solid #1E0505',
              color: m.role === 'user' ? '#fff' : '#D0D0D0',
            }}>
              {m.text}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ display: 'flex' }}>
            <div style={{ background: '#141414', border: '1px solid #1E0505', borderRadius: '16px 16px 16px 4px', padding: '14px 18px', display: 'flex', gap: '5px' }}>
              {[0,1,2].map(i => <div key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: '#C0392B', animation: `bounce 1s ${i*0.15}s infinite` }} />)}
            </div>
          </div>
        )}
      </div>

      <div style={{ padding: '16px 24px', borderTop: '1px solid #1A0505', background: '#0C0C0C', display: 'flex', gap: '10px' }}>
        <textarea value={input} onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } }}
          placeholder="Responda aqui..." rows={1} className="fire-input"
          style={{ flex: 1, resize: 'none', minHeight: '46px', maxHeight: '120px', fontFamily: 'inherit', fontSize: '13px' }} />
        <button onClick={send} disabled={!input.trim() || loading} className="fire-btn" style={{ padding: '12px 16px', flexShrink: 0 }}>
          <Send size={16} />
        </button>
      </div>
      <style>{`@keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-4px)} }`}</style>
    </div>
  );
}

