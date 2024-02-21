const asyncHandler = require("./async");
const ErrorResponse = require("../utils/errorResponse");

exports.checkOwnership = (model) =>
  asyncHandler(async (req, res, next) => {
    const data = await model.findById(req.params.id);
    if (!data) {
      return next(
        new ErrorResponse(`Resource not found with id : ${req.params.id}`, 404)
      );
    }
    if (data.user.toString() !== req.user.id) {
      next(
        new ErrorResponse(
          "You dont have permission to modify to modify that resource"
        ),
        401
      );
    }

    next();
  });
