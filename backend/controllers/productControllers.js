import Product from "../models/product.js";
import { delete_file } from "../utils/cloudinary.js";
import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";

// Get all products
export const getProducts = catchAsyncErrors(async (req, res) => {
  const products = await Product.find();

  res.status(200).json({
    products
  })
});

// Get single product => /api/v1/products/:id
export const getProductDetails = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req?.params?.id);

  if(!product) {
    return next(new ErrorHandler("Product not found.", 404))
  }

  res.status(200).json({
    product
  })
});

// Create product ADMIN route => /api/v1/admin/products
export const newProduct = catchAsyncErrors(async (req, res) => {
  const product = await Product.create(req.body);

  res.status(200).json({
    product
  })
});

// Update product ADMIN route => /api/v1/admin/products/:id
export const updateProduct = catchAsyncErrors(async (req, res) => {
  let product = await Product.findById(req?.params?.id);

  if(!product) {
    return res.status(404).json({
      message: "Product not found"
    })
  }

  product = await Product.findByIdAndUpdate(req?.params?.id, req.body, {
    new: true
  });

  res.status(200).json({
    product
  })
});

// Delete product ADMIN route => /api/v1/products/:id
export const deleteProduct = catchAsyncErrors(async (req, res) => {
  const product = await Product.findById(req?.params?.id);

  if(!product) {
    return res.status(404).json({
      message: "Product not found"
    })
  }

  // Delete images associated with product
  for (let i = 0; i < product?.images?.length; i++) {
    await delete_file(product?.images[i].public_id);
  }

  await product.deleteOne();

  res.status(200).json({
      message: "Product deleted."
  });
});