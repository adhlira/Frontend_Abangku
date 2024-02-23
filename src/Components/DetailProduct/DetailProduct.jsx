import { useState, useContext, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";
import Relate from "../Relate/Relate";
import { CreateStars } from "../../helper/Rating";
import { useAuth } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function DetailProduct() {
  const { GetProductbyId, isAuthenticated } = useAuth();
  const [product, setProduct] = useState(null);
  const { addToCart } = useContext(ShopContext);
  const { id } = useParams();
  const productId = parseInt(id);
  const [isZoomed, setIsZoomed] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState(false);
  const [auth ,  setIsAuthenticated] = useState(null)
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if(token !== "null"){
      setIsAuthenticated(token)
    }
  },[isAuthenticated])

  useEffect(() => {
    GetProductbyId(productId)
      .then((product) => {
        setProduct(product);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [GetProductbyId, productId]);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(false);
        setSelectedSize(null);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [message]);
  const handleAddToCart = () => {
    if (auth=== null) {
     navigate("/login")
    }
   else {
      if (selectedSize) {
        addToCart(product.id, selectedSize);
        setMessage(true);
      } else {
        setShowModal(true);
      }
  }
}
const b = isAuthenticated
console.log(b)

  return (
    <>
      {product && (
        <>
          <div className="path-product">
            <h5>
              <Link to="/" className="nav-link-path ">
                Shop
              </Link>
              {" > "}
              <Link to={`/${product.Category.name}`} className="nav-link-path">
                {product.Category.name}
              </Link>
              {" > "}
              {product.name}
            </h5>
          </div>
          <div className={`detail-container ${isZoomed ? "zoomed" : ""}`}>
            <div className={`detail-left ${isZoomed ? "zoomed" : ""}`}>
              <div className="detail-image" onClick={() => setIsZoomed(!isZoomed)}>
                <img src={product.ProductImage[0].image_url} alt={product.name} />
              </div>
            </div>
            <div className="detail-right">
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <div className="rating">
                {product.rating} {CreateStars(product.rating)}
              </div>
              <div className="item-prices">
                <div className="item-price-new">${(product.price / 15700).toFixed(1)}</div>
              </div>
              <h4>Select Size</h4>
              <div className="btn-size">
                {product.ProductSize.map((size, index) => (
                  <button key={index} onClick={() => setSelectedSize(size.Size.name)}>
                    {size.Size.name}
                  </button>
                ))}
              </div>
              <div className="btn-addCart">
                <button onClick={handleAddToCart}>ADD TO CART</button>
              </div>
            </div>
          </div>
          {showModal && (
            <div className="modal-box">
              <div className="boxContainer">
                <h2>Choose your size!</h2>
                <button onClick={() => setShowModal(false)}>OK</button>
              </div>
            </div>
          )}
          {message && (
            <div className="success-box">
              <div className="successContainer">
                <h4>Product Item Successfully added to Cart!</h4>
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0" />
                  <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z" />
                </svg>
              </div>
            </div>
          )}
          <Relate value={product.Category.name} />
        </>
      )}
    </>
  );
}
