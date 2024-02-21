import { ShopContext } from "../Context/ShopContext";
import { useContext } from "react";
import ItemCategory from "../Components/Item/ItemCategory";
export default function Kids() {
  const { all_product } = useContext(ShopContext);
  const totalProduct = all_product.reduce((acc, product) => {
    if (product.category === "kid") {
      return acc + 1;
    } else {
      return acc;
    }
  }, 0);
  return (
    <>
      <div className="main-container">
        <div className="cloth-category">
          <h5 className="showing">
            <span>Showing </span> 1 -{totalProduct} of the products kids
          </h5>
          <h2>Kid&apos;s Clothing Products</h2>
          <div className="cloth-item-cetegory">
            {all_product.map((item, index) => {
              if (item.category === "kid") {
                return <ItemCategory key={index} id={item.id} name={item.name} image={item.image} rating={item.rating} new_price={item.new_price} old_price={item.old_price} />;
              }
            })}
          </div>
        </div>
      </div>
    </>
  );
}
