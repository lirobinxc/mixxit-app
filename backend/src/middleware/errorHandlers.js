const unknownEndpoint = (req, res, next) => {
  res.status(404).send({ error: '404 - Nothing here my dude :(' });
};

const errorHandler = (err, req, res, next) => {
  logger.error('----❌ERROR❌----');
  logger.error(err.message);

  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    return res.status(400).send({ error: 'malformatted id' });
  } else if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message });
  } else if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({ error: 'Invalid token, access denied' });
  }

  next();
};

const errorHandlerFinal = (err, req, res, next) => {
  res.status(400).send({ finalError: `${err.name} - ${err.message}` });
};

module.exports = {
  unknownEndpoint,
  errorHandler,
  errorHandlerFinal,
};
