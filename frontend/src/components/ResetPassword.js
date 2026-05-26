import { useState } from 'react';
import axios from 'axios';
import { getApiUrl } from '../lib/api';

const BACKEND_URL = getApiUrl().replace(/\/api$/, '');

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const token = new URLSearchParams(window.location.search).get('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      setError('Token de recuperação ausente ou inválido.');
      return;
    }
    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres.');
      return;
    }
    if (password !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }

    setLoading(true);
    setError('');
    setMessage('');

    try {
      const response = await axios.post(`${BACKEND_URL}/api/auth/reset-password`, {
        token,
        new_password: password
      });
      setMessage(response.data.message || 'Senha redefinida com sucesso! Redirecionando...');
      setTimeout(() => {
        window.location.href = '/login';
      }, 3000);
    } catch (err) {
      setError(err.response?.data?.detail || 'Erro ao redefinir a senha. O link pode ter expirado.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', alignItems: 'center', justifyContent: 'center', background: '#080808' }}>
      <div style={{ width: '100%', maxWidth: '400px', padding: '40px', background: '#0C0C0C', border: '1px solid #1E0505', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)', textAlign: 'center' }}>
        <img src="/logo-fire-branco.png" alt="Estrategista Fire" style={{ width: '150px', marginBottom: '28px', filter: 'drop-shadow(0 0 12px rgba(192,57,43,0.4))' }} />
        <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#E0E0E0', marginBottom: '8px' }}>Redefinir Senha</h2>
        <p style={{ fontSize: '13px', color: '#666', marginBottom: '24px' }}>Crie uma nova senha de acesso para a sua conta.</p>

        {error && <div style={{ background: 'rgba(192,57,43,0.1)', border: '1px solid rgba(192,57,43,0.3)', color: '#E06060', padding: '12px', borderRadius: '8px', fontSize: '13px', marginBottom: '16px', textAlign: 'left' }}>{error}</div>}
        {message && <div style={{ background: 'rgba(62,207,142,0.1)', border: '1px solid rgba(62,207,142,0.3)', color: '#3ECF8E', padding: '12px', borderRadius: '8px', fontSize: '13px', marginBottom: '16px', textAlign: 'left' }}>{message}</div>}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'left' }}>
          <div>
            <label style={{ display: 'block', fontSize: '11px', color: '#AAA', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '8px' }}>Nova Senha</label>
            <input type="password" required className="fire-input" value={password} onChange={e => setPassword(e.target.value)} placeholder="Mínimo 6 caracteres" style={{ width: '100%' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '11px', color: '#AAA', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '8px' }}>Confirmar Senha</label>
            <input type="password" required className="fire-input" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Confirme a nova senha" style={{ width: '100%' }} />
          </div>

          <button type="submit" disabled={loading} className="fire-btn" style={{ width: '100%', padding: '14px', marginTop: '8px', fontSize: '14px', fontWeight: '600', letterSpacing: '0.02em' }}>
            {loading ? 'Redefinindo...' : 'Salvar Nova Senha'}
          </button>
        </form>

        <div style={{ marginTop: '24px' }}>
          <a href="/login" style={{ color: '#888', fontSize: '12px', textDecoration: 'none' }} onMouseEnter={e => e.currentTarget.style.color = '#E0E0E0'} onMouseLeave={e => e.currentTarget.style.color = '#888'}>Voltar para o Login</a>
        </div>
      </div>
    </div>
  );
}
