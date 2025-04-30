import { Box, List, ListItemButton, ListItemText, Typography } from "@mui/material";

const Sidebar = ({ selectedTab, setSelectedTab }) => {
  const tabs = [
    { key: "add", label: "Add New Employee" },
    { key: "remove", label: "Remove Employee" },
    { key: "sales", label: "Daily Sales" },
    { key: "fetch", label: "Fetch Product" },
  ];

  return (
    <Box
      sx={{
        width: 250,
        backgroundColor: "#ffffff",
        pt: 8,
        height: "100vh",
        borderRight: "1px solid #e0e0e0",
        boxShadow: "2px 0 8px rgba(0,0,0,0.05)",
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
              bgcolor: selectedTab === tab.key ? "#e3f2fd" : "transparent",
              "&:hover": {
                bgcolor: "#f0f0f0",
              },
            }}
          >
            <ListItemText
              primary={tab.label}
              primaryTypographyProps={{
                fontWeight: selectedTab === tab.key ? "bold" : "normal",
                color: selectedTab === tab.key ? "primary" : "textPrimary",
              }}
            />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;
