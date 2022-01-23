const authService = require('../services/authService');
const { unauthorized } = require('../utils/dictionary/statusCode');
const errorConstructor = require('../utils/functions/errorConstructor');

module.exports = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    // if (!authorization) return res.status(401).json({ message: 'missing auth token' });

    if (!authorization) throw errorConstructor(unauthorized, 'missing auth token');

    const data = authService.verifyToken(authorization);

    // if (!data) return res.status(401).json({ message: 'jwt malformed' });

    if (!data) throw errorConstructor(unauthorized, 'jwt malformed');
 
    req.user = data;

    next();
  } catch (error) {
    console.log(error.message);
    // return res.status(401).json({ message: 'Falha na autenticação' });
    next(error);
  }
};