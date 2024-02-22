import { createBrowserRouter } from "react-router-dom";
import Product from "./Pages/MainAbangku";
import Men from "./Category/Men";
import Women from "./Category/Women";
import Kids from "./Category/Kids";
import Relate from "./Components/Relate/Relate";
import Cart from "./Pages/Cart";
import LoginSingUp from "./Pages/LoginSingUp";
import DetailProduct from "./Components/DetailProduct/DetailProduct";
import App from "./App";
import Search from "./Components/Search/Search";
import Checkout from "./Components/CheckOut/Checkout";
import VirtualAcount from "./Components/VirtualAcount/VirtualAcount";
import PageNotFound from "./Components/404/PageNotFound";
import About from "./Pages/About";
import Allproduct from "./Pages/Allproduct";
import NewCollection from "./Pages/NewCollection";
import BestSeller from "./Pages/BestSeller";
import Register from "./Pages/Register";
import Family from "./Category/Family";
import AdminLayout from "./Components/admin/AdminLayout";
import Dashboard from "./Components/admin/pages/Dashboard";
import NewProduct from "./Components/admin/pages/NewProduct";
import Insights from "./Components/admin/pages/Insights";
import AllUsers from "./Components/admin/pages/AllUsers";
import AllCategories from "./Components/admin/pages/AllCategories";
import Collection from "./Components/admin/pages/Collection";
import AllOrder from "./Components/admin/pages/AllOrders";
import AllProducts from "./Components/admin/pages/AllProducts";
import EditProduct from "./Components/admin/pages/EditProduct";
import ProductMenu from "./Pages/ProductMenu";
const Router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      { path: "/", Component: Product },
      { path: "", Component: DetailProduct, children: [{ path: "/detail/:id", Component: Relate }] },
      { path: "/about", Component: About },
      { path: "", Component: DetailProduct, children: [{ path: "/men/detail/:id", Component: Relate }] },
      { path: "", Component: DetailProduct, children: [{ path: "/women/detail/:id", Component: Relate }] },
      { path: "", Component: DetailProduct, children: [{ path: "/kid/detail/:id", Component: Relate }] },
      { path: "", Component: DetailProduct, children: [{ path: "/search/detail/:id", Component: Relate }] },
      { path: "", Component: DetailProduct, children: [{ path: "/allproduct/detail/:id", Component: Relate }] },
      { path: "", Component: DetailProduct, children: [{ path: "/newcollection/detail/:id", Component: Relate }] },
      { path: "", Component: DetailProduct, children: [{ path: "/bestseller/detail/:id", Component: Relate }] },
      { path: "", Component: DetailProduct, children: [{ path: "/family/detail/:id", Component: Relate }] },
      { path: "/login", Component: LoginSingUp },
      { path: "/register", Component: Register },
      {
        path: "",
        children: [
          { path: "/cart", Component: Cart },
          {
            path: "",
            children: [
              { path: "/checkout", Component: Checkout },
              { path: "/virtualAccount", Component: VirtualAcount },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "",
    children: [
      { path: "*", Component: PageNotFound },
      { path: "/", Component: Product },
    ],
  },
  {
    path: "",
    Component: ProductMenu,
    children: [
      { path: "allproduct", Component: Allproduct, children: [{ path: "allproduct/detail/:id", Component: Relate }] },
      { path: "detail/:id", Component: DetailProduct, children: [{ path: "detail/:id", Component: Relate }] },
      { path: "men", Component: Men, children: [{ path: "men/detail/:id", Component: Relate }] },
      { path: "women", Component: Women, children: [{ path: "women/detail/:id", Component: Relate }] },
      { path: "kid", Component: Kids, children: [{ path: "kid/detail/:id", Component: Relate }] },
      { path: "search", Component: Search, children: [{ path: "search/detail/:id", Component: Relate }] },
      { path: "newcollection", Component: NewCollection, children: [{ path: "newcollection/detail/:id", Component: Relate }] },
      { path: "bestseller", Component: BestSeller, children: [{ path: "bestseller/detail/:id", Component: Relate }] },
      { path: "family", Component: Family, children: [{ path: "family/detail/:id", Component: Relate }] },
    ],
  },
  {
    path: "/admin",
    Component: AdminLayout,
    children: [
      { path: "dashboard", Component: Dashboard },
      { path: "Insights", Component: Insights },
      { path: "products", Component: AllProducts },
      { path: "products/edit/:id", Component: EditProduct },
      { path: "new product", Component: NewProduct },
      { path: "new coupon", Component: NewProduct },
      { path: "customers", Component: AllUsers },
      { path: "categories", Component: AllCategories },
      { path: "attributes", Component: AllCategories },
      { path: "collection", Component: Collection },
      { path: "order", Component: AllOrder },
    ],
  },
]);

export default Router;
