import { useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";
import Relate from "../Relate/Relate";
import { CreateStars } from "../Rating/Rating";
export default function DetailProduct() {
  const { all_product, addToCart } = useContext(ShopContext);
  const { id } = useParams();
  const productId = parseInt(id);
  const data = all_product.find((product) => product.id === productId);
  const [isZoomed, setIsZoomed] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  const handleAddToCart = () => {
    if (selectedSize) {
      addToCart(data.id, selectedSize);
    } else {
      alert("Please select a size before adding to cart");
    }
  };

  return (
    <>
      <div className="path-product">
        <h5>
          <Link to="/" className="nav-link">
            Shop
          </Link>
          {" > "}
          <Link to={`/${data.category}`} className="nav-link">
            {data.category}
          </Link>
          {" > "}
          {data.name}
        </h5>
      </div>
      <div className={`detail-container ${isZoomed ? "zoomed" : ""}`}>
        <div className={`detail-left ${isZoomed ? "zoomed" : ""}`}>
          <div className="detail-image" onClick={() => setIsZoomed(!isZoomed)}>
            <img src={data.image} alt="" />
          </div>
        </div>
        <div className="detail-right">
          <h2>{data.name}</h2>
          <div className="rating">
            {data.rating} {CreateStars(data.rating)}
          </div>
          <p>{data.description}</p>
          <div className="item-prices">
            <div className="item-price-old">${data.old_price}</div>
            <div className="item-price-new">${data.new_price}</div>
          </div>
          <h5>Select Size</h5>
          <div className="btn-size">
            {data.sizes.map((size, index) => (
              <button key={index} onClick={() => handleSizeSelect(size)}>{size}</button>
            ))}
          </div>
          <div className="btn-addCart">
            <button onClick={() => handleAddToCart()}>ADD TO CART</button>
          </div>
        </div>
      </div>

      <Relate value={data.category} />
    </>
  );
}
