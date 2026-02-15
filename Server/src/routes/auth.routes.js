const express = require("express");
const router = express.Router();
const {
  getRegister,
  getLogin,
  register,
  login
} = require("../controllers/auth.controller");

/* GET endpoints (for browser testing) */
router.get("/register", getRegister);
router.get("/login", getLogin);

/* POST endpoints (actual functionality) */
router.post("/register", register);
router.post("/login", login);

module.exports = router;
