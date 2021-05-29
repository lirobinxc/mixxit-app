const restaurantsRouter = require('express').Router();
const db = require('../db');

restaurantsRouter.get('/', async (req, res) => {
  // Query the database
  try {
    const restos = await db.query('SELECT * FROM restaurants ORDER BY id');
    // console.log('📣', results);
    res.status(201).json(restos.rows);
  } catch (err) {
    res.status(400).json({ ERROR: err });
  }
});

restaurantsRouter.get('/:id', async (req, res) => {
  const ID = req.params.id;

  // Query the database
  try {
    const text = 'SELECT * FROM restaurants WHERE id = $1';
    const values = [ID];
    const results = await db.query(text, values);
    res.status(201).json(results.rows);
  } catch (err) {
    res.status(400).json({ ERROR: err });
  }
});

restaurantsRouter.post('/', async (req, res) => {
  const body = req.body;

  // Error checking: Improper body
  if (!body.name || !body.location || !body.price_range) {
    return res.status(400).json({
      error: 'POST requests must include name, location, & price_range',
    });
  }

  // Query the database
  try {
    const text =
      'INSERT INTO restaurants (name, location, price_range) VALUES ($1, $2, $3) RETURNING *';
    const values = [body.name, body.location, body.price_range];
    const results = await db.query(text, values);
    res.status(201).json(results.rows);
  } catch (err) {
    res.status(400).json({ ERROR: err });
  }
});

restaurantsRouter.put('/:id', async (req, res) => {
  const ID = req.params.id;
  const body = req.body;

  // if (!body)
  try {
    // Fetch the original data first
    const originalData = await db.query(
      'SELECT * FROM restaurants WHERE id = $1',
      [ID]
    );
    // Merge PUT body with original data
    const newData = { ...originalData.rows[0], ...body };
    const { name, location, price_range } = newData;

    // Query the database
    const text =
      'UPDATE restaurants SET name = $1, location = $2, price_range = $3 WHERE id = $4 RETURNING *';
    const values = [name, location, price_range, ID];
    const result = await db.query(text, values);
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(400).json({ ERROR: err });
  }
});

restaurantsRouter.delete('/:id', async (req, res) => {
  const ID = req.params.id;

  // Query the database
  try {
    const text = 'DELETE FROM restaurants WHERE id = $1 RETURNING *';
    const values = [ID];
    const results = await db.query(text, values);
    res.status(200).json(results.rows);
  } catch (err) {
    res.status(400).json({ ERROR: err });
  }
});

module.exports = restaurantsRouter;
