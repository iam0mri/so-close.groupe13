import React, { useState, useEffect } from 'react';
import { Auth0Provider } from "@auth0/auth0-react";
import './App.css';

import { useAuth0 } from "@auth0/auth0-react";

const { loginWithRedirect, logout, user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();


type Garden = {
  id: number;
  name: string;
  district: string;
};
const App: React.FC = () => {
  var [gardens, setGardens] = useState<Garden[]>([]);
  const [districts, setDistricts] = useState<string[]>([]);
  const [selectedDistrict, setSelectedDistrict] = useState<string>('Tous');

  const fetchGardens = async (district: string) => {
    const token = localStorage.getItem("access_token");
    try {
      const url =
        district && district !== 'Tous'
          ? `http://localhost:4000/api/gardens?district=${district}`
          : 'http://localhost:4000/api/gardens';
      const response = await fetch(url, {headers: {Authorization: 'Bearer ${token}'}});
      const data = await response.json();
      gardens = data;
      setGardens(data);

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
    if (isAuthenticated) {
      const token = getAccessTokenSilently();
      localStorage.setItem("access_token", token);
      fetchGardens('Tous');
    }
  }, [isAuthenticated]);

  const handleDistrictChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = event.target.value;
    setSelectedDistrict(selected);
    fetchGardens(selected);
  };

  if (isLoading) return <div>Chargement...</div>;

  return (
    <div className="app-container">
      <header>
        <img src="image2.png" alt="Logo So Close" className="logo" />
        <h1>So Close</h1>
        <h2>par Axel Gautier et Omri Dakka</h2>

        {!isAuthenticated ? (
          <button onClick={() => loginWithRedirect()}>Se connecter</button>
        ) : (
          <>
            <p>Bienvenue, {user?.name}</p>
            <button onClick={() => logout({ returnTo: window.location.origin })}>Se déconnecter</button>
          </>
        )}
      </header>

      {isAuthenticated && (
        <>
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
        </>
      )}
    </div>
  );
};

export default App;