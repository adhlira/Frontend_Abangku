import { useContext } from "react";
import { ShopContext } from "../../Context/ShopContext";
import { Link } from "react-router-dom";
import { Scrollbar } from "../../helper/Scrollbar";

export default function CartItems() {
  const { all_product, /* removeCart, */ cartItems, toggleCheckbox, selectedItems } = useContext(ShopContext);/* 
  const handleRemoveFromCart = (itemId, size) => {
    removeCart(itemId, size);
  }; */

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
              <th>Edit</th>
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
                      <input className="checkbox" type="checkbox" checked={isChecked} onChange={() => handleCheck(product.id, sizes)} />
                    </td>
                    <td>
                      <img src={product.image} alt={product.name} className="carticon-product-icon" />
                    </td>
                    <td>{product.name}</td>
                    <td>${product.new_price}</td>
                    <td>{item.quantity}</td>
                    <td>{sizes}</td>
                    <td>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"className="edit" viewBox="0 0 16 16">
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                        <path d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                      </svg>
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
          <button onClick={Scrollbar}>
            <Link to="/checkout" className="nav-link-checkout">
              PROCEED TO CHECKOUT
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}
