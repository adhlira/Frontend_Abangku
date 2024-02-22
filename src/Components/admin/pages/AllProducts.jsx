/* eslint-disable no-unused-vars */
import { TableHead } from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const AllProducts = () => {
  const [useProduct, setProduct] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:5000/product").then((response) => {
      setProduct(response.data);
    });
  }, []);
  console.log(useProduct);
  return (
    <>
      <h2>All Products</h2>
      <TableHead>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Description</th>
            <th>Category</th>
            <th>Rating</th>
            <th>Option</th>
          </tr>
          {useProduct.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td>{item.quantity}</td>
              <td>{item.description}</td>
              <td>{item.Category.name}</td>
              <td>{item.rating}</td>
              <td>
                <button>
                  <Link to={`edit/${item.id}`}>Edit</Link>
                </button>
                <button>
                  <Link to={`delete/${item.id}`}>Delete</Link>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </TableHead>
    </>
  );
};

export default AllProducts;
