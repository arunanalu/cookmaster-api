const { serverError } = require('../utils/dictionary/statusCode');

const error = (err, _req, res, _next) => {
  if (err.status) {
    const { status, message } = err;

    return res.status(status).json({ message });
  }
  console.log(err);
  return res.status(serverError).json({ message: 'Internal Error' });
};

module.exports = error;