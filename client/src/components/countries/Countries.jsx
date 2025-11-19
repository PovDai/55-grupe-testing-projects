import React, { useState } from 'react';
import CountryList from './CountryList';


export function Countries() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState('');

  // Fetch filtered countries from backend
  const fetchCountries = async (name) => {
    if (!name) {
      setCountries([]); // jei input tuščias, nerodome kortelių
      return;
    }

    try {
      const res = await fetch(`http://localhost:5559/api/countries?name=${encodeURIComponent(name)}`);
      if (!res.ok) throw new Error('Nepavyko gauti duomenų');
      const data = await res.json();
      setCountries(data); // backend grąžina tik atitinkančias šalys
    } catch (err) {
      console.error(err);
      setCountries([]);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchCountries(search.trim());
  };

  return (
    <div className="container my-4">
      <h1 className="mb-4 text-center">Country Explorer 🌍</h1>

      {/* Paieškos form */}
      <form className="d-flex justify-content-center mb-4" onSubmit={handleSearch}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Enter country name"
          className="form-control w-50 me-2"
        />
        <button type="submit" className="btn btn-primary">Search</button>
      </form>

      {/* Tik po paieškos rodome korteles */}
      {countries.length > 0 ? (
        <CountryList countries={countries} />
      ) : search.trim() !== '' ? (
        <p className="text-center">No countries found.</p>
      ) : null}
    </div>
  );
}
