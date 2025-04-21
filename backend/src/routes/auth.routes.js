import { Router } from "express";
import { loginUser } from "../controller/auth.controller.js";

const router = Router();

router.post("/", loginUser);

export default router;
