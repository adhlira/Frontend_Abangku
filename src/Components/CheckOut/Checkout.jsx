import { useContext, useState } from "react";
import { ShopContext } from "../../Context/ShopContext";
import { Link } from "react-router-dom";
import {Scrollbar} from "../../helper/Scrollbar";

export default function Checkout() {
  const { selectedItems, all_product, getTotalAmount } = useContext(ShopContext);
  const [promo, setPromo] = useState("");
  const [discount, setDiscount] = useState(0);

  const handlePromo = () => {
    if (promo) {
      setPromo("");
      setDiscount(0);
    } else {
      setPromo("Store Discounts 30%");
      setDiscount(0.3);
    }
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
            {all_product.map((product) => {
              return Object.keys(selectedItems).map((key) => {
                const item = selectedItems[key];
                if (item.itemId === product.id) {
                  return (
                    <tr key={product.id}>
                      <td>
                        <img src={product.image} alt={product.name} className="carticon-product-icon" />
                      </td>
                      <td>{product.name}</td>
                      <td>${product.new_price}</td>
                      <td>{item.quantity}</td>
                      <td>{item.size}</td>
                      <td>${product.new_price * item.quantity}</td>
                    </tr>
                  );
                }
                return null;
              });
            })}
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
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cartItems-total-item">
              <h3>Total</h3>
              <h3>${(getTotalAmount() - getTotalAmount() * discount).toFixed(2)}</h3>
            </div>
          </div>
          <button onClick={Scrollbar}>
            <Link to="/virtualAccount" className="nav-link-checkout ">
              Pay for Products
            </Link>
          </button>
        </div>
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
