const express = require('express');
const router = express.Router();
const db = require('../db');
const calculateDistance = require('../utils/distance');

// POST /addSchool
router.post('/addSchool', async (req, res) => {
  const { name, address, latitude, longitude } = req.body;

  if (!name || !address || isNaN(latitude) || isNaN(longitude)) {
    return res.status(400).json({ error: 'Invalid input' });
  }

  try {
    await db.query(
      'INSERT INTO schools (name, address, latitude, longitude) VALUES ($1, $2, $3, $4)',
      [name, address, latitude, longitude]
    );
    res.status(201).json({ message: 'School added successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

// GET /listSchools?lat=..&lon=..
router.get('/listSchools', async (req, res) => {
  const lat = parseFloat(req.query.lat);
  const lon = parseFloat(req.query.lon);

  if (isNaN(lat) || isNaN(lon)) {
    return res.status(400).json({ error: 'Invalid coordinates' });
  }

  try {
    const result = await db.query('SELECT * FROM schools');
    const sorted = result.rows.map(school => ({
      ...school,
      distance: calculateDistance(lat, lon, school.latitude, school.longitude)
    })).sort((a, b) => a.distance - b.distance);

    res.json(sorted);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

module.exports = router;
