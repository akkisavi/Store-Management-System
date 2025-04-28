import db from "../DB/db.js";
import bcrypt from "bcrypt";

// Add Employee
export const addEmployee = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password || !role) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const [existingUser] = await db.execute(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );

        if (existingUser.length > 0) {
            return res.status(409).json({ message: "Email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await db.execute(
            `INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)`,
            [name, email, hashedPassword, role]
        );

        res.status(201).json({ message: "✅ Employee added successfully" });
    } catch (error) {
        console.error("❌ Error adding employee:", error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

// Delete Employee
export const deleteEmployee = async (req, res) => {
    try {
        const { id } = req.params;

        await db.execute(`DELETE FROM users WHERE id = ?`, [id]);

        res.status(200).json({ message: "✅ Employee deleted successfully" });
    } catch (error) {
        console.error("❌ Error deleting employee:", error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

// Get Daily Sales Report (Admin Only)
export const getDailySalesReport = async (req, res) => {
    try {
        const [rows] = await db.execute(`
            SELECT 
                DATE(sold_at) as date,
                SUM(total_price) as total_profit,
                COUNT(*) as total_sales
            FROM sales
            GROUP BY DATE(sold_at)
            ORDER BY DATE(sold_at) DESC
        `);

        res.status(200).json(rows);
    } catch (error) {
        console.error("❌ Error fetching daily sales report:", error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

// Check Admin - Middleware for Admin Routes
export const checkAdmin = async (req, res, next) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: "Forbidden" });
        }
        next();
    } catch (error) {
        console.error("❌ Error checking admin:", error);
        res.status(500).json({ message: "Something went wrong" });
    }
};
