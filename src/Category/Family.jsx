import { useEffect, useState } from "react";
import ItemCategory from "../Components/Item/ItemCategory";
import { useAuth } from "../Context/AuthContext";
export default function Family() {
  const { Product } = useAuth();
  const [data, setData] = useState([]);
  const totalProduct = data.reduce((acc, product) => {
    if (product.Category.name === "Family") {
      return acc + 1;
    } else {
      return acc;
    }
  }, 0);

  useEffect(() => {
    Product()
      .then((products) => {
        setData(products);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [Product]);

  return (
    <>
      <div className="cloth-category">
        <h2>Family Clothing Products</h2>
        <h5 className="showing">
          <span>Showing </span> 1 -{totalProduct} of the products family
        </h5>
        <div className="cloth-item-cetegory">
          {data.map((item, index) => {
            if (item.Category.name === "Family") {
              return <ItemCategory key={index} id={item.id} name={item.name} image={item.ProductImage[0].image_url} rating={item.rating} new_price={item.price} description={item.description} />;
            }
          })}
        </div>
      </div>
    </>
  );
}
