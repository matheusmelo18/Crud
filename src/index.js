require("dotenv").config();
const express = require("express");
const app = express();
const authRoutes = require("../src/routes/AuthRoutes");
const userRoutes = require("../src/routes/UserRoutes");


app.use(express.json());
app.use("/auth", authRoutes);
app.use("/users", userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
