import { useState, useEffect } from "react";
import InformationSect from "../InformationSect/InformationSect";
import formatRupiah from "../../helper/Rupiah";
import { useAuth } from "../../Context/AuthContext";

export default function VirtualAccount() {
  const [Datainvoice, setInvoice] = useState("");
  const [Datatotal, setTotal] = useState("");
  const [Datashipment, setShipment] = useState("");
  const [DatapayStatus, setPayStatus] = useState("");
  const [orderID, setOrderID] = useState("");
  const { or, Pay } = useAuth();

  const order = Number(orderID);
  console.log(order);

  useEffect(() => {
    const invoice = localStorage.getItem("invoice");
    const total = localStorage.getItem("total");
    const payStatus = localStorage.getItem("payment");
    const shipment = localStorage.getItem("shipment");
    const orderID = localStorage.getItem("orderID");
    setInvoice(invoice);
    setTotal(total);
    setPayStatus(payStatus);
    setShipment(shipment);
    setOrderID(orderID);
  }, [or]);

  const handlePayment = async () => {
    try {
      const response = await Pay(order);
      console.log(response);
      // Redirect to the payment page after the payment process is completed
      window.location.href = "https://app.sandbox.midtrans.com/snap/v3/redirection/da705b91-45dd-4c24-9a29-05ff3e744f49";
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="container-VA">
        <div className="container-bank">
          <table className="table-invoice">
            <thead>
              <tr>
                <th>Invoice</th>
                <th>Total</th>
                <th>Payment Status</th>
                <th>Shipping Cost</th>
                <th>Payment</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{Datainvoice}</td>
                <td>IDR {formatRupiah(Datatotal)}</td>
                <td>{DatapayStatus}</td>
                <td>IDR {formatRupiah(Datashipment)}</td>
                <td>
                  <button className="btn-payment" onClick={handlePayment}>
                    PAYMENT
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <InformationSect />
    </>
  );
}
