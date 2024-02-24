/* eslint-disable no-unused-vars */
import { TableHead, Button } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import BigContainer from "../components/BigContainer";

const AllCategories = () => {
  const [useCategory, setCategory] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/category").then((response) => {
      setCategory(response.data);
    });
  }, []);

  const handleDeleteCategory = async (categoryId) => {
    // Konfirmasi sebelum menghapus
    const confirmDelete = window.confirm(`Apakah Anda yakin ingin menghapus kategori ini ?`);

    if (!confirmDelete) {
      return; // Batal menghapus jika pengguna membatalkan konfirmasi
    }
    try {
      await axios.delete(`http://localhost:5000/category/${categoryId}`);

      window.location.reload();
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
    }
  };
  return (
    <>
      <div className="header-product" style={{ display: "flex", justifyContent: "space-between", padding: "20px" }}>
        <h3>All Categories</h3>
        <Button variant="contained">
          <Link to="/admin/addCategories" className="nav-link" style={{ color: "white" }}>
            Add Categories
          </Link>
        </Button>
      </div>
      <BigContainer>
        <TableHead sx={{ minWidth: "500px" }}>
          <tbody>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Action</th>
            </tr>
            {useCategory.map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>
                  <button>
                    <Link to={`edit/${item.id}`}>Edit</Link>
                  </button>
                  <button onClick={() => handleDeleteCategory(item.id)}>Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </TableHead>
      </BigContainer>
    </>
  );
};

export default AllCategories;
