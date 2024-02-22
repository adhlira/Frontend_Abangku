/* eslint-disable no-unused-vars */
import { Card, Container, Typography, TextField, Divider, OutlinedInput, InputAdornment, Select, MenuItem, FormControl, Button, Box } from "@mui/material";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const NewProduct = () => {
  const categories = ["Men", "Women", "Kid", "Family"];
  const [category, setCategory] = React.useState("");

  const [useProduct, setProduct] = useState({});
  const { id } = useParams();
  const end_point = "http://localhost:5000/product";
  const url = `${end_point}/${id}`;

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

  useEffect(() => {
    axios.get(url).then((response) => {
      setProduct(response.data);
      console.log(response);
    });
  }, []);
  console.log(useProduct);

  return (
    <>
      <Typography variant="h5">Edit Product</Typography>
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

            <TextField sx={{ width: "100%", mb: 1 }} id="outlined-basic" placeholder="Name" variant="outlined" value={useProduct.name} />

            <div style={{ display: "flex", flexDirection: "row", gap: "55px" }}>
              <div>
                <Typography paragraph sx={{ mb: 1, paddingInline: 0 }}>
                  Price
                </Typography>
                <OutlinedInput
                  sx={{ width: "32ch", mb: 1 }}
                  variant="outlined"
                  id="outlined-adornment-weight"
                  startAdornment={<InputAdornment position="start">Rp.</InputAdornment>}
                  aria-describedby="outlined-weight-helper-text"
                  value={useProduct.price}
                />
              </div>
              <div>
                <Typography paragraph sx={{ mb: 1, padding: 0 }}>
                  Category
                </Typography>
                <FormControl>
                  <Select labelId="select-category" value={category} onChange={handleChange} sx={{ width: "32ch", mb: 1 }} placeholder="Select Category">
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
            <TextField sx={{ width: "100%", mb: 1 }} variant="filled" placeholder="Description" id="outlined-adornment-weight" multiline rows={4} aria-describedby="outlined-weight-helper-text" value={useProduct.description} />
          </Container>
          {/* media section */}
          <Typography variant="h6" sx={{ mt: 2 }}>
            Media
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Typography paragraph sx={{ mb: 1, padding: 0 }}>
            Upload Image
          </Typography>
          <Container sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
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
              <input accept="image/*" id="select-image" multiple type="file" onChange={handleImageChange} hidden />
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

            <Button variant="contained" sx={{ mt: 2, width: "50%" }}>
              Upload
            </Button>
          </Container>
        </Card>

        {/* side card */}
        <Card variant="outlined" sx={{ flex: 2, width: 620, height: 384, padding: 2 }}>
          <Typography variant="h6"> Product Status</Typography>
          <Divider sx={{ mb: 2 }} />
          <div>
            <Typography paragraph sx={{ mb: 1, padding: 0 }}>
              Stock
            </Typography>
            <TextField sx={{ width: "100%", mb: 1 }} id="outlined-basic" placeholder="qty" type="number" variant="outlined" value={useProduct.quantity} />
            <Typography paragraph sx={{ mb: 1, padding: 0 }}>
              Rating
            </Typography>
            <TextField sx={{ width: "100%", mb: 1 }} id="outlined-basic" type="number" InputProps={{ inputProps: { min: 0, max: 5, step: 0.1 } }} placeholder="Rating" variant="outlined" value={useProduct.rating} />

            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "40px" }}>
              <Button variant="contained" sx={{ backgroundColor: "red", width: "40%" }}>
                Cancel
              </Button>
              <Button variant="contained" sx={{ backgroundColor: "green", width: "40%" }}>
                Save
              </Button>
            </div>
          </div>
        </Card>
      </Container>
    </>
  );
};

export default NewProduct;
