import React, { useState, useEffect } from 'react';


export function AdvicePage() {
  const [advice, setAdvice] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchAdvice = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5559/api/advice');
      const data = await response.json();
      setAdvice(data.slip.advice);
    } catch (error) {
      console.error('Klaida gaunant patarimą:', error);
      setAdvice('Nepavyko gauti patarimo 😔');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAdvice();
  }, []);

  return (
    <div className="container advice-container">
      <h1>Advice Generator</h1>

      {loading ? (
        <p className="loading-text">Loading...</p>
      ) : (
        <p className="advice-text">{advice}</p>
      )}

      <button className="btn btn-warning" onClick={fetchAdvice}>
        Get Advice
      </button>
    </div>
  )
}