import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name."],
    maxLength: [50, "Your name cannot exceed 50 characters."]
  },
  email: {
    type: String,
    required: [true, "Please enter your email address."],
    unique: true
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minLength: [6, "Your password must be 6 or more characters"],
    // Don't want to send password in the response, use the option below
    select: false
  },
  role: {
    type: String,
    default: "user"
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
},
  { timestamps: true }
);

// Encrypt password before saving the user
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
      next();
  }

  this.password = await bcrypt.hash(this.password, 10)
});

// Return JWT Token
userSchema.methods.getJwtToken = function() {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_TIME
  })
};

// Comapare user password
userSchema.methods.comparePassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
};

export default mongoose.model("User", userSchema);