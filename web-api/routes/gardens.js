const express = require('express');
const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');
const { checkJwt } = require('../middleware/auth');

const router = express.Router();



const pool = new Pool({
  connectionString: 'postgres://user:password@localhost:5433/soclose'
});
router.get('/', checkJwt, async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM gardens');
  res.json(rows);
});
router.get('/district/:district', checkJwt, async (req, res) => {
  const { district } = req.params;
  const { rows } = await pool.query('SELECT * FROM gardens WHERE district = $1', [district]);
  res.json(rows);
});

router.post('/', checkJwt, async (req, res) => {
  const { name, district } = req.body;
  const { rows } = await pool.query(
    'INSERT INTO gardens (name, district) VALUES ($1, $2) RETURNING *',
    [name, district]
  );
  res.status(201).json(rows[0]);
});

router.patch('/:id', checkJwt, async (req, res) => {
  const { id } = req.params;
  const { name, district } = req.body;

  const existing = await pool.query('SELECT * FROM gardens WHERE id = $1', [id]);
  if (existing.rowCount === 0) {
    return res.status(404).json({ error: 'Garden not found' });
  }

  const updated = await pool.query(
    'UPDATE gardens SET name = COALESCE($1, name), district = COALESCE($2, district) WHERE id = $3 RETURNING *',
    [name, district, id]
  );

  res.json(updated.rows[0]);
});

router.delete('/:id', checkJwt, async (req, res) => {
  const { id } = req.params;
  const result = await pool.query('DELETE FROM gardens WHERE id = $1', [id]);

  if (result.rowCount === 0) {
    return res.status(404).json({ error: 'Garden not found' });
  }

  res.status(204).send();
});

module.exports = router;