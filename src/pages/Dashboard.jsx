import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user, logout, simulate401Error } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <div style={{ padding: '30px', fontFamily: 'sans-serif' }}>
      <h1>Xoş gəldin, {user?.name || 'İstifadəçi'}!</h1>
      <p>Bu səhifə qorunur. E-poçtunuz: <b>{user?.email}</b></p>

      <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
        <button 
          onClick={handleLogout}
          style={{ padding: '10px 16px', background: '#e53e3e', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
        >
          Çıxış Et (Logout)
        </button>

        <button 
          onClick={simulate401Error}
          style={{ padding: '10px 16px', background: '#dd6b20', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
        >
          401 Token Expiry Test
        </button>
      </div>
    </div>
  );
};

export default Dashboard;