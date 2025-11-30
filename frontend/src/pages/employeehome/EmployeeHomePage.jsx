import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar.jsx";
import AddProductForm from "../../components/AddProductForm.jsx";
import SellProductForm from "../../components/SellProductForm.jsx";
import { Box, Button, Typography } from "@mui/material";
import { getUserFromToken } from "../../utils/getUserFromToken";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { CiLogout } from "react-icons/ci";
import FetchProductForm from "../../components/FetchProductForm.jsx";

const EmployeeHomePage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user-info");
    toast.success("Logged out successfully");
    navigate("/");
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
    if (selectedTab === "fetch") return <FetchProductForm />;
  };

  return (
    <Box sx={{ display: "flex", height: "100vh", bgcolor: "#f4f5f7" }}>
      {/* Welcome bar */}
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          bgcolor: "white",
          color: "#0052cc",
          padding: "16px",
          zIndex: 1000,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid #e0e0e0",
        }}
      >
        <Typography variant="h5" fontWeight="bold">
          Welcome, {employeeName}
        </Typography>

        <Button variant="contained" color="error" onClick={handleLogout}>
          <CiLogout className="text-xl" /> Logout
        </Button>
      </Box>

      {/* Sidebar */}
      <Sidebar selectedTab={selectedTab} setSelectedTab={setSelectedTab} />

      {/* Main content */}
      <Box
        sx={{
          flex: 1,
          mt: 8,
          p: 3,
          overflowY: "scroll",
          height: "calc(100vh - 56px)",
          "::-webkit-scrollbar": {
            display: "none",
          },
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
        }}
      >
        {renderContent()}
      </Box>
    </Box>
  );
};

export default EmployeeHomePage;
