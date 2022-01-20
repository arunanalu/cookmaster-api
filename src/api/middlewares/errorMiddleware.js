const { serverError } = require('../utils/dictionary/statusCode');

const error = (err, _req, res, _next) => {
  if (err.status) {
    const { status, code, message } = err;

    return res.status(status).json({ err: { code, message } });
  }
  return res.status(serverError).json({ message: 'Internal Error' });
};

module.exports = error;