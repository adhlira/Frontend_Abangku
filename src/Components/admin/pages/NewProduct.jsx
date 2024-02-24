/* eslint-disable no-unused-vars */
import {
  Card,
  Container,
  Typography,
  TextField,
  Divider,
  OutlinedInput,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  Button,
  Box,
} from "@mui/material";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";



const NewProduct = () => {
  const categories = ["Men", "Women", "Kid", "Family"];
  const [category, setCategory] = React.useState("");

  const [formData, setFormData] = React.useState({
    name: "",
    description: "",
    price: "",
    category_id: "",
    quantity: "",
    rating: "",
    image: null,
  });

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      photo: e.target.files[0],
    });
  };

  const handleProductChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://localhost:5000/product",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  const [selectedImage, setSelectedImage] = React.useState(null);
  const [imageUrl, setImageUrl] = React.useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageUrl(reader.result);
      };
      reader.readAsDataURL(file);
      setSelectedImage(file);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setImageUrl(null);
  };

  return (
    <>
      <Typography variant="h5">Create A New Product</Typography>
      <form onSubmit={handleSubmit}>
        <Container
          sx={{
            display: "flex",
            mt: 2,
            justifyContent: "left",
            gap: 2,
            width: "100%",
            overflow: "auto",
          }}
        >
          {/* main card */}
          <Card variant="outlined" sx={{ flexGrow: 1, width: 620, padding: 4 }}>
            <Typography variant="h6">Product Information</Typography>
            <Divider sx={{ mb: 2 }} />
            <Container sx={{ display: "flex", flexDirection: "column" }}>
              <Typography paragraph sx={{ mb: 1, padding: 0 }}>
                Product Name
              </Typography>
              <TextField
                sx={{ width: "100%", mb: 1 }}
                id="outlined-basic"
                placeholder="Name"
                variant="outlined"
              />
              <div
                style={{ display: "flex", flexDirection: "row", gap: "55px" }}
              >
                <div>
                  <Typography paragraph sx={{ mb: 1, paddingInline: 0 }}>
                    Price
                  </Typography>
                  <OutlinedInput
                    sx={{ width: "32ch", mb: 1 }}
                    variant="outlined"
                    id="outlined-adornment-weight"
                    startAdornment={
                      <InputAdornment position="start">Rp.</InputAdornment>
                    }
                    aria-describedby="outlined-weight-helper-text"
                  />
                </div>
                <div>
                  <Typography paragraph sx={{ mb: 1, padding: 0 }}>
                    Category
                  </Typography>
                  <FormControl>
                    <Select
                      labelId="select-category"
                      onChange={handleChange}
                      sx={{ width: "32ch", mb: 1 }}
                      placeholder="Select Category"
                    >
                      {categories.map((category) => (
                        <MenuItem key={category} value={category}>
                          {category}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              </div>
              <Container
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyItems: "space-between",
                  padding: 0,
                }}
              ></Container>
              <Typography paragraph sx={{ mb: 1, padding: 0 }}>
                Description
              </Typography>
              <TextField
                sx={{ width: "100%", mb: 1 }}
                variant="filled"
                placeholder="Description"
                id="outlined-adornment-weight"
                multiline
                rows={4}
                aria-describedby="outlined-weight-helper-text"
              />
            </Container>
            {/* media section */}
            <Typography variant="h6" sx={{ mt: 2 }}>
              Media
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Typography paragraph sx={{ mb: 1, padding: 0 }}>
              Upload Image
            </Typography>
            <Container
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Container
                component="section"
                sx={{
                  width: "400px",
                  height: "400px",
                  border: "1px dashed grey",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  overflow: "hidden",
                }}
              >
                <input
                  accept="image/*"
                  id="select-image"
                  multiple
                  type="file"
                  onChange={handleImageChange}
                  hidden
                  name="image"
                />
                <label htmlFor="select-image">
                  <Button component="span">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={selectedImage?.name}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                        }}
                      />
                    ) : (
                      <AddPhotoAlternateOutlinedIcon sx={{ fontSize: 100 }} />
                    )}
                  </Button>
                </label>
              </Container>
              {imageUrl && selectedImage && (
                <Box mt={2} textAlign="center">
                  <Button onClick={handleRemoveImage}>Remove Image</Button>
                </Box>
              )}
            </Container>
          </Card>
          {/* side card */}
          <Card
            variant="outlined"
            sx={{ flex: 2, width: 620, height: 384, padding: 2 }}
          >
            <Typography variant="h6"> Product Status</Typography>
            <Divider sx={{ mb: 2 }} />
            <div>
              <Typography paragraph sx={{ mb: 1, padding: 0 }}>
                Stock
              </Typography>
              <TextField
                sx={{ width: "100%", mb: 1 }}
                id="outlined-basic"
                placeholder="qty"
                type="number"
                variant="outlined"
              />
              <Typography paragraph sx={{ mb: 1, padding: 0 }}>
                Rating
              </Typography>
              <TextField
                sx={{ width: "100%", mb: 1 }}
                id="outlined-basic"
                type="number"
                InputProps={{ inputProps: { min: 0, max: 5, step: 0.1 } }}
                placeholder="Rating"
                variant="outlined"
              />

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "40px",
                }}
              >
                <Link to="/admin/products" sx={{ width: "40%" }}>
                  <Button variant="contained" sx={{ backgroundColor: "red" }}>
                    Cancel
                  </Button>
                </Link>
                <Button
                  variant="contained"
                  sx={{ backgroundColor: "green", width: "40%" }}
                  onClick={handleSubmit}
                >
                  Save
                </Button>
              </div>
            </div>
          </Card>
        </Container>
      </form>
    </>
  );
};

export default NewProduct;
