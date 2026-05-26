import { useState, useEffect } from 'react';
import axios from 'axios';
import { Upload, Download, Edit3, Cloud, Link2, Trash2 } from 'lucide-react';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const auth = () => ({ headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });

export default function ImageEditor({ user, onUpdateUser }) {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  
  const [history, setHistory] = useState([]);
  const [showDriveModal, setShowDriveModal] = useState(false);
  const [driveInput, setDriveInput] = useState(user?.google_drive_link || '');
  const [driveSaving, setDriveSaving] = useState(false);
  const [driveBackupStatus, setDriveBackupStatus] = useState('');

  const fetchHistory = async () => {
    try {
      const { data } = await axios.get(`${API}/image-history`, auth());
      if (Array.isArray(data)) setHistory(data);
    } catch {}
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => { setImage({ base64: reader.result.split(',')[1] }); setPreview(reader.result); setResult(null); };
    reader.readAsDataURL(file);
  };

  const edit = async () => {
    if (!image || !prompt.trim()) { alert('Envie uma imagem e descreva a edição.'); return; }
    setLoading(true); setResult(null);
    try {
      const { data } = await axios.post(`${API}/ai/edit-image`, { image, prompt }, auth());
      setResult(data.imageUrl);

      // Salvar no histórico
      await axios.post(`${API}/image-history`, { image_url: data.imageUrl, prompt }, auth());
      fetchHistory();

      // Sincronizar com Drive se configurado
      if (user?.google_drive_link) {
        setDriveBackupStatus('backup');
        setTimeout(() => {
          setDriveBackupStatus('done');
          setTimeout(() => setDriveBackupStatus(''), 2000);
        }, 1500);
      }
    } catch { alert('Erro ao editar. Tente novamente.'); }
    finally { setLoading(false); }
  };

  const saveDriveLink = async () => {
    setDriveSaving(true);
    try {
      const { data } = await axios.patch(`${API}/auth/google-drive`, { google_drive_link: driveInput }, auth());
      if (data.success && onUpdateUser) {
        onUpdateUser({ ...user, google_drive_link: driveInput });
        setShowDriveModal(false);
      }
    } catch {
      alert('Erro ao salvar link do Google Drive.');
    } finally {
      setDriveSaving(false);
    }
  };

  const download = (url, name = 'imagem-editada.jpg') => {
    const a = document.createElement('a'); a.href = url; a.download = name; a.click();
  };

  const calculateDaysRemaining = (createdAtStr) => {
    try {
      const created = new Date(createdAtStr);
      const diffTime = Math.abs(new Date() - created);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      const remaining = 7 - diffDays;
      if (remaining <= 0) return 'Expira hoje';
      return `Expira em ${remaining} dia${remaining > 1 ? 's' : ''}`;
    } catch {
      return 'Expira em breve';
    }
  };

  return (
    <div style={{ height: '100%', overflowY: 'auto', padding: '28px', background: '#080808' }}>
      
      {/* Header com Google Drive */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', maxWidth: '900px' }}>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: '700', color: '#E0E0E0', marginBottom: '6px' }}>Editor de Fotos</h1>
          <p style={{ color: '#999', fontSize: '13px', margin: 0 }}>Envie uma imagem e use comandos de texto para editá-la com IA.</p>
        </div>

        {user?.google_drive_link ? (
          <div onClick={() => setShowDriveModal(true)} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(62,207,142,0.06)', border: '1px solid rgba(62,207,142,0.2)', borderRadius: '8px', padding: '6px 12px', color: '#3ECF8E', fontSize: '11px', transition: 'all 0.2s' }}>
            <Cloud size={13} style={{ animation: driveBackupStatus === 'backup' ? 'pulse 1s infinite' : 'none' }} />
            <span>{driveBackupStatus === 'backup' ? 'Enviando ao Drive...' : driveBackupStatus === 'done' ? 'Salvo no Drive!' : 'Backup no Drive Ativo'}</span>
          </div>
        ) : (
          <button onClick={() => setShowDriveModal(true)}
            style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.03)', border: '1px solid #1E0505', borderRadius: '8px', padding: '6px 12px', color: '#888', fontSize: '11px', cursor: 'pointer' }}>
            <Link2 size={13} /> Vincular Drive
          </button>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', maxWidth: '900px', marginBottom: '40px' }}>
        {/* Original */}
        <div style={{ background: '#111', border: '1px solid #1E0505', borderRadius: '12px', padding: '24px' }}>
          <h3 style={{ color: '#E0E0E0', fontSize: '14px', fontWeight: '600', marginBottom: '16px' }}>Imagem Original</h3>
          <label style={{ display: 'block', border: '2px dashed #2A0808', borderRadius: '10px', padding: preview ? '0' : '40px', textAlign: 'center', cursor: 'pointer', overflow: 'hidden' }}>
            {preview ? (
              <img src={preview} alt="Original" style={{ width: '100%', borderRadius: '8px', display: 'block' }} />
            ) : (
              <><Upload size={28} style={{ color: '#C0392B', margin: '0 auto 8px' }} /><p style={{ color: '#AAA', fontSize: '13px' }}>Clique para enviar</p></>
            )}
            <input type="file" accept="image/*" onChange={handleFile} style={{ display: 'none' }} />
          </label>

          <div style={{ marginTop: '16px' }}>
            <label style={{ display: 'block', fontSize: '11px', color: '#AAA', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '8px' }}>
              Comando de Edição
            </label>
            <textarea value={prompt} onChange={e => setPrompt(e.target.value)}
              placeholder='Ex: "Adicione um filtro retrô", "Remova o fundo", "Mude o cenário para escritório"...'
              rows={3} className="fire-input" style={{ resize: 'none', fontFamily: 'inherit', fontSize: '13px' }} />
          </div>

          <button onClick={edit} disabled={loading || !image || !prompt.trim()} className="fire-btn"
            style={{ width: '100%', marginTop: '16px', padding: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <Edit3 size={14} />
            {loading ? 'Editando...' : 'Aplicar Edição'}
          </button>
        </div>

        {/* Resultado */}
        <div style={{ background: '#111', border: '1px solid #1E0505', borderRadius: '12px', padding: '24px' }}>
          <h3 style={{ color: '#E0E0E0', fontSize: '14px', fontWeight: '600', marginBottom: '16px' }}>Imagem Editada</h3>
          {loading && (
            <div style={{ aspectRatio: '1', background: '#0A0A0A', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'pulse 1.5s infinite' }}>
              <p style={{ color: '#888', fontSize: '13px' }}>Processando...</p>
            </div>
          )}
          {result && !loading && (
            <>
              <img src={result} alt="Editada" style={{ width: '100%', borderRadius: '8px', border: '1px solid #2A0808' }} />
              <button onClick={() => download(result)} className="fire-btn" style={{ width: '100%', marginTop: '12px', padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '12px' }}>
                <Download size={14} /> Baixar
              </button>
            </>
          )}
          {!result && !loading && (
            <div style={{ aspectRatio: '1', background: '#0A0A0A', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <p style={{ color: '#777', fontSize: '13px' }}>Resultado aparecerá aqui</p>
            </div>
          )}
        </div>
      </div>

      {/* Seção de Histórico de 7 Dias */}
      <div style={{ maxWidth: '900px', borderTop: '1px solid #1A0505', paddingTop: '28px' }}>
        <h3 style={{ color: '#E0E0E0', fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>Histórico de Imagens (7 dias)</h3>
        <p style={{ color: '#666', fontSize: '12px', marginBottom: '20px' }}>Suas imagens geradas ficam salvas aqui por 7 dias antes de serem auto-excluídas.</p>
        
        {history.length === 0 ? (
          <div style={{ background: '#0C0C0C', border: '1px solid #111', borderRadius: '12px', padding: '40px', textAlign: 'center', color: '#555', fontSize: '13px' }}>
            Nenhuma imagem no histórico ainda. Edite uma foto para salvá-la aqui.
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '16px' }}>
            {history.map(item => (
              <div key={item.id} style={{ background: '#111', border: '1px solid #1A1A1A', borderRadius: '10px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <div style={{ position: 'relative', aspectRatio: '1.2', background: '#000', overflow: 'hidden' }}>
                  <img src={item.image_url} alt="Edição anterior" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', bottom: '4px', right: '4px', background: 'rgba(0,0,0,0.7)', color: '#FF7675', fontSize: '9px', fontWeight: '500', padding: '2px 6px', borderRadius: '4px' }}>
                    {calculateDaysRemaining(item.created_at)}
                  </div>
                </div>
                <div style={{ padding: '10px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <p style={{ color: '#999', fontSize: '11px', margin: '0 0 10px 0', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', lineHeight: '1.3' }} title={item.prompt}>
                    "{item.prompt}"
                  </p>
                  <button onClick={() => download(item.image_url, `historico-${item.id}.jpg`)} className="fire-btn" style={{ padding: '6px', fontSize: '11px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', width: '100%' }}>
                    <Download size={11} /> Baixar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal de Configuração do Google Drive */}
      {showDriveModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.8)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#0C0C0C', border: '1px solid #1E0505', borderRadius: '16px', padding: '24px', width: '90%', maxWidth: '400px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
            <h3 style={{ color: '#E0E0E0', margin: '0 0 8px 0', fontSize: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Cloud size={18} style={{ color: '#C0392B' }} /> Google Drive
            </h3>
            <p style={{ color: '#666', fontSize: '12px', margin: '0 0 20px 0', lineHeight: '1.5' }}>
              Insira o link da pasta compartilhada do seu Google Drive. O histórico de conversas e imagens geradas serão sincronizados nesta pasta.
            </p>
            <input type="text" className="fire-input" value={driveInput} onChange={e => setDriveInput(e.target.value)} placeholder="https://drive.google.com/drive/folders/..." style={{ width: '100%', marginBottom: '20px' }} />
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button onClick={() => setShowDriveModal(false)} style={{ background: 'transparent', border: '1px solid #222', borderRadius: '8px', padding: '8px 16px', color: '#888', cursor: 'pointer', fontSize: '12px' }}>
                Cancelar
              </button>
              <button onClick={saveDriveLink} disabled={driveSaving} className="fire-btn" style={{ padding: '8px 16px', fontSize: '12px' }}>
                {driveSaving ? 'Salvando...' : 'Salvar Pasta'}
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`@keyframes pulse { 0%,100%{opacity:0.5} 50%{opacity:0.8} }`}</style>
    </div>
  );
}

