import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function FakeNewsFeed() {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState({});
  const [voteState, setVoteState] = useState({});
  const [search, setSearch] = useState('');

  const username = localStorage.getItem("username");
  const location = useLocation();

  useEffect(() => {
    const fetchData = () => {
      axios
        .get('http://localhost:5000/api/fakenews?limit=10')
        .then((res) => {
          setPosts(res.data);
        })
        .catch((err) => {
          console.error("Error fetching posts:", err);
        });
    };

    fetchData(); // Fetch immediately
    const interval = setInterval(fetchData, 10000); // Refresh every 10s

    return () => clearInterval(interval); // Cleanup
  }, [location]); // Re-fetch when navigated to this page

  const handleLike = (id) => {
    if (!username) return alert("Please log in first.");
    if (voteState[id] === 'like') return;

    const alreadyDisliked = voteState[id] === 'dislike';

    axios.post('http://localhost:5000/api/fakenews/like', { id, username }).then(() => {
      setPosts((prev) =>
        prev.map((p) =>
          p.id === id
            ? {
                ...p,
                likes: p.likes + 1,
                dislikes: alreadyDisliked ? p.dislikes - 1 : p.dislikes,
              }
            : p
        )
      );
      setVoteState((prev) => ({ ...prev, [id]: 'like' }));
    });
  };

  const handleDislike = (id) => {
    if (!username) return alert("Please log in first.");
    if (voteState[id] === 'dislike') return;

    const alreadyLiked = voteState[id] === 'like';

    axios.post('http://localhost:5000/api/fakenews/dislike', { id, username }).then(() => {
      setPosts((prev) =>
        prev.map((p) =>
          p.id === id
            ? {
                ...p,
                dislikes: p.dislikes + 1,
                likes: alreadyLiked ? p.likes - 1 : p.likes,
              }
            : p
        )
      );
      setVoteState((prev) => ({ ...prev, [id]: 'dislike' }));
    });
  };

  const handleComment = (id, text) => {
    if (!username) return alert("Please log in first.");
    if (!text.trim()) return;

    axios
      .post('http://localhost:5000/api/fakenews/comment', { id, comment: text, username })
      .then(() => {
        const commentEntry = `${username}: ${text}`;
        setComments((prev) => ({ ...prev, [id]: '' }));
        setPosts((prev) =>
          prev.map((p) =>
            p.id === id
              ? { ...p, comments: [...p.comments, commentEntry] }
              : p
          )
        );
      });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      axios.delete(`http://localhost:5000/api/fakenews/${id}`).then(() => {
        setPosts((prev) => prev.filter((p) => p.id !== id));
      });
    }
  };

  const filteredPosts = posts.filter((post) => {
    const text = (post.title + post.content + post.result).toLowerCase();
    return text.includes(search.toLowerCase());
  });

  return (
    <div style={{ padding: '2rem', color: 'white' }}>
      <h2>🔥 Most Famous Fake News</h2>

      <input
        type="text"
        placeholder="Search news..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: '8px',
          marginBottom: '1rem',
          width: '60%',
          borderRadius: '6px',
          border: '1px solid #ccc',
          backgroundColor: '#f0f0f0',
          color: '#000'
        }}
      />

      {filteredPosts.length === 0 ? (
        <p>No fake news posts found.</p>
      ) : (
        filteredPosts.map((post) => (
          <div
            key={post.id}
            style={{
              border: '1px solid #555',
              padding: '1rem',
              marginBottom: '1.5rem',
              borderRadius: '10px',
              backgroundColor: '#3a3a3a',
              color: 'white'
            }}
          >
            <h3>{post.title}</h3>
            <p>{post.result || post.content}</p>
            <p>👍 {post.likes} | 👎 {post.dislikes}</p>

            <button
              onClick={() => handleLike(post.id)}
              disabled={voteState[post.id] === 'like'}
              style={{
                backgroundColor: '#5D4037',
                color: 'white',
                border: 'none',
                padding: '6px 12px',
                borderRadius: '5px',
                cursor: 'pointer',
                marginRight: '10px'
              }}
            >
              👍 Like
            </button>

            <button
              onClick={() => handleDislike(post.id)}
              disabled={voteState[post.id] === 'dislike'}
              style={{
                backgroundColor: '#5D4037',
                color: 'white',
                border: 'none',
                padding: '6px 12px',
                borderRadius: '5px',
                cursor: 'pointer',
                marginRight: '10px'
              }}
            >
              👎 Dislike
            </button>

            <button
              onClick={() => handleDelete(post.id)}
              style={{
                backgroundColor: '#5D4037',
                color: 'red',
                border: 'none',
                padding: '6px 12px',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              🗑️ Delete
            </button>

            <div style={{ marginTop: '1rem' }}>
              <input
                type="text"
                placeholder="Add a comment..."
                value={comments[post.id] || ''}
                onChange={(e) =>
                  setComments({ ...comments, [post.id]: e.target.value })
                }
                style={{
                  width: '70%',
                  marginRight: '10px',
                  padding: '6px',
                  borderRadius: '5px',
                  border: '1px solid #ccc',
                  backgroundColor: '#3a3a3a',
                  color: 'white'
                }}
              />
              <button
                onClick={() => handleComment(post.id, comments[post.id])}
                style={{
                  backgroundColor: '#5D4037',
                  color: 'white',
                  border: 'none',
                  padding: '6px 12px',
                  borderRadius: '5px',
                  cursor: 'pointer'
                }}
              >
                💬 Comment
              </button>
            </div>

            {post.comments && post.comments.length > 0 && (
              <div style={{ marginTop: '1rem' }}>
                <strong>Comments:</strong>
                <ul>
                  {post.comments.map((c, i) => (
                    <li key={i}>🗨️ {c}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default FakeNewsFeed;
