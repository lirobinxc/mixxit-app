const devRouter = require('express').Router();

devRouter.get('/node', (req, res) => {
  res.status(200).json({
    node_env: process.env.NODE_ENV,
  });
});

module.exports = devRouter;
