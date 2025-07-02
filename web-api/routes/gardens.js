const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const dataPath = path.join(__dirname, '../../../data/gardens.json');

router.get('/', (req, res) => {
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  res.json(data);
});

router.get('/district/:district', (req, res) => {
  const { district } = req.params;
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  const filtered = data.filter(g => g.district === district);
  res.json(filtered);
});

router.post('/', (req, res) => {
  const { name, district } = req.body;
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  const newGarden = {
    id: Date.now(),
    name,
    district
  };
  data.push(newGarden);
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
  res.status(201).json(newGarden);
});

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const { name, district } = req.body;
  const data = readData();
  const index = data.findIndex(g => g.id === parseInt(id));

  if (index === -1) {
    return res.status(404).json({ error: 'Garden not found' });
  }

  if (name !== undefined) data[index].name = name;
  if (district !== undefined) data[index].district = district;

  writeData(data);
  res.json(data[index]);
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  let data = readData();
  const initialLength = data.length;
  data = data.filter(g => g.id !== parseInt(id));

  if (data.length === initialLength) {
    return res.status(404).json({ error: 'Garden not found' });
  }

  writeData(data);
  res.status(204).send();
});

module.exports = router;