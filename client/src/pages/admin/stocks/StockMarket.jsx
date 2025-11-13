import React, { useState, useEffect } from 'react';


export function StockTracker() {
  const [symbol, setSymbol] = useState('TSLA');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchStockData = async (currentSymbol) => {
    if (!currentSymbol) return;
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const res = await fetch(`http://localhost:5559/api/stock/${currentSymbol}`);
      const json = await res.json();
      const quote = json['Global Quote'];

      if (!quote) throw new Error('Nepavyko gauti duomenų iš API.');

      setData({
        symbol: quote['01. symbol'],
        open: parseFloat(quote['02. open']),
        high: parseFloat(quote['03. high']),
        low: parseFloat(quote['04. low']),
        price: parseFloat(quote['05. price']),
        volume: parseInt(quote['06. volume']),
        latestDay: quote['07. latest trading day'],
        previousClose: parseFloat(quote['08. previous close']),
        change: parseFloat(quote['09. change']),
        changePercent: quote['10. change percent'],
      });
    } catch (err) {
      console.error('Klaida gaunant akcijų duomenis:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      fetchStockData(symbol.toUpperCase());
    }, 500);
    return () => clearTimeout(delay);
  }, [symbol]);

  return (
    <div className="container stock-container">
      <h1 className="title">📈 Stock watch — maximum 25 per day</h1>

      <input
        type="text"
        placeholder="Input ticker (e.g. TSLA, AAPL)"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value.toUpperCase())}
        className="ticker-input"
      />

      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">❌ {error}</p>}

      {data && !loading && !error && (
        <div className="stock-card">
          <h2>{data.symbol}</h2>
          <p className="price">Price: ${data.price.toFixed(2)}</p>
          <p className={`change ${data.change >= 0 ? 'positive' : 'negative'}`}>
            Change: {data.change.toFixed(2)} ({data.changePercent})
          </p>

          <div className="details">
            <p>Open: ${data.open.toFixed(2)}</p>
            <p>High: ${data.high.toFixed(2)}</p>
            <p>Low: ${data.low.toFixed(2)}</p>
            <p>Previous Close: ${data.previousClose.toFixed(2)}</p>
            <p>Volume: {data.volume.toLocaleString()}</p>
            <p>Last Trading Day: {data.latestDay}</p>
          </div>
          
        </div>
      )}
    </div>

  )
}