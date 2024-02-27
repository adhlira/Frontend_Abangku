import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Scrollbar } from "../../helper/Scrollbar";
import { useAuth } from "../../Context/AuthContext";

export default function Checkout() {
  const [promo, setPromo] = useState("");
  const [discount, setDiscount] = useState(0);
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const { getCart, GetProvinces } = useAuth();
  const [provinces, setProvinces] = useState([]);
  // const [selectProvince, setSelectProvince] = useState("");

  // const handleOrigin = (event) => {
  //   setSelectProvince(event.target.value);
  // };
  

  console.log(provinces);

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
    const fetchProvinces = async () => {
      try {
        const provinces = await GetProvinces();
        setProvinces(provinces);
      } catch (error) {
        console.error("Error fetching provinces:", error);
      }
    };
    fetchProvinces();
  }, [GetProvinces]);

  const getTotalAmount = () => {
    let total = 0;
    data.forEach((item) => {
      total += item.Product.price * item.quantity;
    });
    return (total / 15700).toFixed(1);
  };

  const handlePromo = () => {
    if (promo) {
      setPromo("");
      setDiscount(0);
    } else {
      setPromo("Store Discounts 30%");
      setDiscount(0.3);
    }
  };

  const handleCheckout = () => {
    setShowModal(true);
  };

  return (
    <div className="cartItems">
      <div className="cartItems-format-main">
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Size</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td>
                  <img src={item.Product.ProductImage[0].image_url} alt={item.name} className="carticon-product-icon" />
                </td>
                <td className="product-name">{item.Product.name}</td>
                <td>${(item.Product.price / 15700).toFixed(1)}</td>
                <td>{item.quantity}</td>
                <td>{item.Size.name}</td>
                <td>${(item.total_price / 15700).toFixed(1)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="cartItems-down">
        <div className="cartItems-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cartItems-total-item">
              <p>Subtotal</p>
              <p>${getTotalAmount()}</p>
            </div>
            <hr />
            <div className="cartItems-total-item">
              <p>Discount</p>
              <p>{discount * 100}%</p>
            </div>
            <hr />
            <div className="cartItems-total-item">
              <h3>Total</h3>
              <h3>${(getTotalAmount() - getTotalAmount() * discount).toFixed(2)}</h3>
            </div>
          </div>
          <button
            onClick={() => {
              Scrollbar();
              handleCheckout();
            }}
          >
            Pay for Products
          </button>
        </div>
        {showModal && (
          <div className="modal-box">
            <div className="boxContainer-checkout">
              <h2>Delivery</h2>
              <div className="modalbox-option">
                <h5>Origin</h5>
                <div className="select-option">

                  <select name="Destination" id="destination">
                    <option value="">Select City</option>
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                    <option value="option4">Option 4</option>
                  </select>
                </div>
              </div>

              <div className="modalbox-option">
                <h5>Destination</h5>
                <div className="select-option">

                  <select name="Destination" id="destination">
                    <option value="">Select City</option>
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                    <option value="option4">Option 4</option>
                  </select>
                </div>
              </div>
              <div className="modalbox-option">
                <h5>Courier</h5>
                <select name="Courier" id="courier">
                  <option value="">Select Courier</option>
                  <option value="jne">JNE</option>
                  <option value="tiki">Tiki</option>
                  <option value="pos">POS</option>
                </select>
              </div>

              <div className="btn-checkout">
                <button onClick={() => setShowModal(false)}>Cansel</button>
                <button onClick={() => setShowModal(false)}>OK</button>
              </div>
            </div>
          </div>
        )}

        <div className="cartItems-promo-code">
          <p>If you have a promo code, Enter it here</p>
          <div className="cartItems-promobox">
            <input type="text" placeholder={promo ? promo : "promo code"} />
            <button onClick={() => handlePromo()}>Store Discounts 30%</button>
          </div>
        </div>
      </div>
    </div>
  );
}
