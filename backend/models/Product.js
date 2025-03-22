import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    url: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      required: true,
    },
    currentPrice: {
      type: Number,
      required: true,
    },
    priceHistory: [
      {
        price: {
          type: Number,
          required: true,
        },
        date: {
          type: Date,
          default: Date.now,
        },
        source: {
          type: String,
          default: "Amazon",
        },
        currency: {
          type: String,
          default: "INR",
        },
      },
    ],
    lastChecked: {
      type: Date,
      default: Date.now,
    },
    reviews: {
      type: String,
      required: false,
    },
    reviewCount: {
      type: String,
      required: false,
    },
    description: {
      type: String, 
      required: false,
    },
    categories: [
      {
        type: String,
        required: false,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Product", ProductSchema);
