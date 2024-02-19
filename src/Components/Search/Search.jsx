import { ShopContext } from "../../Context/ShopContext";
import { useContext } from "react";
import { useSearch } from "../../Context/SearchContext";
import ItemCategory from "../Item/ItemCategory";
import Sidebar from "../Sidebar/Sidebar";
import UrbanBanner from "../Assets/banner_urban.jpg";




export default function Search() {
  const { searchTerm } = useSearch();
  const { all_product } = useContext(ShopContext);

  const data = all_product.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
  return (
    <>
      <div className="banner">
        <img src={UrbanBanner} alt="" />
      </div>
      <div className="main-container">
        <Sidebar />
        <div className="cloth-categoryr">
          <h5 className="showing">
            <span>{data.length} - </span> search results for product
          </h5>
          <div className="cloth-item-cetegory">
            {data.length > 0 ? data.map((item, index) => <ItemCategory key={index} id={item.id} name={item.name} image={item.image} rating={item.rating} new_price={item.new_price} old_price={item.old_price} />) : <h2>Product Not Found</h2>}
          </div>
        </div>
      </div>
    </>
  );
}
