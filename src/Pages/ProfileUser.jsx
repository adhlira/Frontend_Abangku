/* eslint-disable no-unused-vars */
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import AdminNavbar from "../Components/admin/components/AdminNav";
import Sidebar from "../Components/admin/components/Sidebar";
import { Link, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const ProfileUser = () => {
  const [user, setUser] = useState({});
  const token = localStorage.getItem("token");
  const endPoint = "/api/user";

  useEffect(() => {
    axios
      .get(endPoint, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        setUser(response.data);
      });
  }, {});
  console.log(user);

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AdminNavbar />
        {/* <Sidebar /> */}
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

          <h2>
            My Profile
            <br />
          </h2>
          <br />
          <table>
            <tr>
              <td>Username</td>
              <td>:</td>
              <td>{user.username}</td>
            </tr>
            <tr>
              <td>Fullname</td>
              <td>:</td>
              <td>{user.fullname}</td>
            </tr>
            <tr>
              <td>Phone</td>
              <td>:</td>
              <td>{user.phone}</td>
            </tr>
            <tr>
              <td>Address</td>
              <td>:</td>
              <td>{user.address}</td>
            </tr>
            <tr>
              <td>Gender</td>
              <td>:</td>
              <td>{user.gender}</td>
            </tr>
          </table>
          <Link to={"/edit_user"}>
            <button>Edit</button>
          </Link>
          <Outlet />
        </Box>
      </Box>
    </>
  );
};
export default ProfileUser;
