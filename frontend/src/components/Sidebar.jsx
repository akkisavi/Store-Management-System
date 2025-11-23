import { Box, List, ListItemButton, ListItemText } from "@mui/material";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import { TbShoppingCartDollar } from "react-icons/tb";
import { TbShoppingCartSearch } from "react-icons/tb";


const Sidebar = ({ selectedTab, setSelectedTab }) => {
  const tabs = [
    { key: "add", label: "Add Product", icon: <MdOutlineShoppingCartCheckout /> },
    { key: "sell", label: "Sell Product", icon: <TbShoppingCartDollar /> },
    { key: "fetch", label: "Fetch Product", icon: <TbShoppingCartSearch /> },
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
