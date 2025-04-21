import { Router } from "express";
import {
  addProduct,
  deleteProductbyName,
  getAllProducts,
  getProductByName,
} from "../controller/admin.controller.js";
import { authorizeRole, protectRoute } from "../middleware/auth.js";

const router = Router();

router.get("/name/:name", getProductByName);

router.get("/all", getAllProducts);

router.post("/sell", sellProduct);

router.post(
  "/add",
  protectRoute,
  authorizeRole("admin", "manager", "employee"),
  addProduct
);
router.delete(
  "name/:name",
  protectRoute,
  authorizeRole("admin", "manager"),
  deleteProductbyName
);

export default router;
