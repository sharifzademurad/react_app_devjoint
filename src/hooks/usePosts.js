import { useState, useEffect } from 'react';

const API_URL = 'http://localhost:5000/posts';

export const usePosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Məlumat yüklənərkən xəta baş verdi');
        setLoading(false);
      });
  }, []);

  const addPost = async (newPost) => {
    const tempId = Date.now().toString();
    const optimisticPost = { ...newPost, id: tempId };

    setPosts((prev) => [optimisticPost, ...prev]);

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPost),
      });
      const savedPost = await res.json();
      
      setPosts((prev) => prev.map((p) => (p.id === tempId ? savedPost : p)));
    } catch (err) {
      setPosts((prev) => prev.filter((p) => p.id !== tempId));
      alert('Əlavə edərkən xəta baş verdi!');
    }
  };

  const deletePost = async (id) => {
    const previousPosts = [...posts];

    setPosts((prev) => prev.filter((p) => p.id !== id));

    try {
      const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error();
    } catch (err) {
      setPosts(previousPosts);
      alert('Silinərkən xəta baş verdi!');
    }
  };

  return { posts, loading, error, addPost, deletePost };
};