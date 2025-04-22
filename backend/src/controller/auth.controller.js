import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../DB/db.js";

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Validate email and password presence
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    // Query the database for the user with the given email
    const [users] = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    // If no user is found, return error
    if (users.length === 0) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const user = users[0]; // Get the first (and only) user from the result array

    // Check if the password matches the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "9h" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    });
    console.log("user login successfully");
  } catch (error) {
    // Handle any errors that may occur during the process
    console.error("❌ Error logging in:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// // Register new user (admin only)
// export const registerUser = async (req, res) => {
//   const { name, email, password, role } = req.body;

//   // Check if the logged-in user is admin
//   if (req.user.role !== 'admin') {
//     return res.status(403).json({ message: 'Only admins can create new users' });
//   }

//   try {
//     // Check if user already exists
//     const existingUser = await db.query('SELECT * FROM users WHERE email = ?', [email]);
//     if (existingUser.length > 0) {
//       return res.status(400).json({ message: 'User already exists' });
//     }

//     // Hashing the user password for better security
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     // Insert new user into the database
//     await db.query('INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)', [name, email, hashedPassword, role]);

//     res.status(201).json({ message: 'User created successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// };
