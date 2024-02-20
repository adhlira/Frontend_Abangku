import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import AdminNavbar from "./components/AdminNav";
import Sidebar from "./components/Sidebar";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AdminNavbar />
      <Sidebar />
      <Box
        component="main"
        sx={{ left: 300, width: "calc(100% - 300px)",  bgcolor: "background.default", p: 3 }}
      >
        <Toolbar />

        <Outlet />

      </Box>
    </Box>
  );
}
