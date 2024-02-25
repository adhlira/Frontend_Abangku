import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import AdminNavbar from "../Components/admin/components/AdminNav";
import Sidebar from "../Components/admin/components/Sidebar";
import { Outlet } from "react-router-dom";

const ProfileUser = () => {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AdminNavbar />
        <Sidebar />
        <Box
          component="main"
          sx={{
            left: 300,
            width: "calc(100% - 240px)",
            bgcolor: "#F6F6F7",
            p: 3,
            height: "auto",
          }}
        >
          <Toolbar />

          <h2>ini user</h2>
          <Outlet />
        </Box>
      </Box>
    </>
  );
};
export default ProfileUser;
