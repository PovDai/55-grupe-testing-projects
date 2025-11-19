import React, { useState, useEffect } from 'react';
import { NasaCard } from './NasaCard';


export  function Nasa() {
  const [apod, setApod] = useState(null);
  const [date, setDate] = useState('');

  // Funkcija fetch APOD iš backend
  const fetchAPOD = async (selectedDate = '') => {
    try {
      const res = await fetch(`http://localhost:5559/api/apod${selectedDate ? `?date=${selectedDate}` : ''}`);
      const data = await res.json();
      setApod(data);
    } catch (err) {
      console.error('Frontend error:', err);
    }
  };

  // Fetch default APOD (dabartinė diena) komponentui mountinant
  useEffect(() => {
    fetchAPOD();
  }, []);

  // Formos submit event
  const handleSearch = (e) => {
    e.preventDefault();
    fetchAPOD(date);
  };

  if (!apod) return <p className="text-center mt-4">Loading...</p>;

  return (
    <div className="container my-2 col-12 col-sm-8 col-md-7 col-lg-7 col-xl-5 col-xxl-5">
      <h1 className="mb-4 text-center">NASA Astronomy Picture of the Day 🌌</h1>

      {/* Date picker */}
      <form className="d-flex justify-content-center mb-4" onSubmit={handleSearch}>
        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          className="form-control w-50 me-2"
        />
        <button type="submit" className="btn btn-primary">Search</button>
      </form>

      {/* Kortelė */}
      <NasaCard apod={apod} />
    </div>
  );
}