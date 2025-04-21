import db from "../DB/db.js";
import bcrypt from "bcrypt";

export const addEmployee = async (req, res) => {
    try {
      const { name, email, password, role } = req.body;
  
      if (!name || !email || !password || !role) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
      // Check if email already exists
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
export const deleteEmployee = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Delete from users table
      await db.execute(`DELETE FROM users WHERE id = ?`, [id]);
  
      res.status(200).json({ message: "✅ Employee deleted successfully" });
    } catch (error) {
      console.error("❌ Error deleting employee:", error);
      res.status(500).json({ message: "Something went wrong" });
    }
};