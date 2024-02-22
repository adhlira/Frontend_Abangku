import { ShopContext } from "../../Context/ShopContext";
import { useContext } from "react";
import { useSearch } from "../../Context/SearchContext";
import ItemCategory from "../Item/ItemCategory";
export default function Search() {
  const { searchTerm } = useSearch();
  const { all_product } = useContext(ShopContext);

  const data = all_product.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
  return (
    <>
      <div className="cloth-category">
        <h5 className="showing">
          <span>Showing </span> 1 -{data.length} of the products
        </h5>
        <h2>Search result Products</h2>
        <div className="cloth-item-cetegory">
          {data.map((item, index) => {
            return <ItemCategory key={index} id={item.id} name={item.name} image={item.image} rating={item.rating} new_price={item.new_price} old_price={item.old_price} />;
          })}
        </div>
      </div>
    </>
  );
}
