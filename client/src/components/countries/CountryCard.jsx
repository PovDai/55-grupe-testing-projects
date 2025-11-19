import React from 'react';
import './Countries.css';

export default function CountryCard({ country }) {
  return (
    <div className="card country-card">
      {country.flags?.svg ? (
        <img
          src={country.flags.svg}
          alt={`Flag of ${country.name}`}
          className="card-img-top country-flag"
        />
      ) : (
        <div className="card-img-top no-flag">
          No Flag
        </div>
      )}

      <div className="card-body">
        <h5 className="card-title">{country.name}</h5>
        <p className="card-text"><strong>Capital:</strong> {country.capital || 'N/A'}</p>
        <p className="card-text"><strong>Region:</strong> {country.region || 'N/A'}</p>
        <p className="card-text">
          <strong>Population:</strong> {country.population ? (country.population / 1000000).toFixed(1) + ' mln' : 'N/A'}
        </p>
      </div>
    </div>
  );
}
