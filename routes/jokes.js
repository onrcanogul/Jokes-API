const express = require("express");
const { protect, authorize } = require("../middleware/auth");
const { checkOwnership } = require("../middleware/checkOwnership");
const {
  getJokes,
  createJoke,
  getJoke,
  updateJoke,
  deleteJoke,
} = require("../controllers/jokes");
const Joke = require("../models/Jokes");
router = express.Router();

module.exports = router;

router.get("/", getJokes);
router.post("/", protect, createJoke);
router.get("/:id", getJoke);
router.put("/:id", protect, checkOwnership(Joke), updateJoke);
router.delete("/:id", protect, checkOwnership(Joke), deleteJoke);
