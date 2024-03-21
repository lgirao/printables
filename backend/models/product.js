import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter a product name."],
    maxLength: [200, "Product name cannot exceed 200 characters."]
  },
  price: {
    type: Number,
    required: [true, "Please enter a product price."]
  },
  description: {
    type: String,
    required: [true, "Please enter a product description."]
  },
  images: [
    {
      public_id: {
        type: String,
        required: true
      },
      url: {
        type: String,
        required: true
      }
    }
  ]
},
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);