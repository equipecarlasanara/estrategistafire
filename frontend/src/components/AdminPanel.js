import { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Trash2, UserPlus, Shield, Calendar, Mail, RefreshCw, Crown, AlertTriangle, Users } from 'lucide-react';
import { getApiUrl } from '../lib/api';

const API = getApiUrl();
const auth = () => ({ headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });

export default function AdminPanel({ user }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdminUser, setIsAdminUser] = useState(false);
  const [creating, setCreating] = useState(false);
  const [message, setMessage] = useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${API}/api/admin/users`, auth());
      setUsers(data);
    } catch (err) {
      console.error('Erro ao buscar usuarias:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreateUser = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setMessage({ type: 'error', text: 'Todos os campos são obrigatórios!' });
      return;
    }
    setCreating(true);
    setMessage(null);
    try {
      await axios.post(`${API}/api/admin/users`, {
        name,
        email,
        password,
        is_admin: isAdminUser
      }, auth());
      setMessage({ type: 'success', text: 'Mentorada cadastrada com sucesso!' });
      setName('');
      setEmail('');
      setPassword('');
      setIsAdminUser(false);
      fetchUsers(); // Refresh list
    } catch (err) {
      setMessage({ 
        type: 'error', 
        text: err.response?.data?.detail || 'Erro ao cadastrar usuária.' 
      });
    } finally {
      setCreating(false);
    }
  };

  const handleDeleteUser = async (targetUser) => {
    if (targetUser.id === user.id) {
      alert('Você não pode deletar a sua própria conta de administrador.');
      return;
    }
    const confirm = window.confirm(
      `ATENÇÃO: Você tem certeza que deseja remover ${targetUser.name}?\n\nIsso apagará permanentemente o acesso dela e TODOS os registros associados (Metas, Ações Semanais, Leads, Histórico de Chats, Fotos e Planos de Ação) do banco de dados!`
    );
    if (!confirm) return;

    try {
      await axios.delete(`${API}/api/admin/users/${targetUser.id}`, auth());
      alert('Usuária removida com sucesso!');
      fetchUsers(); // Refresh list
    } catch (err) {
      alert(err.response?.data?.detail || 'Erro ao remover usuária.');
    }
  };

  const filteredUsers = users.filter(u => 
    u.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (dateStr) => {
    if (!dateStr) return '-';
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('pt-BR');
    } catch {
      return dateStr;
    }
  };

  return (
    <div style={{ height: '100%', overflowY: 'auto', padding: '24px', boxSizing: 'border-box', background: '#080808', color: '#E0E0E0' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', borderBottom: '1px solid #1A0505', paddingBottom: '16px' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '22px', fontWeight: '700', color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Crown style={{ color: '#C0392B' }} /> Painel de Controle de Mentoradas
          </h1>
          <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#666' }}>Gerencie as contas, acompanhe o uso do sistema e dê baixa em acessos.</p>
        </div>
        <button onClick={fetchUsers} disabled={loading} style={{ background: 'none', border: '1px solid #1A0505', borderRadius: '8px', padding: '8px', color: '#888', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', transition: 'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.background = '#111'; }}
                onMouseLeave={e => { e.currentTarget.style.color = '#888'; e.currentTarget.style.background = 'none'; }}>
          <RefreshCw size={14} className={loading ? 'spin-anim' : ''} />
          {loading ? 'Carregando...' : 'Atualizar'}
        </button>
      </div>

      <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
        
        {/* User List Panel (Left) */}
        <div style={{ flex: 2, minWidth: '350px' }}>
          
          {/* Search Box */}
          <div style={{ position: 'relative', marginBottom: '16px' }}>
            <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#555' }} />
            <input 
              type="text" 
              placeholder="Buscar por nome ou e-mail..." 
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{
                width: '100%', boxSizing: 'border-box', padding: '12px 12px 12px 40px', background: '#0C0C0C',
                border: '1px solid #1A0505', borderRadius: '10px', color: '#E0E0E0', fontSize: '13px',
                outline: 'none', transition: 'all 0.2s'
              }}
              onFocus={e => e.currentTarget.style.borderColor = '#C0392B'}
              onBlur={e => e.currentTarget.style.borderColor = '#1A0505'}
            />
          </div>

          {/* Table Card */}
          <div style={{ background: '#0C0C0C', border: '1px solid #1A0505', borderRadius: '12px', overflow: 'hidden' }}>
            {loading ? (
              <div style={{ padding: '60px 0', textAlign: 'center', color: '#555' }}>
                <RefreshCw size={24} className="spin-anim" style={{ color: '#C0392B', marginBottom: '8px' }} />
                <p style={{ margin: 0, fontSize: '14px' }}>Buscando base de mentoradas...</p>
              </div>
            ) : filteredUsers.length === 0 ? (
              <div style={{ padding: '60px 0', textAlign: 'center', color: '#555' }}>
                <Users size={28} style={{ marginBottom: '8px' }} />
                <p style={{ margin: 0, fontSize: '14px' }}>Nenhuma mentorada encontrada.</p>
              </div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12px' }}>
                  <thead>
                    <tr style={{ background: '#110202', borderBottom: '1px solid #1A0505' }}>
                      <th style={{ padding: '12px 16px', color: '#888', fontWeight: '600' }}>Mentorada</th>
                      <th style={{ padding: '12px 16px', color: '#888', fontWeight: '600' }}>Cadastro</th>
                      <th style={{ padding: '12px 16px', color: '#888', fontWeight: '600', textAlign: 'center' }}>Chats</th>
                      <th style={{ padding: '12px 16px', color: '#888', fontWeight: '600', textAlign: 'center' }}>Fotos (Mês)</th>
                      <th style={{ padding: '12px 16px', color: '#888', fontWeight: '600', textAlign: 'center' }}>Leads</th>
                      <th style={{ padding: '12px 16px', color: '#888', fontWeight: '600', textAlign: 'center' }}>Metas</th>
                      <th style={{ padding: '12px 16px', color: '#888', fontWeight: '600', textAlign: 'center' }}>Ações</th>
                      <th style={{ padding: '12px 16px', color: '#888', fontWeight: '600', textAlign: 'right' }}>Opções</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map(u => (
                      <tr key={u.id} style={{ borderBottom: '1px solid #150303', transition: 'background 0.15s' }}
                          onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.01)'}
                          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                        
                        {/* Name and email */}
                        <td style={{ padding: '14px 16px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: u.is_admin ? '#C0392B' : '#666' }} />
                            <div>
                              <div style={{ fontWeight: '600', color: '#fff', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                {u.name}
                                {u.is_admin && <Crown size={11} style={{ color: '#C0392B' }} title="Admin" />}
                              </div>
                              <div style={{ color: '#555', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                                <Mail size={10} /> {u.email}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Created At */}
                        <td style={{ padding: '14px 16px', color: '#777' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <Calendar size={11} />
                            {formatDate(u.created_at)}
                          </div>
                        </td>

                        {/* Chats count */}
                        <td style={{ padding: '14px 16px', textAlign: 'center', color: '#A0A0A0', fontWeight: '500' }}>
                          {u.stats?.contents || 0}
                        </td>

                        {/* Generated Photos count */}
                        <td style={{ padding: '14px 16px', textAlign: 'center' }}>
                          <span style={{ 
                            padding: '2px 6px', 
                            borderRadius: '4px', 
                            background: (u.stats?.photos || 0) >= 12 ? 'rgba(192,57,43,0.15)' : 'rgba(255,255,255,0.03)',
                            color: (u.stats?.photos || 0) >= 12 ? '#C0392B' : '#A0A0A0',
                            fontWeight: '600'
                          }}>
                            {u.stats?.photos || 0} / 15
                          </span>
                        </td>

                        {/* Leads count */}
                        <td style={{ padding: '14px 16px', textAlign: 'center', color: '#A0A0A0', fontWeight: '500' }}>
                          {u.stats?.leads || 0}
                        </td>

                        {/* Goals count */}
                        <td style={{ padding: '14px 16px', textAlign: 'center', color: '#A0A0A0', fontWeight: '500' }}>
                          {u.stats?.goals || 0}
                        </td>

                        {/* Weekly Actions count */}
                        <td style={{ padding: '14px 16px', textAlign: 'center', color: '#A0A0A0', fontWeight: '500' }}>
                          {u.stats?.actions || 0}
                        </td>

                        {/* Actions */}
                        <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                          <button 
                            onClick={() => handleDeleteUser(u)} 
                            disabled={u.id === user?.id}
                            style={{
                              background: 'none', border: 'none', cursor: u.id === user?.id ? 'not-allowed' : 'pointer',
                              color: u.id === user?.id ? '#222' : '#555', padding: '6px', borderRadius: '6px',
                              transition: 'all 0.2s', display: 'inline-flex', alignItems: 'center'
                            }}
                            onMouseEnter={e => { if (u.id !== user?.id) { e.currentTarget.style.color = '#C0392B'; e.currentTarget.style.background = 'rgba(192,57,43,0.1)'; }}}
                            onMouseLeave={e => { if (u.id !== user?.id) { e.currentTarget.style.color = '#555'; e.currentTarget.style.background = 'none'; }}}
                            title="Remover mentorada em definitivo"
                          >
                            <Trash2 size={13} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Create User Form (Right) */}
        <div style={{ flex: 1, minWidth: '280px', maxWidth: '380px', background: '#0C0C0C', border: '1px solid #1A0505', borderRadius: '12px', padding: '20px', boxSizing: 'border-box' }}>
          <h2 style={{ margin: '0 0 16px 0', fontSize: '15px', fontWeight: '600', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <UserPlus size={16} style={{ color: '#C0392B' }} /> Cadastrar Nova Mentorada
          </h2>
          
          <form onSubmit={handleCreateUser} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            
            <div>
              <label style={{ display: 'block', fontSize: '11px', color: '#666', textTransform: 'uppercase', marginBottom: '6px', fontWeight: '600' }}>Nome Completo</label>
              <input 
                type="text" 
                className="fire-input"
                placeholder="Ex: Amanda Silva"
                value={name}
                onChange={e => setName(e.target.value)}
                style={{ width: '100%', boxSizing: 'border-box' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '11px', color: '#666', textTransform: 'uppercase', marginBottom: '6px', fontWeight: '600' }}>Endereço de E-mail</label>
              <input 
                type="email" 
                className="fire-input"
                placeholder="amanda@exemplo.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={{ width: '100%', boxSizing: 'border-box' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '11px', color: '#666', textTransform: 'uppercase', marginBottom: '6px', fontWeight: '600' }}>Senha Temporária</label>
              <input 
                type="password" 
                className="fire-input"
                placeholder="Senha de acesso inicial"
                value={password}
                onChange={e => setPassword(e.target.value)}
                style={{ width: '100%', boxSizing: 'border-box' }}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '4px 0' }}>
              <input 
                type="checkbox" 
                id="is-admin-checkbox"
                checked={isAdminUser}
                onChange={e => setIsAdminUser(e.target.checked)}
                style={{ accentColor: '#C0392B', cursor: 'pointer' }}
              />
              <label htmlFor="is-admin-checkbox" style={{ fontSize: '12px', color: '#A0A0A0', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                Privilégio de Administrador <Shield size={11} style={{ color: '#C0392B' }} />
              </label>
            </div>

            {message && (
              <div style={{ 
                padding: '10px 12px', 
                borderRadius: '8px', 
                fontSize: '12px',
                background: message.type === 'error' ? 'rgba(192,57,43,0.1)' : 'rgba(62,207,142,0.1)',
                border: message.type === 'error' ? '1px solid rgba(192,57,43,0.2)' : '1px solid rgba(62,207,142,0.2)',
                color: message.type === 'error' ? '#E74C3C' : '#2ECC71',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                <AlertTriangle size={12} />
                <span>{message.text}</span>
              </div>
            )}

            <button type="submit" disabled={creating} className="fire-btn" style={{ padding: '12px', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '6px' }}>
              <UserPlus size={14} />
              {creating ? 'Cadastrando...' : 'Cadastrar Mentorada'}
            </button>
          </form>
        </div>

      </div>

      <style>{`
        .spin-anim {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>

    </div>
  );
}
