const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = (roles) => async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.id);

    if (!user || !roles.includes(user.role)) {
      return res.status(403).json({ error: 'No tienes permiso' });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Autenticación fallida' });
  }
};

module.exports = authMiddleware;
