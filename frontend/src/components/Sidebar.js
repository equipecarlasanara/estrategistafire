import { useRef } from 'react';
import axios from 'axios';
import { Brain, Target, FileText, User, BookOpen, Shield, TrendingUp, Edit3, LogOut, Camera, Crown } from 'lucide-react';
import { getApiUrl } from '../lib/api';

const API = getApiUrl();
const auth = () => ({ headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });

const nav = [
  { id: 'estrategista', label: 'Estrategista Digital', icon: Brain },
  { id: 'dashboard', label: 'Dashboard de Metas', icon: Target },
  { id: 'prompts', label: 'Biblioteca de Prompts', icon: FileText },
  { id: 'analise', label: 'Análise de Perfil', icon: User },
  { id: 'biblioteca', label: 'Biblioteca de Conteúdo', icon: BookOpen },
  { id: 'objecao', label: 'Exterminador de Objeção', icon: Shield },
  { id: 'funil', label: 'Funil de Vendas', icon: TrendingUp },
  { id: 'editor', label: 'Editor de Fotos', icon: Edit3 },
];

export default function Sidebar({ active, setActive, user, onLogout, onUpdateUser }) {
  const fileInputRef = useRef(null);

  const adminEmails = ["carlasanara1@gmail.com", "andressamallinsk@gmail.com"];
  const isUserAdmin = user && (user.is_admin === 1 || user.is_admin === true || adminEmails.includes(user.email.toLowerCase()));

  const menuItems = [...nav];
  if (isUserAdmin && !menuItems.some(item => item.id === 'admin')) {
    menuItems.push({ id: 'admin', label: 'Painel Admin', icon: Crown });
  }

  const handleAvatarUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const base64Avatar = reader.result;
        const { data } = await axios.post(`${API}/auth/avatar`, { avatar_url: base64Avatar }, auth());
        if (data.success && onUpdateUser) {
          onUpdateUser({ ...user, avatar_url: base64Avatar });
          alert('Foto de perfil atualizada com sucesso!');
        }
      } catch (err) {
        alert('Erro ao atualizar foto de perfil.');
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <aside style={{ width: '220px', background: '#0C0C0C', borderRight: '1px solid #1A0505', display: 'flex', flexDirection: 'column', padding: '20px 12px', flexShrink: 0 }}>

      {/* Logo e Perfil */}
      <div style={{ textAlign: 'center', paddingBottom: '20px', borderBottom: '1px solid #1A0505', marginBottom: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <img src="/logo-fire-branco.png" alt="Estrategista Fire"
          style={{ width: '130px', filter: 'drop-shadow(0 0 12px rgba(192,57,43,0.4))', marginBottom: '12px' }} />
        
        {user && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <div style={{ position: 'relative', width: '50px', height: '50px', borderRadius: '50%', border: '2px solid #C0392B', overflow: 'hidden', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                 onClick={() => fileInputRef.current?.click()}
                 title="Alterar foto de perfil">
              <img src={user.avatar_url || '/lion-profile.jpg'} alt="Sua Foto" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', opacity: 0, transition: 'opacity 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                   onMouseEnter={e => e.currentTarget.style.opacity = 1}
                   onMouseLeave={e => e.currentTarget.style.opacity = 0}>
                <Camera size={14} style={{ color: '#fff' }} />
              </div>
            </div>
            <input type="file" accept="image/*" ref={fileInputRef} onChange={handleAvatarUpload} style={{ display: 'none' }} />
            <p style={{ color: '#E0E0E0', fontSize: '12px', fontWeight: '500', margin: 0 }}>{user.name}</p>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2px' }}>
        {menuItems.map(({ id, label, icon: Icon }) => {
          const isActive = active === id;
          return (
            <button key={id} onClick={() => setActive(id)}
              style={{
                display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px',
                borderRadius: '8px', border: 'none', cursor: 'pointer', textAlign: 'left', width: '100%',
                background: isActive ? 'linear-gradient(135deg, #2A0808, rgba(192,57,43,0.15))' : 'transparent',
                borderLeft: isActive ? '2px solid #C0392B' : '2px solid transparent',
                color: isActive ? '#E0E0E0' : '#555',
                fontSize: '12px', fontWeight: isActive ? '500' : '400', letterSpacing: '0.02em',
                transition: 'all 0.15s',
              }}
              onMouseEnter={e => { if (!isActive) { e.currentTarget.style.color = '#999'; e.currentTarget.style.background = '#141414'; }}}
              onMouseLeave={e => { if (!isActive) { e.currentTarget.style.color = '#555'; e.currentTarget.style.background = 'transparent'; }}}
            >
              <Icon size={14} style={{ color: isActive ? '#C0392B' : '#444', flexShrink: 0 }} />
              {label}
            </button>
          );
        })}
      </nav>

      {/* Logout */}
      <button onClick={onLogout}
        style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', borderRadius: '8px', border: '1px solid #1A0505', background: 'transparent', color: '#444', fontSize: '12px', cursor: 'pointer', marginTop: '8px', transition: 'all 0.15s' }}
        onMouseEnter={e => { e.currentTarget.style.color = '#E0E0E0'; e.currentTarget.style.background = '#1A0505'; }}
        onMouseLeave={e => { e.currentTarget.style.color = '#444'; e.currentTarget.style.background = 'transparent'; }}
      >
        <LogOut size={14} /> Sair
      </button>
    </aside>
  );
}
