const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware");

const {
  getTest,
  createDesign,
  getDesigns,
  deleteDesign
} = require("../controllers/design.controller");

/* Browser test route */
router.get("/test", getTest);
//router.get("/", authMiddleware, getDesigns);


/* Actual API routes */
router.post("/", authMiddleware, createDesign);
router.get("/", getDesigns);
router.delete("/:id", authMiddleware, deleteDesign);


module.exports = router;
