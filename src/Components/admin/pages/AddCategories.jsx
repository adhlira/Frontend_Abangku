import { Container, Typography, Input, Button } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const AddCategories = () => {
  const [category, setCategory] = useState({});
  const navigate = useNavigate();

  const sendDatatoBackend = async () => {
    try {
      const response = await axios.post(`http://localhost:5000/category`, {
        name: category.name,
      });
      console.log("Respon dari server:", response.data);
      navigate("/admin/Categories");
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
    }
  };
  return (
    <>
      <h2>Add Category</h2>
      <Container sx={{ display: "flex", flexDirection: "column" }}>
        <Typography paragraph sx={{ mb: 1, padding: 0 }}>
          Category Name
        </Typography>
        <Input value={category.name} sx={{ width: "100%", mb: 1 }} id="outlined-basic" placeholder="Name" variant="outlined" onChange={(e) => setCategory({ ...category, name: e.target.value })}></Input>

        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "40px" }}>
          <Link to={"/admin/Categories"}>
            <Button variant="contained" sx={{ backgroundColor: "red", width: "40%" }}>
              Cancel
            </Button>
          </Link>
          <Button onClick={sendDatatoBackend} variant="contained" sx={{ backgroundColor: "green", width: "40%" }}>
            Save
          </Button>
        </div>
      </Container>
    </>
  );
};
export default AddCategories;
