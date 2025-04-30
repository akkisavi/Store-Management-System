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
      "SELECT * FROM users WHERE email = ?",
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

export const allEmployees = async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM users");
    res.status(200).json(rows);
  } catch (error) {
    console.error("❌ Error fetching employees:", error);
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

export const updateEmployee = async (req, res) => {
  const { id } = req.params;
  const { name, role } = req.body;

  if (!name || !role) {
    return res.status(400).json({ message: "Name and role are required" });
  }

  try {
    const result = await db.query(
      "UPDATE employees SET name = ?, role = ? WHERE id = ?",
      [name, role, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json({ message: "Employee updated successfully" });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ message: "Internal server error" });
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


export const getProductDetailsForDate = async (date) => {
  try {
    console.log("Received date:", date);

    if (!date || typeof date !== 'string') {
      throw new Error('Invalid or missing date');
    }

    const validDate = new Date(date);
    if (isNaN(validDate)) {
      throw new Error('Invalid date format');
    }

    const formattedDate = validDate.toISOString().split('T')[0];

    const [rows] = await db.execute(
      `SELECT 
        p.product_name, 
        s.quantity_sold, 
        s.total_price, 
        u.name AS sold_by
       FROM sales s
       JOIN products p ON s.product_id = p.id
       JOIN users u ON s.sold_by = u.id
       WHERE DATE(s.sold_at) = ?`,
      [formattedDate]
    );

    if (rows.length === 0) {
      throw new Error('No sales data found for this date');
    }

    return rows;
  } catch (error) {
    console.error("Error fetching product details:", error.message);
    throw error;
  }
};

  

// Check Admin - Middleware for Admin Routes
export const checkAdmin = async (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  } catch (error) {
    console.error("❌ Error checking admin:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
