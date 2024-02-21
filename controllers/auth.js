const asyncHandler = require("../middleware/async");
const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");

// @desc   Register user
// @route  POST /api/auth/register
// @access PUBLIC

exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body;
  //Create a user
  const user = await User.create({
    name,
    email,
    password,
    role,
  });
  const token = user.getSignedJwtToken();
  res.status(200).json({ succes: true, token });
});

exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  //Validate email and password :
  if (!email || !password) {
    next(new ErrorResponse("Enter email and password"), 400);
  }

  //Check for user :
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    next(new ErrorResponse("User couldnt"), 401);
  }

  //Check if password matches :
  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    next(new ErrorResponse("Invalid login"), 400);
  }
  const token = user.getSignedJwtToken();
  const options = {
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };
  res
    .status(200)
    .cookie("token", token, options)
    .json({ success: true, token });
});
