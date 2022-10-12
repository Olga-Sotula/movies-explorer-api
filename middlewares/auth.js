const { NODE_ENV, JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');
const { ErrorBadAuth } = require('../errors/ErrorBadAuth');

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new ErrorBadAuth('Ошибка аутентификации');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'PRODUCTION' ? JWT_SECRET : 'SECRET');
  } catch (e) {
    next(new ErrorBadAuth('Ошибка аутентификации'));
  }
  req.user = payload;
  next();
};

module.exports = { auth };
