import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar.jsx";
import AddProductForm from "../../components/AddProductForm.jsx";
import SellProductForm from "../../components/SellProductForm.jsx";
import { Box, Button, Typography } from "@mui/material";
import { getUserFromToken } from "../../utils/getUserFromToken";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const EmployeeHomePage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user-info");
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const [selectedTab, setSelectedTab] = useState("add");
  const [employeeName, setEmployeeName] = useState("");

  useEffect(() => {
    const user = getUserFromToken();
    if (user) setEmployeeName(user.name || "Employee");
  }, []);

  const renderContent = () => {
    if (selectedTab === "add") return <AddProductForm />;
    if (selectedTab === "sell") return <SellProductForm />;
    return <Typography>Fetching Products Soon</Typography>;
  };

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      {/* Welcome bar */}
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          backgroundColor: "#1976d2",
          color: "white",
          padding: "16px",
          zIndex: 1000,
        }}
      >
        <Typography variant="h5" fontWeight="bold">
          Welcome, {employeeName}
        </Typography>

          <Button variant="outlined" color="error" onClick={handleLogout}>
            Logout
          </Button> //---------------------NOte-----------------------------
      </Box>

      {/* Sidebar */}
      <Sidebar selectedTab={selectedTab} setSelectedTab={setSelectedTab} />

      {/* Main content */}
      <Box sx={{ flex: 1, mt: 8, p: 3 }}>{renderContent()}</Box>
    </Box>
  );
};

export default EmployeeHomePage;
