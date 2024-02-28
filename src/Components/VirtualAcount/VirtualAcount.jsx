import { useState, useEffect } from "react";
import InformationSect from "../InformationSect/InformationSect";
import { useAuth } from "../../Context/AuthContext";

export default function VirtualAcount() {
  const { order } = useAuth();
  const [detailOrder, setDetailOrder] = useState("");

  useEffect(() => {
    if (order !== detailOrder) {
      setDetailOrder(order);
    }
  }, [order, detailOrder]);

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
                <th>payment</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{detailOrder?.invoice}</td>
                <td>${(detailOrder?.total / 15700).toFixed(1)}</td>
                <td>${(detailOrder?.shipment_fee / 15700).toFixed(1)}</td>
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
