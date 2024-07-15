const jwt = require("jsonwebtoken");


const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.sendStatus(401);
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

const authorizeLevel = (requiredLevel) => {
  return (req, res, next) => {
    if (req.user.level >= requiredLevel) {
      next();
    } else {
      res.sendStatus(403);
    }
  };
};

module.exports = { authenticateToken, authorizeLevel };
