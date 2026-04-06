import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Home() {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const response = await axios.get('/api/stocks');
        setStocks(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchStocks();
  }, []);

  if (loading) return <div className="container"><h1>Loading...</h1></div>;
  if (error) return <div className="container"><h1>Error: {error}</h1></div>;

  return (
    <div className="container">
      <h1>🎯 Hong Kong Stock LEGO Analyzer</h1>
      <p>Real-time Hong Kong stock analysis with technical indicators and LEGO trading signals</p>
      <div className="stocks-grid">
        {stocks.length > 0 ? (
          stocks.map((stock) => (
            <div key={stock.code} className="stock-card">
              <h3>{stock.name} ({stock.code})</h3>
              <p>Price: HK${stock.price}</p>
              <p>Change: {stock.change}%</p>
              <p>MA5: HK${stock.ma5}</p>
              <p>MA20: HK${stock.ma20}</p>
              <p>RSI: {stock.rsi}</p>
              <p>Signal: {stock.signal}</p>
            </div>
          ))
        ) : (
          <p>No stocks available</p>
        )}
      </div>
      <style jsx>{` 
        .container { max-width: 1200px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif; }
        h1 { color: #333; text-align: center; }
        .stocks-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px; margin-top: 30px; }
        .stock-card { border: 1px solid #ddd; border-radius: 8px; padding: 20px; background: #f9f9f9; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .stock-card h3 { margin-top: 0; color: #0066cc; }
        .stock-card p { margin: 10px 0; color: #666; }
      `}</style>
    </div>
  );
}