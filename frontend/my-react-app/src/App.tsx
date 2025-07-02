import React, { useEffect, useState } from 'react';
import axios from 'axios';

type Garden = {
  id: number;
  name: string;
  district: string;
};

const App = () => {
  const [gardens, setGardens] = useState<Garden[]>([]);
  const [selectedDistrict, setSelectedDistrict] = useState<string>('');

  const fetchGardens = async (district?: string) => {
    try {
      const response = district
        ? await axios.get(`http://localhost:4000/api/gardens/district/${district}`)
        : await axios.get('http://localhost:4000/api/gardens');
      setGardens(response.data);
    } catch (error) {
      console.error('Error fetching gardens:', error);
    }
  };

  useEffect(() => {
    fetchGardens(); // initial load
  }, []);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const district = e.target.value;
    setSelectedDistrict(district);
    fetchGardens(district);
  };

  return (
    <div>
      <h1>Jardins par Quartier</h1>
      <select onChange={handleFilterChange} value={selectedDistrict}>
        <option value="">Tous les quartiers</option>
        {districts.map((district) => (
            <option key={district} value={district}>
              {district}
            </option>
          ))}
      </select>

      <ul>
        {gardens.map((garden) => (
          <li key={garden.id}>
            {garden.name} - {garden.district}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;