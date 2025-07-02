const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const dataPath = path.join(__dirname, '../../../data/gardens.json');

// Get all gardens
router.get('/', (req, res) => {
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  res.json(data);
});

// Get gardens by district
router.get('/district/:district', (req, res) => {
  const { district } = req.params;
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  const filtered = data.filter(g => g.district === district);
  res.json(filtered);
});

// Add a garden
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

module.exports = router;