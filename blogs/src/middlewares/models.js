const { getCollection } = require('../db/connection');

module.exports = (req, res, next) => {
  const collection = getCollection();
  req.db = { ...collection };
  next();
};
