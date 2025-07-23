import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function UserProfile() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');
  const username = localStorage.getItem("username");
  const navigate = useNavigate();

  useEffect(() => {
    if (!username) {
      alert("Please login first");
      navigate('/login');
      return;
    }

    axios
      .get(`http://localhost:5000/api/profile/${username}`)
      .then((res) => {
        if (res.data.success) {
          setPosts(res.data.posts);
        }
      })
      .catch((err) => {
        console.error("Error fetching profile data:", err);
      });
  }, [username, navigate]);

  const filteredPosts = posts.filter((post) => {
    const text = (post.title + post.content + post.result).toLowerCase();
    return text.includes(search.toLowerCase());
  });

  return (
    <div style={{ padding: '2rem', backgroundColor: '#4a4a3f', minHeight: '100vh', color: 'white' }}>
      <h2>👤 {username}'s Activity Summary</h2>

      <input
        type="text"
        placeholder=" Search posts..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: '8px',
          marginBottom: '1rem',
          width: '60%',
          borderRadius: '5px',
          border: '1px solid #ccc',
          backgroundColor: '#f0f0f0',
          color: '#000'
        }}
      />

      {filteredPosts.length === 0 ? (
        <p>No posts match your search.</p>
      ) : (
        filteredPosts.map((post) => (
          <div
            key={post.id}
            style={{
              border: '1px solid #555',
              padding: '1rem',
              marginBottom: '1rem',
              borderRadius: '8px',
              backgroundColor: '#3a3a3a', 
              color: 'white'              
            }}
          >
            <h3>{post.title}</h3>
            <p>{post.result || post.content}</p>
            <p><strong>Interaction:</strong> {post.userAction === 'like' ? '👍 Liked' : '👎 Disliked'}</p>

            {post.comments && post.comments.some(c => c.startsWith(username)) && (
              <div style={{ marginTop: '0.5rem' }}>
                <strong>Your Comments:</strong>
                <ul>
                  {post.comments
                    .filter(c => c.startsWith(username))
                    .map((c, i) => <li key={i}>🗨️ {c}</li>)}
                </ul>
              </div>
            )}
          </div>
        ))
      )}

      <button
        onClick={() => navigate('/app/feed')}
        style={{
          marginTop: '1rem',
          backgroundColor: '#333',
          color: 'white',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '5px',
          cursor: 'pointer',
          fontWeight: 'bold'
        }}
      >
        🔙 Back to Feed
      </button>
    </div>
  );
}

export default UserProfile;
