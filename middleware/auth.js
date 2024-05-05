const jwt = require('jsonwebtoken');
require('dotenv').config();
const { NODE_ENV, JWT_SECRET } = process.env;

//

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).send({ message: 'no tienes authorizacion' });
  } else {
    const token = authorization.replace('Bearer ', '');

    let payload;
    try {
      if (NODE_ENV !== 'production') {
      }
      payload = jwt.verify(
        token,
        NODE_ENV === 'production'
          ? JWT_SECRET
          : '3199a1ee12430d5ea077aa8585caf1e8'
      );
    } catch (error) {
      return res.status(401).send({ message: 'no tienes authorizacion' });
    }
    req.user = payload;
  }
  next();
};
