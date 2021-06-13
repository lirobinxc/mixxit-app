const express = require('express');
const cacheControl = require('./middleware/cacheControl');
const setCors = require('./middleware/cors');
const requestLogger = require('./middleware/requestLogger');
const devRouter = require('./routers/devRouter');
const ytSearchRouter = require('./routers/ytSearchRouter');

const app = express();

/* PRE-ROUTES MIDDLEWARE */
app.use(setCors);
app.use(express.json());
app.use(requestLogger);
app.use('/api/search', cacheControl);

/* Route: API root */
app.get('/api', (req, res) => {
  res.send('Welcome to the Mixxit API');
});

/* ROUTES */
app.use('/api/search', ytSearchRouter);
// app.use('/dev', devRouter);

/* AFTER-ROUTES MIDDLEWARE*/

module.exports = app;
