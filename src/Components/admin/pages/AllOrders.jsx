import { TableHead, Button } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import BigContainer from "../components/BigContainer";

const AllOrders = () => {
  const [useOrder, setOrder] = useState([]);
  useEffect(() => {
    axios.get("/api/order").then((response) => {
      setOrder(response.data);
    });
  }, []);
  return (
    <div>
      <h3>All Orders</h3>
      <BigContainer>
        <TableHead
          sx={{ width: "100%", padding: "10px", alignContent: "center" }}
        >
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Order Date</th>
            <th>Total</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </TableHead>
        <tbody>
          {useOrder.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.customer}</td>
              <td>{order.order_date}</td>
              <td>{order.total}</td>
              <td>{order.status}</td>
              <td>
                <Button variant="contained">
                  <Link
                    to={`/admin/order/${order.id}`}
                    className="nav-link"
                    style={{ color: "white" }}
                  >
                    Detail
                  </Link>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </BigContainer>
    </div>
  );
};

export default AllOrders;
