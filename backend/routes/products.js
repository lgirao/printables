import express from "express";
import { 
  getProducts, 
  getProductDetails,
  newProduct, 
  updateProduct,
  deleteProduct
} from "../controllers/productControllers.js";
const router = express.Router();

// Public routes
router.route("/products").get(getProducts);
router.route("/products/:id").get(getProductDetails);

// Admin routes
router.route("/admin/products").post(newProduct);
router.route("/admin/products/:id")
  .put(updateProduct)
  .delete(deleteProduct)
;

export default router;