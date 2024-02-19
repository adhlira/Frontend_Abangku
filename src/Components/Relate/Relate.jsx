import Item from "../Item/Item";
import { ShopContext } from "../../Context/ShopContext";
import { useContext } from "react";

// eslint-disable-next-line react/prop-types
export default function Relate({ value }) {
  const { all_product } = useContext(ShopContext);
  const category = value;

  return (
    <div className="cloth-container">
      <h2>PRODUCT RELATED</h2>
      <div className="cloth-item">
        {all_product.map((item, index) => {
          if (item.category === category) {
            return <Item key={index} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />;
          }
        })}
      </div>
    </div>
  );
}
