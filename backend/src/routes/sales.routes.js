import { Router } from "express";
import { addSale, getDailySalesReport } from "../controller/sales.controller.js";
import { protectRoute, authorizeRole } from "../middleware/auth.js";

const router = Router();

// Employee can record a sale
router.post("/sell", protectRoute, authorizeRole("employee"), addSale);

// Admin can view profit logs
router.get("/report", protectRoute, authorizeRole("admin"), getDailySalesReport);

export default router;
