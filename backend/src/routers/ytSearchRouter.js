const ytSearchRouter = require('express').Router();
const db = require('../db');

// CONNECT TO YOUTUBE API
const { youtube } = require('@googleapis/youtube');
const ytSearchMockData = require('./ytSearchMockData');
const yt = youtube({
  version: 'v3',
  auth: process.env.YT_API_KEY,
});

/* ------------------------------------------------------ */
/*                         ROUTERS                        */
/* ------------------------------------------------------ */
ytSearchRouter.get('/', async (req, res) => {
  const searchQuery = req.query.search_query;

  if (!searchQuery) {
    return res.status(422).json({ error: 'No search query entered.' });
  }

  // DEV MODE mock-up response
  if (process.env.NODE_ENV === 'dev') {
    console.log('📼 Responding with MOCK DATA');
    return res.status(200).json(ytSearchMockData);
  }

  try {
    console.log('🌎 Connecting to Youtube API...');
    const result = await yt.search.list({
      part: 'id,snippet',
      q: searchQuery,
    });

    res.status(200).json(result.data.items);
  } catch (err) {
    res.status(422).json({ ERROR: err });
  }
});

module.exports = ytSearchRouter;
