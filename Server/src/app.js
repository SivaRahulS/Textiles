const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const authRoutes = require("./routes/auth.routes");
const designRoutes = require("./routes/design.routes");
const errorHandler = require("./middleware/error.middleware");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/designs", designRoutes);

app.use(errorHandler);

module.exports = app;
app.get("/", (req, res) => {
  res.json({ message: "Custom Clothing API is running 🚀" });
});

