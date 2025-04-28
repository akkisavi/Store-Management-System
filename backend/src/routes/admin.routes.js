import { Router } from "express";
import {
  addEmployee,
  checkAdmin,
  deleteEmployee,
  getDailySalesReport,
} from "../controller/admin.controller.js";
import { protectRoute, authorizeRole } from "../middleware/auth.js";

const router = Router();

router.get("/check", checkAdmin);   


router.use(protectRoute);
router.use(authorizeRole("admin"));

// Employee routes (only accessible by admin)
router.post("/add-employee", addEmployee);
router.delete("/employee/:id", deleteEmployee);

router.get("/daily-sales", getDailySalesReport);

export default router;
