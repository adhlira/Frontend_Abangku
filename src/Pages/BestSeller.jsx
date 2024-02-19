import BestBanner from "../Components/Assets/banner_best.jpg";
import { ShopContext } from "../Context/ShopContext";
import { useContext } from "react";
import ItemCategory from "../Components/Item/ItemCategory";
import Sidebar from "../Components/Sidebar/Sidebar";
export default function BestSeller() {
  const { all_product } = useContext(ShopContext);
  const best = all_product.slice(0, 15).sort((a, b) => b.rating - a.rating);
  const totalProduct = best.reduce((acc) => {
    return acc + 1;
  }, 0);
  return (
    <>
      <div className="banner">
        <img src={BestBanner} alt="" />
      </div>
      <div className="main-container">
        <Sidebar />
        <div className="cloth-category">
          <h5 className="showing">
            <span>Showing </span> 1 -{totalProduct} of the products best seller
          </h5>
          <h2>Best Seller Clothing Products</h2>
          <div className="cloth-item-cetegory">
            {best.map((item, index) => {
              return <ItemCategory key={index} id={item.id} name={item.name} image={item.image} rating={item.rating} new_price={item.new_price} old_price={item.old_price} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
}
