/* eslint-disable no-unused-vars */
import { Button, TableHead, TablePagination } from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import BigContainer from "../components/BigContainer";

const AllProducts = () => {
  const [useProduct, setProduct] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:5000/product").then((response) => {
      setProduct(response.data);
    });
  }, []);


  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <div className="header-product" style={{ display: "flex", justifyContent: "space-between", padding: "20px" }}>
        <h3>All Products</h3>
        <Button variant="contained">
          <Link to="/admin/New%20Product" className="nav-link" style={{ color: "white" }}>
            Add Product
          </Link>
        </Button>
      </div>

      <BigContainer className="product-table-container">
        <TableHead>
          <tbody>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Description</th>
              <th>Category</th>
              <th>Rating</th>
              <th>Option</th>
            </tr>

            {useProduct.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
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
                    <Link to={`hapus/${item.id}`}>Hapus</Link>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </TableHead>
        <TablePagination component="div" count={useProduct.length} page={page} onPageChange={handleChangePage} rowsPerPage={rowsPerPage} onRowsPerPageChange={handleChangeRowsPerPage} />
      </BigContainer>
    </>
  );
};

export default AllProducts;
