import { useState, useContext, useEffect } from "react";
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
  const [showModal, setShowModal] = useState(false); // State untuk menampilkan modal
  const [message, setMessage] = useState(false);

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  const handleAddToCart = () => {
    if (selectedSize) {
      addToCart(data.id, selectedSize);
      setMessage(true);
    } else {
      setShowModal(true);
    }
  };

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(false);
        setSelectedSize(null); // Menutup pesan setelah 2 detik
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [message]);

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
              <button key={index} onClick={() => handleSizeSelect(size)}>
                {size}
              </button>
            ))}
          </div>
          <div className="btn-addCart">
            <button onClick={() => handleAddToCart()}>ADD TO CART</button>
          </div>
        </div>
      </div>
      {/* Modal box */}
      {showModal && (
        <div className="modal-box">
          <div className="boxContainer">
            <h2>Choose your size!</h2>
            <button onClick={() => setShowModal(false)}>OK</button>
          </div>
        </div>
      )}
      {/* Tampilkan pesan hanya setelah item berhasil ditambahkan */}
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
      <Relate value={data.category} />
    </>
  );
}
