import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { usePosts } from '../hooks/usePosts';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const { posts = [], loading, error, addPost, deletePost } = usePosts();
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      alert('Zehmet olmasa, bütün xanaları doldurun.');
      return;
    }

    await addPost({ title: title.trim(), content: content.trim() });
    setTitle('');
    setContent('');
  };

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <div style={{ maxWidth: '650px', margin: '40px auto', padding: '0 20px', fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ margin: 0 }}>Xoş gəldiniz, {user?.name || 'İstifadəçi'}!</h2>
        <button 
          onClick={handleLogout} 
          style={{ padding: '8px 16px', background: '#8b4b4b', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          Çıxış
        </button>
      </div>

      <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: '20px 0' }} />

      <div style={{ background: '#f9f9f9', padding: '20px', borderRadius: '8px', marginBottom: '30px' }}>
        <h3 style={{ marginTop: 0, marginBottom: '16px' }}>Yeni Post Əlavə Et</h3>
        <form onSubmit={handleAdd} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <input 
            type="text" 
            placeholder="Başlıq" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)}
            style={{ padding: '10px 12px', borderRadius: '6px', border: '1px solid #ccc', outline: 'none' }}
          />
          <textarea 
            placeholder="Məzmun" 
            value={content} 
            onChange={(e) => setContent(e.target.value)}
            style={{ padding: '10px 12px', borderRadius: '6px', border: '1px solid #ccc', minHeight: '80px', outline: 'none', resize: 'vertical' }}
          />
          <button 
            type="submit" 
            style={{ padding: '10px', background: '#7c98b7', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}
          >
            Əlavə Et
          </button>
        </form>
      </div>

      <h3>Postlar Siyahısı</h3>

      {error && <p style={{ color: '#e4cfcf' }}>{error}</p>}

      {loading ? (
        <p>Yüklənir...</p>
      ) : posts.length === 0 ? (
        <p style={{ color: '#777' }}>Hələ ki heç bir post yoxdur.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {posts.map((post) => (
            <div 
              key={post.id} 
              style={{ border: '1px solid #354b68', padding: '16px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fff' }}
            >
              <div style={{ paddingRight: '12px' }}>
                <h4 style={{ margin: '0 0 6px 0', fontSize: '16px' }}>{post.title}</h4>
                <p style={{ margin: 0, color: '#4a5568', fontSize: '14px' }}>{post.content}</p>
              </div>
              <button 
                onClick={() => deletePost(post.id)} 
                style={{ padding: '6px 12px', background: '#fff', color: '#cb3535', border: '1px solid #b82121', borderRadius: '6px', cursor: 'pointer', flexShrink: 0 }}
              >
                Sil
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;