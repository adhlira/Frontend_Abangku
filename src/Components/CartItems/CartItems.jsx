import { useState, useContext } from "react";
import { ShopContext } from "../../Context/ShopContext";
import { Link } from "react-router-dom";
import { Scrollbar } from "../../helper/Scrollbar";

export default function CartItems() {
  const { all_product, cartItems, toggleCheckbox, selectedItems, handleEditProduct, handleSizeChange } = useContext(ShopContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalProduct, setModalProduct] = useState(null);

  const openModal = (product) => {
    setModalProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleCheck = (itemId, size) => {
    toggleCheckbox(itemId, size);
  };

  const handleEdit = (itemId, size, action) => {
    handleEditProduct(itemId, size, action);
  };

  const handleSize = (itemId, newSize) => {
    handleSizeChange(itemId, newSize);
  };


  const anyItemChecked = Object.values(selectedItems).some((isChecked) => isChecked);

  return (
    <div className="cartItems">
      <div className="cartItems-format-main">
        <table>
          <thead>
            <tr>
              <th></th>
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
            {all_product.map((product) => {
              const item = cartItems[product.id];
              if (item.quantity > 0) {
                const sizes = item.sizes.join(", ");
                const isChecked = selectedItems[`${product.id}_${sizes}`] || false;
                return (
                  <tr key={product.id}>
                    <td>
                      <input className="checkbox" type="checkbox" checked={isChecked} onChange={() => handleCheck(product.id, sizes)} />
                    </td>
                    <td>
                      <img src={product.image} alt={product.name} className="carticon-product-icon" />
                    </td>
                    <td className="product-name">{product.name}</td>
                    <td>${product.new_price}</td>
                    <td>{item.quantity}</td>
                    <td>{sizes}</td>
                    <td>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="edit-modal" viewBox="0 0 16 16" onClick={() => openModal(product)}>
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

      {isModalOpen && modalProduct && (
        <div className="modal-edit-item">
          <div className="modal-content">
            <img src={modalProduct.image} alt={modalProduct.name} className="modal-product-image" />
            <p>{modalProduct.name}</p>
            <div className="modal-button-container">
              <button onClick={() => handleEdit(modalProduct.id, cartItems[modalProduct.id]?.size, "increase")} className="btn-action-cart">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2" />
                </svg>
              </button>
              <p>Quantity: {cartItems[modalProduct.id]?.quantity}</p>
              <button onClick={() => handleEdit(modalProduct.id, cartItems[modalProduct.id]?.size, "decrease")} className="btn-action-cart">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8" />
                </svg>
              </button>
            </div>
            <select value={cartItems[modalProduct.id]?.size} onChange={(e) => handleSize(modalProduct.id, e.target.value)}>
              {cartItems[modalProduct.id]?.sizes.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
            <button onClick={closeModal} className="btn-close-action">Close</button>
          </div>
        </div>
      )}

      <div className="cartItems-down">
        <div className="cartItems-total">
          {anyItemChecked ? (
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
