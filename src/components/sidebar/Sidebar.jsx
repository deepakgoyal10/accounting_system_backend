import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  IconButton,
  Divider,
  Box,
  Typography,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ReceiptIcon from "@mui/icons-material/Receipt";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
const drawerWidth = 240;

const Sidebar = () => {
  const { logout } = useAuth();
  const menuItems = [
    { text: "Home", icon: <HomeIcon />, path: "/" },
    { text: "Product", icon: <Inventory2Icon />, path: "/product" },
    { text: "Purchase", icon: <ShoppingCartIcon />, path: "/purchase" },
    { text: "Sale", icon: <ReceiptIcon />, path: "/sale" },
    // { text: "Transaction", icon: <LocalLibraryIcon />, path: "/transaction" },

    { text: "Logout", icon: <LogoutIcon />, path: "/logout" },
  ];
  const navigate = useNavigate();

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar>
          <Typography
            sx={{ fontWeight: "600", fontSize: "1.5rem", color: "gray" }}
            component={"h1"}
          >
            ACC BUDDY.
          </Typography>
        </Toolbar>
        <Divider />
        <List>
          {menuItems.map((item, index) => (
            <ListItem
              button
              key={item.text}
              onClick={() =>
                item.text == "Logout" ? logout() : navigate(item.path)
              }
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
};

export default Sidebar;
