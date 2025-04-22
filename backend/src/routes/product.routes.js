import { Router } from "express";
import { authorizeRole, protectRoute } from "../middleware/auth.js";

import { getProductByName, getAllProducts, addProduct, deleteProductbyName } from "../controller/product.controller.js";

const router = Router();

router.get("/name/:name", getProductByName);

router.get("/all", getAllProducts);

router.post(
  "/add",
  protectRoute,
  authorizeRole("admin", "manager", "employee"),
  addProduct
);
router.delete(
  "/name/:name",
  protectRoute,
  authorizeRole("admin", "manager"),
  deleteProductbyName
);

export default router;
