const { Pool } = require('pg');

// pg automatically checks .env for the appropriate setup variables
// Alternatively, you can pass in a config object

const pool = new Pool();

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  },
};
