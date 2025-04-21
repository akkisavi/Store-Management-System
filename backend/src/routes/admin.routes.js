import { Router } from "express";
import {
  addEmployee,
  deleteEmployee,
} from "../controller/admin.controller.js";

import { protectRoute, authorizeRole } from "../middleware/auth.js";

const router = Router();

// Protect ALL admin routes

router.use(protectRoute, authorizeRole("admin"));

// Employee routes
router.post("/add-employee", addEmployee);
router.delete("/employee/:id", deleteEmployee);

export default router;
