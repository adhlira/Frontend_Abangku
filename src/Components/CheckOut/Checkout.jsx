import { useState, useEffect } from "react";
import { Scrollbar } from "../../helper/Scrollbar";
import { useAuth } from "../../Context/AuthContext";
import { Link } from "react-router-dom";
import formatRupiah from "../../helper/Rupiah";
export default function Checkout() {
  const [promo, setPromo] = useState("");
  const [discount, setDiscount] = useState(0);
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const { getCart, GetProvinces, GetOrigin, GetDestination, CheckOutItem/* , Pay */ } = useAuth();
  const [provinces, setProvinces] = useState([]);
  const [discourtItem, setDiscourtItem] = useState(null);
  const [courier, setCourir] = useState("");

  const [dataOrigin, setDataOrigin] = useState([]);
  const [destination, setDestination] = useState("");
  const [dataDestination, setDataDestination] = useState([]);

  const [resultCityDestination, setResultCityDestination] = useState("");

  const handleCourier = (event) => {
    setCourir(event.target.value);
  };
  const handleDestinationProvincie = (event) => {
    setDestination(event.target.value);
  };

  const handleDestinationCity = (event) => {
    setResultCityDestination(event.target.value);
  };

  useEffect(() => {
    GetOrigin(5)
      .then((data) => {
        setDataOrigin(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [GetOrigin]);

  useEffect(() => {
    GetDestination(destination)
      .then((data) => {
        setDataDestination(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [GetDestination, destination]);

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
    return total;
  };

  const handlePromo = () => {
    if (promo) {
      setPromo("");
      setDiscount(0);
      setDiscourtItem(1);
    } else {
      setPromo("Store Discounts 30%");
      setDiscount(0.3);
      setDiscourtItem(0.7);
    }
  };

  const handleCheckout = () => {
    setShowModal(true);
  };

  const handleCheckoutAndCloseModal = async () => {
    try {
      await CheckOutItem(dataOrigin[4]?.city_id, resultCityDestination, courier, discourtItem);
    } catch (error) {
      console.error("Error during checkout:", error);
    } finally {
      setShowModal(false);
    }
  };

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
                <td>IDR {formatRupiah(item.Product.price)}</td>
                <td>{item.quantity}</td>
                <td>{item.Size.name}</td>
                <td>IDR {formatRupiah(item.total_price)}</td>
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
              <h3>IDR {formatRupiah(getTotalAmount() - getTotalAmount() * discount)}</h3>
            </div>
          </div>
          <button
            onClick={() => {
              Scrollbar();
              handleCheckout();
            }}
          >
            PROCEED TO CHECKOUT
          </button>
        </div>
        {showModal && (
          <div className="modal-box">
            <div className="boxContainer-checkout">
              <h2>Delivery</h2>
              <div className="modalbox-option">
                <h5>Origin</h5>
                <div className="select-option">
                  <input type="text" name="origin" id="origin" value={provinces[4]?.province} placeholder={provinces[4]?.province} readOnly />
                  <input type="text" name="destination" id="destination" value={dataOrigin[4]?.city_name} placeholder={dataOrigin[4]?.city_name} readOnly />
                </div>
              </div>
              {
                <div className="modalbox-option">
                  <h5>Destination</h5>
                  <div className="select-option">
                    <select name="Destination-province" id="destination-province" onChange={handleDestinationProvincie}>
                      <option value="">Select Provinces</option>
                      {provinces.map((province) => (
                        <option key={province.province_id} value={province.province_id}>
                          {province.province}
                        </option>
                      ))}
                    </select>
                    <select name="Destination-city" id="destination-city" onChange={handleDestinationCity}>
                      <option value="">Select City</option>
                      {dataDestination &&
                        dataDestination.map((city) => (
                          <option key={city.city_id} value={city.city_id}>
                            {city.city_name}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
              }
              <div className="modalbox-option">
                <h5>Courier</h5>
                <select name="Courier" id="courier" onChange={handleCourier}>
                  <option value="">Select Courier</option>
                  <option value="jne">JNE</option>
                  <option value="tiki">Tiki</option>
                  <option value="pos">POS</option>
                </select>
              </div>

              <div className="btn-checkout">
                <button onClick={() => setShowModal(false)}>Cancel</button>
                {destination === "" || resultCityDestination === "" || courier === "" ? (
                  <button disabled className="btn-disabled">
                    Checkout
                  </button>
                ) : (
                  <Link to="/virtualAccount" className="nav-link-checkout">
                    <button onClick={handleCheckoutAndCloseModal}>Checkout</button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="cartItems-promo-code">
          <p>If you have a promo code, Enter it here</p>
          <div className="cartItems-promobox">
            <input type="text" placeholder={promo ? promo : "promo code"} readOnly />
            <button onClick={() => handlePromo()}>Store Discounts 30%</button>
          </div>
        </div>
      </div>
    </div>
  );
}
