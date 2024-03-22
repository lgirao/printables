import User from "../models/user.js";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";

export const registerUser = catchAsyncErrors(async(req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name, email, password
  });

  res.status(201).json({
    success: true
  })
});
