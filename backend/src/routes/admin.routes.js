import { Router } from "express";
import {
  addEmployee,
  checkAdmin,
  deleteEmployee,
} from "../controller/admin.controller.js";

import { protectRoute, authorizeRole } from "../middleware/auth.js";

const router = Router();

// Protect ALL admin routes

router.use(protectRoute, authorizeRole("admin"));
router.get("/check", checkAdmin);   

// Employee routes  
router.post("/add-employee", addEmployee);
router.delete("/employee/:id", deleteEmployee);

export default router;
