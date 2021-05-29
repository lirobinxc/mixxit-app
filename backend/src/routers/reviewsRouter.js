const reviewsRouter = require('express').Router();
const db = require('../db');

reviewsRouter.get('/', async (req, res) => {
  const result = await db.query('SELECT * FROM reviews ORDER BY restaurant_id');
  res.status(200).json(result.rows);
});

reviewsRouter.post('/', async (req, res) => {
  const { restaurant_id, name, review, rating } = req.body;

  // Error checking
  if (!restaurant_id || !name || !review || !rating) {
    return res
      .status(422)
      .json({ error: 'Missing restaurant_id, name, review, or rating.' });
  }
});

module.exports = reviewsRouter;
