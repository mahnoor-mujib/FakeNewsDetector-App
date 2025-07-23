import React, { useState } from 'react';
import axios from 'axios';

function AnalyzePage() {
  const [articleText, setArticleText] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const analyzeArticle = async () => {
    if (!articleText.trim()) {
      alert("Please enter some article text.");
      return;
    }

    setLoading(true);
    setResult("");

    try {
      const response = await axios.post("http://localhost:5000/api/analyze", {
        articleText
      });

      setResult(response.data.result);
    } catch (error) {
      console.error("Frontend Error:", error);

      if (error.response) {
        setResult(`Error ${error.response.status}: ${error.response.data.message || 'Backend error'}`);
      } else if (error.request) {
        setResult("No response from backend (check if backend is running).");
      } else {
        setResult(`Unexpected error: ${error.message}`);
      }
    }

    setLoading(false);
  };

  return (
    <div style={{
      minHeight: 'calc(100vh - 80px)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: 'white'
    }}>
      <div style={{
        textAlign: 'center',
        backgroundColor: '#4a4a4a',
        padding: '30px',
        borderRadius: '10px',
        width: '90%',
        maxWidth: '800px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.3)'
      }}>
        <h1>📰 Fake News Detector</h1>

        <textarea
          rows="10"
          value={articleText}
          placeholder="Paste your news article here..."
          onChange={(e) => setArticleText(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#d3d3d3',
            color: '#000',
            border: 'none',
            borderRadius: '5px',
            marginTop: '20px',
            fontSize: '16px',
            boxSizing: 'border-box'
          }}
        />

        <br /><br />
        <button
          onClick={analyzeArticle}
          disabled={loading}
          style={{
            backgroundColor: '#333',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold'
          }}
        >
          {loading ? "Analyzing..." : "Analyze Article"}
        </button>

        {result && (
          <div
            style={{
              backgroundColor: '#2c2c2c',
              color: 'white',
              marginTop: '30px',
              padding: '20px',
              borderRadius: '5px',
              textAlign: 'left',
              width: '100%',
              maxWidth: '800px',
              boxSizing: 'border-box'
            }}
          >
            <h2 style={{ marginTop: 0 }}> Analysis Result:</h2>
            <div style={{
              whiteSpace: 'pre-wrap',
              wordWrap: 'break-word',
              fontFamily: 'inherit'
            }}>
              {result}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AnalyzePage;
