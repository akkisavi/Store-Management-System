import { jwtDecode } from "jwt-decode";

export const getUserFromToken = () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return null;

    const decoded = jwtDecode(token);
    if (decoded?.exp && Date.now() >= decoded.exp * 1000) {
      return null;
    }
    return decoded;
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};
