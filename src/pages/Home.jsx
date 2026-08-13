import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Ana Səhifə</h1>
      <Link to="/dashboard">Dashboard-a Keç </Link> | <Link to="/login">Login</Link>
    </div>
  );
};

export default Home;