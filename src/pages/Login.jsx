import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    localStorage.setItem('token', 'my-secret-token');
    navigate('/dashboard');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Login Səhifəsi</h1>
      <button onClick={handleLogin}>Daxil Ol (Test)</button>
    </div>
  );
};

export default Login;