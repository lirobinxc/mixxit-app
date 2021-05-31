require('dotenv').config();

const http = require('http');
const app = require('./app');

http.createServer(app);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  process.env.NODE_ENV === 'dev'
    ? console.log(`🤖 SERVER RUNNING ON http://localhost:${PORT} in DEV MODE`)
    : console.log(`🤖 SERVER RUNNING ON http://localhost:${PORT}`);
});
