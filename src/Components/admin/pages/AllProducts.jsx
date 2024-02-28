/* eslint-disable no-unused-vars */
import {
  TableRow,
  Button,
  Table,
  TableHead,
  TablePagination,
  Skeleton,
  TableBody,
  TableCell,
  TableContainer,
} from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import BigContainer from "../components/BigContainer";

const AllProducts = () => {
  const [useProduct, setProduct] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    // Simulate a delay to see the skeleton
    const timer = setTimeout(() => {
      setLoading(false); // Set loading to false after 3 seconds
    }, 2000);

    // Fetch product data
    axios
      .get("http://localhost:5000/product")
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.error("Error fetching product data:", error);
      });

    // Cleanup function
    return () => clearTimeout(timer);
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

  const headCells = [
    { id: "id", label: "ID", align: "left", width: "5" },
    { id: "name", label: "Name" },
    { id: "price", label: "Price" },
    { id: "quantity", label: "Quantity" },
    { id: "description", label: "Description" },
    { id: "category", label: "Category" },
    { id: "rating", label: "Rating" },
    { id: "action", label: "Action" },
  ];

  return (
    <>
      <div
        className="header-product"
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "20px",
        }}
      >
        <h3>All Products</h3>
        <Button variant="contained">
          <Link
            to="/admin/New%20Product"
            className="nav-link"
            style={{ color: "white" }}
          >
            Add Product
          </Link>
        </Button>
      </div>

      {loading ? ( // Show skeleton if loading
        <BigContainer>
          <Skeleton animation="wave"  variant="text" sx={{ fontSize: "5rem" }} />
          <Skeleton animation="wave"  variant="rectangular" width="100%" height={350} />
        </BigContainer>
      ) : (
        <BigContainer className="product-table-container">
          <Table stickyHeader aria-label="sticky table">
            <TableContainer sx={{ maxHeight: 440 }}>
              <TableHead>
                <TableRow>
                  {headCells.map((cell) => (
                    <TableCell
                      key={cell.id}
                      align={cell.align}
                      style={{ width: cell.width, fontWeight: "bold" }}
                    >
                      {cell.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {useProduct
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.id}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.price}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>{item.description}</TableCell>
                      <TableCell>{item.Category.name}</TableCell>
                      <TableCell>{item.rating}</TableCell>
                      <TableCell>
                        <button>
                          <Link to={`edit/${item.id}`}>Edit</Link>
                        </button>
                        <button>
                          <Link to={`hapus/${item.id}`}>Hapus</Link>
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </TableContainer>
            <TablePagination
              component="div"
              count={useProduct.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Table>
        </BigContainer>
      )}
    </>
  );
};

export default AllProducts;
