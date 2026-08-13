import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) return alert('Bütün xanaları doldurun!');

    login({ email, name: email.split('@')[0] });
    
    navigate('/dashboard', { replace: true });
  };

  return (
    <div style={{ maxWidth: '360px', margin: '40px auto', fontFamily: 'sans-serif' }}>
      <h2>Daxil Ol</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <input 
          type="email" 
          placeholder="E-poçt ünvanı" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}
        />
        <input 
          type="password" 
          placeholder="Şifrə" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}
        />
        <button 
          type="submit" 
          style={{ padding: '10px', background: '#0070f3', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
        >
          Daxil Ol
        </button>
      </form>
    </div>
  );
};

export default Login;