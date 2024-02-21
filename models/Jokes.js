const mongoose = require("mongoose");

const JokeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please add a title"],
    maxlength: [15, "Title can not be more than 15 characters"],
  },
  joke: {
    type: String,
    required: [true, "Please add a joke description"],
    minlength: [20, "Joke can not be less then 20 characters"],
  },
  type: {
    type: String,
    enum: ["kid", "teen", "adult"],
    required: [true, "Please select a type of joke"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Jokes", JokeSchema);
