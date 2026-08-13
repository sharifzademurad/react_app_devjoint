import { Link } from 'react-router-dom';

const NotFound = () => (
  <div style={{ padding: '20px' }}>
    <h1>404 - Səhifə Tapılmadı</h1>
    <Link to="/">Ana səhifəyə qayıt</Link>
  </div>
);

export default NotFound;