const setCors = (req, res, next) => {
  res.append('Access-Control-Allow-Origin', ['*']);
  res.append('Access-Control-Allow-Methods', 'GET,POST,PUT,OPTIONS,DELETE');
  res.append('Access-Control-Allow-Headers', 'Content-Type');
  next();
};

module.exports = setCors;
