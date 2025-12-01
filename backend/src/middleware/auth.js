import jwt from "jsonwebtoken";

export const protectRoute = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || "";

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized: No token" });
    }
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      id: decoded.id,
      role: decoded.role,
      name: decoded.name,
    };
    return next();
  } catch (error) {
    console.error("protectRoute error:", error);
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

export const authorizeRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized: No user" });
    }
    const userRole = req.user.role;
    if (!userRole || !roles.includes(userRole)) {
      return res.status(403).json({ message: "Access denied" });
    }
    return next();
  };
};
