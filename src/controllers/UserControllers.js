const bcrypt = require("bcrypt");
const prisma = require("../prisma/client");
const {
  generatePDFReport
} = require("../utils/ReportGenerator");

const createUser = async (req, res) => {
  const { name, email, password, level } = req.body;

  try {
    const hashedPassword = bcrypt.hashSync(password, 10);

    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword, level },
    });
    res.status(201).json(user);
  } catch (error) {
    console.log(error.message);
    if (
      error.message.includes(
        "Unique constraint failed on the constraint: `User_email_key`"
      )
    ) {
      return res.status(400).json({
        error:
          "Sadly we could not create your user, probably you already has registered this email.",
      });
    } else if (error.message.includes("data and salt arguments required")) {
      res.status(400).json({
        error: "Your password doesn't contemplate all requirements, try again.",
      });
    }
  }
};

const getUsers = async (req, res) => {
  try {
    prisma.user.findMany().then((users) => {
      console.log(users);
    });

    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    if (user) {
      res.json(user);
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    res.status(500).json({ error: "erro" });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, password, level } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  try {
    const user = await prisma.user.update({
      where: { id },
      data: { name, email, password: hashedPassword, level },
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.user.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const generateReport = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    const reportType = req.query.type || "pdf";
    if (reportType === "pdf") {
      const pdf = await generatePDFReport(users);
      res.type("application/pdf").send(pdf);
    } else  {
      res.status(400).send("Invalid report type");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  generateReport,
};
