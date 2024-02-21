/* eslint-disable no-unused-vars */
import { TableHead } from "@mui/material";
import axios from "axios";
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
      <h3>All Products</h3>
      <TableHead>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Description</th>
            <th>Category</th>
            <th>Rating</th>
            <th>Image</th>
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
              <td><img src={item.ProductImage[0].image_url} alt="" /></td>
              <td>
                <button>Edit</button>
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </TableHead>
    </>
  );
};

export default AllProducts;
