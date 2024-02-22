import Sidebar from "../Components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import Footer from "../Components/Footer/Footer";
import FamillyBanner from "../Components/Assets/banner_familly.jpg";
import Navbar from "../Components/Navbar/Navbar";
import SelectOption from "../Components/SelectOption/SelectOption";
import Arrowup from "../Components/ArrowUp/ArrowUp";

export default function ProductMenu() {
  return (
    <>
      <Navbar />
      <div className="banner">
        <img src={FamillyBanner} alt="" />
      </div>
      <div className="main-container">
        <Sidebar />
        <SelectOption />
        <Outlet />
      </div>
      <Arrowup />
      <Footer />
    </>
  );
}
