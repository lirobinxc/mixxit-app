const ratingsRouter = require('express').Router();
const db = require('../db');

ratingsRouter.get('/', async (req, res) => {
  const ratings = await db.query(
    'SELECT reviews.restaurant_id AS restaurant_id, COUNT(rating) as total_ratings, AVG(rating)::numeric(10,2) as average_rating FROM reviews GROUP BY restaurant_id;'
  );
  res.status(200).json(ratings.rows);
});

module.exports = ratingsRouter;
