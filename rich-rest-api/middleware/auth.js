/** @format */

const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
  const token = req.header('auth-token');
  if (!token) return res.status(400).send('Access denied, no token provided');
  try {
    const decoded = jwt.verify(token, config.get('jwtKey'));
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).send('Invalid token');
  }
};
