import { NavLink } from "react-router-dom";
import { Scrollbar } from "../../helper/Scrollbar";

export default function Sidebar() {
  return (
    <>
      <div className="category">
        <div className="box-category">
          <h3>Category</h3>
          <ul>
            <li onClick={Scrollbar}>
              <NavLink to="bestseller" className="nav-link">
                <h4>Best Seller</h4>
              </NavLink>
            </li>
            <li onClick={Scrollbar}>
              <NavLink to="newcollection" className="nav-link">
                <h4>New Collections</h4>
              </NavLink>
            </li>
          </ul>
          <ul>
            <li onClick={Scrollbar}>
              <NavLink to="allproduct" className="nav-link">
                <h4>All Product</h4>
              </NavLink>
            </li>
            <li onClick={Scrollbar}>
              <NavLink to="men" className="nav-link">
                <h4>Men</h4>
              </NavLink>
            </li>
            <li onClick={Scrollbar}>
              <NavLink to="women" className="nav-link">
                <h4>Women</h4>
              </NavLink>
            </li>
            <li onClick={Scrollbar}>
              <NavLink to="kid" className="nav-link">
                <h4>Kid</h4>
              </NavLink>
            </li>
            <li onClick={Scrollbar}>
              <NavLink to="family" className="nav-link">
                <h4>Family</h4>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
