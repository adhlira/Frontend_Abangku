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
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
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
      .get("/api/product")
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
    { id: "id", label: "ID", align: "left" },
    { id: "name", label: "Name", align: "left", },
    { id: "price", label: "Price", align: "left", },
    { id: "quantity", label: "Quantity" , align: "left",},
    { id: "description", label: "Description", align: "center" },
    { id: "category", label: "Category", align: "left", },
    { id: "rating", label: "Rating" , align: "center",},
    { id: "action", label: "Action", align: "center", },
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
          <Skeleton animation="wave" variant="text" sx={{ fontSize: "5rem" }} />
          <Skeleton
            animation="wave"
            variant="rectangular"
            width="100%"
            height={350}
          />
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
                      style={{  fontWeight: "bold", fontSize: "16px", backgroundColor: "#f5f5f5" }}
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
                      <TableCell sx={{ width: "250px" }}>{item.name}</TableCell>
                      <TableCell sx={{ width: "150px" }}>{item.price}</TableCell>
                      <TableCell >{item.quantity}</TableCell>
                      <TableCell sx={{ maxWidth: "400px" }}>{item.description}</TableCell>
                      <TableCell>{item.Category.name}</TableCell>
                      <TableCell>{item.rating}</TableCell>
                      <TableCell align="center" width={40}> 
                        <Link to={`edit/${item.id}`} style={{ color: "black" }}>
                          <EditIcon sx={{ fontSize: "24px"}} />
                        </Link>
                        <Link to={`delete/${item.id}`} style={{ color: "red" }}>
                          <DeleteForeverIcon sx={{ fontSize: "24px", marginTop: "10px"}} />
                        </Link>
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
