import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    // Unique ID (MongoDB will automatically generate an ObjectId)
    email: {
      type: String,
      unique: true,
      trim: true,
      maxlength: 100,
      validate: {
        validator: (value) =>
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value), // basic email regex
        message: "Invalid email format",
      },
    },
    fullName: {
      type: String,
      trim: true,
      maxlength: 100,
    },
    address: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
      default: []
    }],
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      maxlength: 20,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    userType: {
      type: String,
      enum: ["customer", "seller", "admin"],
      default: "customer",
      required: true,
    },
    otp: {
      type: String,
      maxlength: 10,
    },
    otpExpires: {
      type: Date,
    },
  },
  {
    timestamps: true, // Automatically creates createdAt & updatedAt
    collection: "users",
  }
);

export default mongoose.model("User", userSchema);
