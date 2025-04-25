import express from "express";
import dotenv from "dotenv";
import salesRoutes from "./routes/sales.routes.js";
import cors from "cors";

// import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import productRoutes from "./routes/product.routes.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/products", productRoutes);
app.use("/api/sales", salesRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
