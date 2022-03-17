const response = require('./response');

module.exports = (fn) => (req, res, next) =>
  fn(req, res, next)
    .then((result) =>
      result.status
        ? res.status(result.status).json(response(result))
        : res.json(result.data)
    )
    .catch(next);
