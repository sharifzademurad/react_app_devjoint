import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Dashboard (Gizli / Qorunan Səhifə)</h1>
      <p>Təbrik edirik! Uğurla daxil oldunuz.</p>
      <button onClick={handleLogout}>Çıxış Et</button>
    </div>
  );
};

export default Dashboard;