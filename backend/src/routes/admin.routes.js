import { Router } from "express";
import {
  addEmployee,
  allEmployees,
  checkAdmin,
  deleteEmployee,
  getDailySalesReport,
  getProductDetailsForDate,
  updateEmployee,
} from "../controller/admin.controller.js";
import { protectRoute, authorizeRole } from "../middleware/auth.js";

const router = Router();

router.get("/check", checkAdmin);

router.use(protectRoute);
router.use(authorizeRole("admin"));

// Employee routes (only accessible by admin)
router.post("/add-employee", addEmployee);
router.delete("/employee/:id", deleteEmployee);
router.get("/allEmployees", allEmployees);
router.put("/update-employee/:id", updateEmployee);

router.get("/daily-sales", getDailySalesReport);
router.get("/daily-sales/:date/details", async (req, res) => {
  try {
    const { date } = req.params;
    const data = await getProductDetailsForDate(date);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
