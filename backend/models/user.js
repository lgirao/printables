import mongoose from "mongoose";
import bcrypt from "bcryptjs";

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

export default mongoose.model("User", userSchema);