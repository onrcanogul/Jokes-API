const ErrorResponse = require("../utils/errorResponse.js");
const asyncHandler = require("../middleware/async");
const Jokes = require("../models/Jokes");

// Get all jokes.
// GET /jokes
// Public
exports.getJokes = asyncHandler(async (req, res, next) => {
  const jokes = await Jokes.find(req.query);

  res.status(200).json({ success: true, data: jokes });
});

// Create a joke.
// POST /jokes
// Private
exports.createJoke = asyncHandler(async (req, res, next) => {
  req.body.user = req.user.id;
  const result = await Jokes.create(req.body);
  res.status(200).json({ success: true, result });
});

// Get a jokes.
// GET /jokes/:id
// Public
exports.getJoke = asyncHandler(async (req, res, next) => {
  const joke = await Jokes.findById(req.params.id);

  res.status(200).json({ success: true, data: joke });
});

// Update a jokes.
// PUT /jokes/:id
// Private
exports.updateJoke = asyncHandler(async (req, res, next) => {
  const newJoke = await Jokes.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ success: true, data: newJoke });
});

// Delete a jokes.
// DELETE /jokes/:id
// Private
exports.deleteJoke = asyncHandler(async (req, res, next) => {
  const deletedJoke = await Jokes.findByIdAndDelete(req.params.id);
  res.status(200).json({ success: true, data: {} });
});
