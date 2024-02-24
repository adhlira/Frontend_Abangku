/* eslint-disable no-unused-vars */
import React, { useState } from "react";
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
  Button,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [rating, setRating] = useState("");
  const [category_id, setCategory_id] = useState("");
  const [image, setImage] = useState(null);
  const [selectedImage, setSelectedImage] = React.useState(null);
  const [imageUrl, setImageUrl] = React.useState(null);

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("quantity", quantity);
    formData.append("rating", rating);
    formData.append("category_id", category_id);
    formData.append("image", image);

    console.log(formData);
    axios
      .post("http://localhost:5000/product", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleImageChange(e) {
    setImage(e.target.files[0]);
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageUrl(reader.result);
      };
      reader.readAsDataURL(file);
      setSelectedImage(file);
    }
  }

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setImageUrl(null);
  };

  return (
    <React.Fragment>
      <Typography variant="h5">Create A New Product</Typography>
      <form
        className="form"
        onSubmit={handleSubmit}
        action={<Link to="/login" />}
      >
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
          <Card variant="outlined" sx={{ flexGrow: 1, width: 620, padding: 4 }}>
            <Typography variant="h6">Product Information</Typography>
            <Divider sx={{ mb: 2 }} />

            <Typography paragraph sx={{ mb: 1, padding: 0 }}>
              Product Name
            </Typography>
            <TextField
              type="text"
              variant="outlined"
              color="secondary"
              label="Name"
              sx={{ mb: 1 }}
              onChange={(e) => setName(e.target.value)}
              value={name}
              fullWidth
              required
            />
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
              <div>
                <Typography paragraph sx={{ mb: 1, padding: 0 }}>
                  Price
                </Typography>
                <OutlinedInput
                  type="number"
                  variant="outlined"
                  color="secondary"
                  startAdornment={
                    <InputAdornment position="start">Rp.</InputAdornment>
                  }
                  onChange={(e) => setPrice(e.target.value)}
                  value={price}
                  fullWidth
                  required
                  sx={{ width: "32ch", mb: 1 }}
                />
              </div>
              <div>
                <Typography paragraph sx={{ mb: 1, padding: 0 }}>
                  Category
                </Typography>
                <Select
                  sx={{ width: "32ch", mb: 1 }}
                  placeholder="Select Category"
                  defaultValue={"0"}
                  onChange={(e) => setCategory_id(e.target.value)}
                >
                  <MenuItem value="0" disabled>
                    Select Category
                  </MenuItem>
                  <MenuItem value="1">Men</MenuItem>
                  <MenuItem value="2">Women</MenuItem>
                  <MenuItem value="3">Kid</MenuItem>
                  <MenuItem value="4">Family</MenuItem>
                </Select>
              </div>
            </div>
            <Typography paragraph sx={{ mb: 1, padding: 0 }}>
              Product Description
            </Typography>
            <TextField
              type="text"
              variant="outlined"
              color="secondary"
              label="desc"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              fullWidth
              multiline
              rows={4}
              required
            />

            <Typography variant="h6" sx={{ mt: 2 }}>
              Media
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Typography paragraph sx={{ mb: 1, padding: 0 }}>
              Product Image
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
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  hidden
                  name="image"
                  id="select-image"
                  required
                />
                <label htmlFor="select-image">
                  <Button component="span">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt=""
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

          <Card
            variant="outlined"
            sx={{ flex: 2, width: 620, height: 'fit-content', padding: 4 }}
          >
            <Typography variant="h6"> Product Status</Typography>
            <Divider sx={{ mb: 2 }} />
            <TextField
              type="number"
              variant="outlined"
              color="secondary"
              label="Quantity"
              onChange={(e) => setQuantity(e.target.value)}
              value={quantity}
              required
              fullWidth
              sx={{ mb: 4 }}
            />
            <TextField
              type="number"
              variant="outlined"
              color="secondary"
              label="Rating"
              onChange={(e) => setRating(e.target.value)}
              value={rating}
              fullWidth
              required
              sx={{ mb: 4 }}
            />
          </Card>
          
        </Container>
        <Divider sx={{ mt: 2 }} />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Link to="/admin/products" sx={{ width: "40%" }}>
            <Button variant="contained" sx={{ backgroundColor: "red", mt: 2   }}>
              Cancel
            </Button>
          </Link>
          <Button
            variant="contained"
            type="submit"
            sx={{ mt: 2, backgroundColor: "green", width: "10%" }}
          >
            Save
          </Button>
        </div>
      </form>
    </React.Fragment>
  );
};

export default AddProduct;
