import { Box, List, ListItemButton, ListItemText } from "@mui/material";

const Sidebar = ({ selectedTab, setSelectedTab }) => {
  return (
    <Box
      sx={{
        width: "220px",
        backgroundColor: "#f5f5f5",
        pt: 10,
        height: "100vh",
        borderRight: "1px solid #ddd",
      }}
    >
      <List>
        <ListItemButton selected={selectedTab === "add"} onClick={() => setSelectedTab("add")}>
          <ListItemText primary="Add Product" />
        </ListItemButton>
        <ListItemButton selected={selectedTab === "sell"} onClick={() => setSelectedTab("sell")}>
          <ListItemText primary="Sell Product" />
        </ListItemButton>
        <ListItemButton selected={selectedTab === "fetch"} onClick={() => setSelectedTab("fetch")}>
          <ListItemText primary="Fetch Product" />
        </ListItemButton>
      </List>
    </Box>
  );
};

export default Sidebar;
