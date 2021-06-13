const { Pool } = require('pg');

// pg automatically checks .env for the appropriate setup variables
// Alternatively, you can pass in a config object
// or if using Heroku, pass in the DATABASE_URL

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({
  connectionString,
});

// the pool will emit an error on behalf of any idle clients
// it contains if a backend error or network partition happens
pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

module.exports = pool;
