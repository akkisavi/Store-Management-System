import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { axiosInstance } from "../lib/axios";

const AddProductForm = () => {
  const [form, setForm] = useState({
    product_name: "",
    product_quantity: "",
    price_per_unit: "",
    location: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await axiosInstance.post("/api/product/add", form);
      alert("Product added successfully");
    } catch (error) {
        console.log(error);
      alert("Error adding product");
    }
  };

  return (
    <Box display="flex" flexDirection="column" gap={2} maxWidth={400}>
      <TextField name="product_name" label="Product Name" onChange={handleChange} />
      <TextField name="product_quantity" label="Quantity" type="number" onChange={handleChange} />
      <TextField name="price_per_unit" label="Price per Unit" type="number" onChange={handleChange} />
      <TextField name="location" label="Location" onChange={handleChange} />
      <Button variant="contained" onClick={handleSubmit}>Add Product</Button>
    </Box>
  );
};

export default AddProductForm;
