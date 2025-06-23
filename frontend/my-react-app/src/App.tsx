import React, { useState, useEffect } from 'react';
import './App.css';

type Garden = {
  id: number;
  name: string;
  address: string;
  availablePlots: number;
};

const mockGardens: Garden[] = [
  { id: 1, name: 'Le Jardin de Belleville', address: 'Rue Piat, 75020 Paris', availablePlots: 3 },
  { id: 2, name: 'Les Petits Potagers', address: 'Rue de Reuilly, 75012 Paris', availablePlots: 5 },
  { id: 3, name: 'La Terre Promise', address: 'Boulevard de Ménilmontant, 75011 Paris', availablePlots: 0 },
];

const App: React.FC = () => {
  const [gardens, setGardens] = useState<Garden[]>([]);

  useEffect(() => {
    // Simule une requête API
    setTimeout(() => {
      setGardens(mockGardens);
    }, 500);
  }, []);

  return (
    <div className="app-container">
      <header>
        <img src="image2.jpg" alt="Logo So Close" className="logo" />
        <h1>So Close</h1>
        <h2>Omri Dakka Axel Gautier</h2>
      </header>

      <section className="intro">
        <p>Lorem Ipsum</p>
      </section>

      <section className="garden-list">
        <h3>Jardins disponibles</h3>
        <div className="gardens">
          {gardens.map((garden) => (
            <div key={garden.id} className="garden-card">
              <h4>{garden.name}</h4>
              <p><strong>Adresse :</strong> {garden.address}</p>
              <p><strong>Parcelles disponibles :</strong> {garden.availablePlots}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default App;