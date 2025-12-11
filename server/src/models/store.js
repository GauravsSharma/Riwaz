import mongoose from "mongoose";

const storeSchema = new mongoose.Schema(
  {
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to User model
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    description: {
      type: String,
      default: "",
    },
    address: {
      type: String,
      trim: true,
      maxlength: 255,
    },
  },
  {
    timestamps: true, // Automatically creates createdAt & updatedAt
    collection: "stores",
  }
);

export default mongoose.model("Store", storeSchema);
