import { Typography, Box, Button } from "@mui/material";
import Sidebar from "../../admin-components/Sidebar";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import AddEmployee from "../../admin-components/AddEmployee";
import DeleteEmployee from "../../admin-components/DeleteEmployee";
import FetchProductForm from "../../components/FetchProductForm";
import DailySales from "../../admin-components/DailySales";
import { useState } from "react";
import { CiLogout } from "react-icons/ci";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [selectedTab, setSelectedTab] = useState("add");

  const handleLogout = () => {
    localStorage.removeItem("user-info");
    toast.success("Logged out successfully");
    navigate("/");
  };

  const renderContent = () => {
    if (selectedTab === "add") return <AddEmployee />;
    if (selectedTab === "remove") return <DeleteEmployee />;
    if (selectedTab === "sales") return <DailySales />;
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
          Welcome, Admin😎
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

export default AdminDashboard;
