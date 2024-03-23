import express from "express";
import { 
  getProducts, 
  getProductDetails,
  newProduct, 
  updateProduct,
  deleteProduct
} from "../controllers/productControllers.js";
import { isAuthenticated, authorizeRoles } from "../middleware/auth.js";
const router = express.Router();

// Public routes
router.route("/products").get(getProducts);
router.route("/products/:id").get(getProductDetails);

// Admin routes
router.route("/admin/products").post(isAuthenticated, authorizeRoles("admin"), newProduct);
router.route("/admin/products/:id")
  .put(isAuthenticated, authorizeRoles("admin"), updateProduct)
  .delete(isAuthenticated, authorizeRoles("admin"), deleteProduct)
;

export default router;