const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const prisma = require("../prisma/client");

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (user && bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign(
      { userId: user.id, level: user.level },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({ token });
  } else {
    res.status(401).send("Invalid credentials");
  }
};

module.exports = { login };
