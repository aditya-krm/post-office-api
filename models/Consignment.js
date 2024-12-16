import mongoose from "mongoose";

const consignmentSchema = new mongoose.Schema(
  {
    consignmentNumber: {
      type: String,
      required: [true, "Please provide consignment number"],
      unique: true,
      trim: true,
    },
    whomeToDeliver: {
      type: String,
      required: [true, "Please provide whome to deliver"],
    },
    status: {
      type: String,
      required: true,
      enum: ["not-delivered", "try-to-deliver", "delivered"],
      default: "not-delivered",
    },
    statusMessage: {
      type: String,
      required: [true, "Please provide status message"],
    },
  },
  { timestamps: true }
);

export const Consignment = mongoose.model("Consignment", consignmentSchema);
