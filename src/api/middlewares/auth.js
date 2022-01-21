const authService = require('../services/authService');

module.exports = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) return res.status(401).json({ message: 'missing auth token' });

    const data = authService.verifyToken(authorization);

    if (!data) return res.status(401).json({ message: 'jwt malformed' });
 
    req.user = data;

    next();
  } catch (error) {
    console.log(error.message);
    return res.status(401).json({ message: 'Falha na autenticação' });
  }
};