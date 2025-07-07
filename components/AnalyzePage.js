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
      const response = await axios.post("/api/analyze", {
        articleText
      });

      setResult(response.data.result);
    } catch (error) {
      setResult("❌ Error: Could not connect to the backend.");
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
          cols="80"
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
            fontSize: '16px'
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
            className="result-box"
            style={{
              backgroundColor: '#2c2c2c',
              color: 'white',
              marginTop: '30px',
              padding: '20px',
              borderRadius: '5px',
              textAlign: 'left',
              whiteSpace: 'pre-wrap'
            }}
          >
            <h2>🧠 Analysis Result:</h2>
            <pre>{result}</pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default AnalyzePage;
