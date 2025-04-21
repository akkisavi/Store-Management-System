import db from "../DB/db.js";

export const protectRoute = (req, res, next) => {
  try {
    const email = req.body.email;

    const query = 'SELECT * FROM users WHERE email = ? AND role = "admin"';
    
    db.query(query, [email], (err, results) => {
      if (err) {
        console.error("DB error:", err);
        return res.status(500).json({ message: "Internal server error" });
      }

      if (results.length === 0) {
        return res.status(403).json({ message: "Access denied. Admins only." });
      }

      next(); // user is admin and can access the route
    });
  } catch (error) {
    console.log("Middleware error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};


export const authorizeRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  };
};
