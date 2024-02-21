const jwt = require("jsonwebtoken");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("./async");
const User = require("../models/User");

exports.protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  //else if(req.cookies.token){
  //     token = req.cookies.token;
  //   }

  //Make sure that token exists.
  if (!token) {
    next(new ErrorResponse("Not authorize to acces this route"), 401);
  }

  try {
    //Verify Token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("decoded : ", decoded);
    req.user = await User.findById(decoded.id);
    next();
  } catch (err) {
    next(new ErrorResponse("Not authorize to acces this route"), 401);
  }
});

exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      next(
        new ErrorResponse(
          `User role ${req.user.role} is not authorized to acces this route`,
          401
        )
      );
    }
    next();
  };
};
