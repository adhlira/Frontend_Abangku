import { Link } from "react-router-dom";
import { Scrollbar } from "../../helper/Scrollbar";

export default function Sidebar() {
  return (
    <>
      <div className="category">
        <div className="box-category">
          <h3>Category</h3>
          <ul>
            <li onClick={Scrollbar}>
              <Link to="bestseller" className="nav-link">
                <button>Best Seller</button>
              </Link>
            </li>
            <li onClick={Scrollbar}>
              <Link to="newcollection" className="nav-link">
                <button>New Collections</button>
              </Link>
            </li>
          </ul>
          <ul>
            <li onClick={Scrollbar}>
              <Link to="allproduct" className="nav-link">
                <button>All Product</button>
              </Link>
            </li>
            <li onClick={Scrollbar}>
              <Link to="men" className="nav-link">
                <button>Men</button>
              </Link>
            </li>
            <li onClick={Scrollbar}>
              <Link to="women" className="nav-link">
                <button>Women</button>
              </Link>
            </li>
            <li onClick={Scrollbar}>
              <Link to="kid" className="nav-link">
                <button>Kid</button>
              </Link>
            </li>
            <li onClick={Scrollbar}>
              <Link to="family" className="nav-link">
                <button>Family</button>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
