import { useContext } from "react";
import { ShopContext } from "../../Context/ShopContext";
import RemoveIcon from "../Assets/cart_cross_icon.png";
import { Link } from "react-router-dom";

export default function CartItems() {
  const { all_product, removeCart, cartItems, toggleCheckbox, selectedItems } = useContext(ShopContext);

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  };
  const handleRemoveFromCart = (itemId, size) => {
    removeCart(itemId, size);
  };

  const handleCheck = (itemId, size) => {
    toggleCheckbox(itemId, size);
  };

  return (
    <div className="cartItems">
      <div className="cartItems-format-main">
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Product</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Size</th>
              <th>Remove</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {all_product.map((product) => {
              const item = cartItems[product.id];
              if (item.quantity > 0) {
                const sizes = item.sizes.join(", ");
                const isChecked = selectedItems[`${product.id}_${sizes}`] ? true : false;
                return (
                  <tr key={product.id}>
                    <td>
                      <input type="checkbox" checked={isChecked} onChange={() => handleCheck(product.id, sizes)} />
                    </td>
                    <td>
                      <img src={product.image} alt={product.name} className="carticon-product-icon" />
                    </td>
                    <td>{product.name}</td>
                    <td>${product.new_price}</td>
                    <td>{item.quantity}</td>
                    <td>{sizes}</td>
                    <td>
                      <img src={RemoveIcon} alt="" onClick={() => handleRemoveFromCart(product.id, item.sizes[0])} className="cartItems-action" />
                    </td>
                    <td>${product.new_price * item.quantity}</td>
                  </tr>
                );
              }
              return null;
            })}
          </tbody>
        </table>
      </div>

      <div className="cartItems-down">
        <div className="cartItems-total">
          <button onClick={handleClick}>
            <Link to="/checkout" className="nav-link-checkout">
              PROCEED TO CHECKOUT
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}
