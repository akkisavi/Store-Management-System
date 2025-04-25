import { jwtDecode } from "jwt-decode";

export const getUserFromToken = () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return null;

    const decoded = jwtDecode(token);
    return decoded; // contains id, name, role, etc.
  } catch (error) {
    console.error(error, "Invalid token");
    return null;
  }
};
