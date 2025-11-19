import React from 'react';
import CountryCard from './CountryCard';

export default function CountryList({ countries }) {
  if (!countries || countries.length === 0)
    return <p className="text-center">No countries found.</p>;

  return (
    <div className="row g-4">
      {countries.map((country) => (
        <div key={country.cca3} className="col-12 col-sm-6 col-md-4 col-lg-3">
          <CountryCard country={country} />
        </div>
      ))}
    </div>
  );
}
