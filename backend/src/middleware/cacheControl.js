// cache max-age in seconds
const secondsInADay = 60 * 60 * 24;
const maxAge = secondsInADay;

/* REQUEST cache-control */
const cacheControl = (req, res, next) => {
  console.log(`➤  Is the cache fresh? ${req.fresh}`);

  res.append(
    'Cache-Control',
    `public, max-age=${secondsInADay * 365}, max-stale=${secondsInADay * 3}`
  );
  next();
};

module.exports = cacheControl;
