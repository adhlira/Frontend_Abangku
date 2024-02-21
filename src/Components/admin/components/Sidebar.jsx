import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { Link } from "react-router-dom";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

const drawerWidth = 240;

export default function Sidebar() {
  const sidemenu = ["Dashboard", "Insights", "New Product", "New Coupon"];
  const sidemenu2 = ["Products", "Categories", "Collection", "Attributes"];
  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
      
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <Typography variant="h6">Quick Link</Typography>
          <Divider />
          <List>
            {sidemenu.map((text, index) => (
              <ListItem key={text} disablePadding>
                <Link
                  to={`/admin/${text}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <ListItemButton>
                    <ListItemIcon>
                      {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </Link>
              </ListItem>
            ))}
          </List>
          <Typography variant="h6">Catalog</Typography>
          <Divider />
          <List>
            {sidemenu2.map((text, index) => (
              <ListItem key={text} disablePadding>
                <Link
                  to={`/admin/${text}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <ListItemButton>
                    <ListItemIcon>
                      {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </Link>
              </ListItem>
            ))}
          </List>
          <List>
            <Typography variant="h6">Sales</Typography>
            <Divider />
            <ListItem disablePadding>
              <Link
                to="/admin/order"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <ListItemButton>
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary="Sales" />
                </ListItemButton>
              </Link>
            </ListItem>
          </List>
          <List>
            <Typography variant="h6">Customers</Typography>
            <Divider />
            <ListItem disablePadding>
              <Link
                to="/admin/customers"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <ListItemButton>
                  <ListItemIcon>
                    <MailIcon />
                  </ListItemIcon>
                  <ListItemText primary="Customers" />
                </ListItemButton>
              </Link>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </Box>
  );
}
