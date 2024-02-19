import { createContext, useState } from "react";
import all_product from "../Components/Assets/all_product";
import PropTypes from "prop-types";
export const ShopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  for (let index = 0; index < all_product.length; index++) {
    const product = all_product[index];
    cart[product.id] = {
      quantity: 0,
      sizes: [],
    };
  }
  return cart;
};
const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState(getDefaultCart());
  const [selectedItems, setSelectedItems] = useState([]);
  console.log(selectedItems);
  const addToCart = (itemId, size) => {
    setCartItems((prev) => {
      const updatedCart = { ...prev };
      updatedCart[itemId].quantity += 1;
      if (!updatedCart[itemId].sizes.includes(size)) {
        updatedCart[itemId].sizes.push(size);
      }
      return updatedCart;
    });
  };

  const removeCart = (itemId, size) => {
    let updatedCart; 
    setCartItems((prev) => {
      updatedCart = { ...prev }; 
      if (updatedCart[itemId]) {
        updatedCart[itemId] = {
          ...updatedCart[itemId],
          quantity: updatedCart[itemId].quantity - 1,
        };
        const indexToRemove = updatedCart[itemId].sizes.indexOf(size);
        if (indexToRemove !== -1) {
          updatedCart[itemId].sizes.splice(indexToRemove, 1);
        }
      }
      return updatedCart;
    });

    setSelectedItems((prev) => {
      const updatedSelectedItems = { ...prev };
      const keyList = Object.keys(prev);
      const index = keyList.findIndex((key) => {
        const currentItem = prev[key];
        return currentItem.itemId === itemId && currentItem.size === size;
      });
      if (index !== -1) {
        delete updatedSelectedItems[keyList[index]];
      }
      return updatedSelectedItems;
    });
  };

  const toggleCheckbox = (itemId, size) => {
    setSelectedItems((prev) => {
      const keyList = Object.keys(prev);
      const index = keyList.findIndex((key) => prev[key].itemId === itemId && prev[key].size === size);
      if (index !== -1) {
        const updatedSelectedItems = { ...prev };
        delete updatedSelectedItems[keyList[index]];
        return updatedSelectedItems;
      } else {
        const item = cartItems[itemId]; 
        return { ...prev, [`${itemId}_${size}`]: { itemId, size, quantity: item.quantity } };
      }
    });
  };

  const getTotalAmount = () => {
    let totalAmount = 0;
    for (const itemId in selectedItems) {
      const item = selectedItems[itemId];
      const product = all_product.find((p) => p.id === item.itemId);
      const quantity = item.quantity;
      if (quantity > 0) {
        totalAmount += product.new_price * quantity;
      }
    }
    return totalAmount;
  };

  const contextValue = {
    all_product,
    cartItems,
    addToCart,
    removeCart,
    toggleCheckbox,
    getTotalAmount,
    selectedItems,
  };


  return <ShopContext.Provider value={contextValue}>{props.children}</ShopContext.Provider>;
};

ShopContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export default ShopContextProvider;
