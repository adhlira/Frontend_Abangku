import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Scrollbar } from "../../helper/Scrollbar";
import { useAuth } from "../../Context/AuthContext";

export default function CartItems() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalProduct, setModalProduct] = useState(null);
  const [data, setData] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [quantity, setQuantity] = useState("");
  const { getCart, GetProductbyId } = useAuth();

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };
  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    } else {
      setQuantity(1);
    }
  };

  console.log(quantity);

  console.log(sizes);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const cartData = await getCart();
        setData(cartData);
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };
    fetchData();
  }, [getCart]);

  useEffect(() => {
    const fetchProductById = async () => {
      if (modalProduct) {
        try {
          const product = await GetProductbyId(modalProduct.product_id);
          setSizes(product.ProductSize);
        } catch (error) {
          console.error("Error fetching product by ID:", error);
        }
      }
    };

    fetchProductById();
  }, [modalProduct, GetProductbyId]);

  const openModal = (product) => {
    setModalProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (modalProduct && modalProduct.quantity) {
      setQuantity(modalProduct.quantity);
    }
  }, [modalProduct]);

  return (
    <div className="cartItems">
      <div className="cartItems-format-main">
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th className="product-name">Product Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Size</th>
              <th>Edit</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>
                  <img src={item.Product.ProductImage[0].image_url} alt={item.name} className="carticon-product-icon" />
                </td>
                <td className="product-name">{item.Product.name}</td>
                <td>${(item.Product.price / 15700).toFixed(1)}</td>
                <td>{item.quantity}</td>
                <td>{item.Size.name}</td>
                <td>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="edit-modal" viewBox="0 0 16 16" onClick={() => openModal(item)}>
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                    <path d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                  </svg>
                </td>
                <td>${(item.total_price / 15700).toFixed(1)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && modalProduct && (
        <div className="modal-edit-item">
          <div className="modal-content">
            <img src={modalProduct.Product.ProductImage[0].image_url} alt={modalProduct.Product.name} className="modal-product-image" />
            <p>{modalProduct.Product.name}</p>
            <div className="btn-size">
              {sizes &&
                sizes.map((size, index) => (
                  <button key={index} value={size}>
                    {size.Size.name}
                  </button>
                ))}
            </div>
            <div className="modal-button-container">
              <button
                onClick={() => {
                  handleDecrease();
                }}
                className="btn-action-cart"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8" />
                </svg>
              </button>
              <p>Quantity:</p>
              <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} className="input-action" />
              <button
                onClick={() => {
                  handleIncrease();
                }}
                className="btn-action-cart"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2" />
                </svg>
              </button>
            </div>
            <div className="btn-group-modal">
              <button onClick={closeModal} className="btn-action">
                Close
              </button>
              <button onClick={closeModal} className="btn-action">
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="cartItems-down">
        <div className="cartItems-total">
          {data.length > 0 ? (
            <button onClick={Scrollbar}>
              <Link to="/checkout" className="nav-link-checkout">
                PROCEED TO CHECKOUT
              </Link>
            </button>
          ) : (
            <button disabled className="btn-disabled">
              <span>PROCEED TO CHECKOUT</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
