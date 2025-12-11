import mongoose from "mongoose";

const AddressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  address1: { type: String, required: true },
  address2: { type: String, default: "" },
  landmark: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  pincode: { type: String, required: true },
  country: { type: String, default: "India" },
});

const Address = mongoose.model('Address', AddressSchema);

export default Address;
