const jwt = require('jsonwebtoken');

const JWT_SECRET = '3199a1ee12430d5ea077aa8585caf1e8';

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).send({ message: 'no tienes authorizacion' });
  } else {
    const token = authorization.replace('Bearer ', '');
    let payload;
    try {
      payload = jwt.verify(token, JWT_SECRET);
    } catch (error) {
      return res.status(401).send({ message: 'no tienes authorizacion' });
    }
    req.user = payload;
  }
  next();
};
