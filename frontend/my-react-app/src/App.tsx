import React, { useState, useEffect } from 'react';
import './App.css';

type Garden = {
  id: number;
  name: string;
  district: string;
};

const App: React.FC = () => {
  const [gardens, setGardens] = useState<Garden[]>([]);
  const [districts, setDistricts] = useState<string[]>([]);
  const [selectedDistrict, setSelectedDistrict] = useState<string>('Tous');

  const fetchGardens = async (district: string) => {
    try {
      const url =
        district && district !== 'Tous'
          ? `http://localhost:4000/api/gardens?district=${district}`
          : 'http://localhost:4000/api/gardens';
      const response = await fetch(url);
      const data = await response.json();
      setGardens(data);

      // Créer une liste unique de quartiers
      if (district === 'Tous') {
        const uniqueDistricts = Array.from(
          new Set<string>(data.map((g: Garden) => g.district))
        );
        setDistricts(uniqueDistricts.sort());
      }
    } catch (error) {
      console.error('Erreur de chargement :', error);
    }
  };

  useEffect(() => {
    fetchGardens('Tous');
  }, []);

  const handleDistrictChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = event.target.value;
    setSelectedDistrict(selected);
    fetchGardens(selected);
  };

  return (
    <div className="app-container">
      <header>
        <img src="image2.png" alt="Logo So Close" className="logo" />
        <h1>So Close</h1>
        <h2>par Axel Gautier et Omri Dakka</h2>
      </header>

      <section className="filter">
        <label htmlFor="district-select">Filtrer par quartier :</label>
        <select id="district-select" value={selectedDistrict} onChange={handleDistrictChange}>
          <option value="Tous">Tous</option>
          {districts.map((district) => (
            <option key={district} value={district}>
              {district}
            </option>
          ))}
        </select>
      </section>

      <section className="garden-list">
        {gardens.length === 0 ? (
          <p>Aucun jardin trouvé dans ce quartier.</p>
        ) : (
          gardens.map((garden) => (
            <div key={garden.id} className="garden-card">
              <h3>{garden.name}</h3>
              <p><strong>Quartier :</strong> {garden.district}</p>
            </div>
          ))
        )}
      </section>
    </div>
  );
};

export default App;