import { Router } from "express";
import expressAsyncHandler from "express-async-handler";
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

router.use(protectRoute);
router.get("/check", authorizeRole("admin"), expressAsyncHandler(checkAdmin));

router.use(authorizeRole("admin"));

router.post("/employees", expressAsyncHandler(addEmployee));

router.get("/employees", expressAsyncHandler(allEmployees));

router.put("/employees/:id", expressAsyncHandler(updateEmployee));

router.delete("/employees/:id", expressAsyncHandler(deleteEmployee));

router.get("/daily-sales", expressAsyncHandler(getDailySalesReport));

router.get(
  "/daily-sales/:date/details",
  expressAsyncHandler(async (req, res) => {
    const { date } = req.params;
    const data = await getProductDetailsForDate(date);
    res.json(data);
  })
);

export default router;
