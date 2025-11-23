import { Box, List, ListItemButton, ListItemText } from "@mui/material";

import { IoMdPersonAdd } from "react-icons/io";
import { IoPersonRemoveSharp } from "react-icons/io5";
import { FcSalesPerformance } from "react-icons/fc";
import { CiShoppingCart } from "react-icons/ci";

const Sidebar = ({ selectedTab, setSelectedTab }) => {
  const tabs = [
    { key: "add", label: "Add New Employee", icon: <IoMdPersonAdd /> },
    { key: "remove", label: "Remove Employee", icon: <IoPersonRemoveSharp /> },
    { key: "sales", label: "Daily Sales", icon: <FcSalesPerformance /> },
    { key: "fetch", label: "Fetch Product", icon: <CiShoppingCart size={20}/> },
  ];

  return (
    <Box
      sx={{
        width: 250,
        backgroundColor: "#f4f5f7",
        pt: 8,
        height: "100vh",
        borderRight: "1px solid #e0e0e0",
        mt: 3,
      }}
    >
      <List>
        {tabs.map((tab) => (
          <ListItemButton
            key={tab.key}
            selected={selectedTab === tab.key}
            onClick={() => setSelectedTab(tab.key)}
            sx={{
              mb: 1,
              borderRadius: 2,
              mx: 2,
              gap: 1.5,
              bgcolor: selectedTab === tab.key ? "#e3f2fd" : "transparent",
              "&:hover": {
                bgcolor: "#f0f0f0",
              },
            }}
          >
            {tab.icon && (
              <Box
                component="span"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  color:
                    selectedTab === tab.key ? "primary.main" : "text.secondary",
                }}
              >
                {tab.icon}
              </Box>
            )}
            <ListItemText
              primary={tab.label}
              slotProps={{
                primary: {
                  fontWeight: selectedTab === tab.key ? "bold" : "normal",
                  color:
                    selectedTab === tab.key ? "primary.main" : "text.primary",
                },
              }}
            />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;
