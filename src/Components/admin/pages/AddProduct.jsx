/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Card, Container, Typography, TextField, Divider, OutlinedInput, InputAdornment, Select, MenuItem, Button, Stack, Box, Menu } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [rating, setRating] = useState("");
  const [category_id, setCategory_id] = useState("");
  const [image, setImage] = useState(null);

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

  return (
    <React.Fragment>
      <h2>Add Product</h2>
      <form className="form" onSubmit={handleSubmit} action={<Link to="/login" />}>
        <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
          <TextField type="text" variant="outlined" color="secondary" label="Name" onChange={(e) => setName(e.target.value)} value={name} fullWidth required />
          <TextField type="text" variant="outlined" color="secondary" label="desc" onChange={(e) => setDescription(e.target.value)} value={description} fullWidth required />
        </Stack>
        <TextField type="number" variant="outlined" color="secondary" label="Price" onChange={(e) => setPrice(e.target.value)} value={price} fullWidth required sx={{ mb: 4 }} />
        <TextField type="number" variant="outlined" color="secondary" label="Quantity" onChange={(e) => setQuantity(e.target.value)} value={quantity} required fullWidth sx={{ mb: 4 }} />
        <TextField type="number" variant="outlined" color="secondary" label="Rating" onChange={(e) => setRating(e.target.value)} value={rating} fullWidth required sx={{ mb: 4 }} />
        <Select sx={{ width: "32ch", mb: 1 }} placeholder="Select Category" defaultValue={"0"} onChange={(e) => setCategory_id(e.target.value)}>
          <MenuItem value="0" disabled>
            Select Category
          </MenuItem>
          <MenuItem value="1">Men</MenuItem>
          <MenuItem value="2">Women</MenuItem>
          <MenuItem value="3">Kid</MenuItem>
          <MenuItem value="4">Family</MenuItem>
        </Select>
        <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
        <Button variant="outlined" color="secondary" type="submit">
          Add
        </Button>
      </form>
    </React.Fragment>
  );
};

export default AddProduct;
