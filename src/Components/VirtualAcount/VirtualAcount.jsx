import { useState, useEffect } from "react";
import InformationSect from "../InformationSect/InformationSect";
import formatRupiah from "../../helper/Rupiah";

export default function VirtualAccount() {
  const [Datainvoice, setInvoice] = useState("");
  const [Datatotal, setTotal] = useState("");
  const [Datashipment, setShipment] = useState("");

  useEffect(() => {
    const invoice = localStorage.getItem("invoice");
    const total = localStorage.getItem("total");
    const shipment = localStorage.getItem("shipment");

    setInvoice(invoice);
    setTotal(total);
    setShipment(shipment);
  }, []);

  return (
    <>
      <div className="container-VA">
        <div className="container-bank">
          <table className="table-invoice">
            <thead>
              <tr>
                <th>Invoice</th>
                <th>Total</th>
                <th>Shipping Cost</th>
                <th>Payment</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{Datainvoice}</td>
                <td>IDR {formatRupiah(Datatotal)}</td>
                <td>IDR {formatRupiah(Datashipment)}</td>
                <td>
                  <button className="btn-payment">PAYMENT</button>
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
