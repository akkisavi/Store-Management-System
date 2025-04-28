import { Box, Button, TextField, Card, CardContent, Typography } from "@mui/material";
import { useState } from "react";
import { axiosInstance } from "../lib/axios";
import { IoIosAddCircleOutline } from "react-icons/io";
import toast from "react-hot-toast";

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
      toast.error("Error adding product");
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh" bgcolor={"#ffff99"} >
    <Card sx={{ width: 400, padding: 3, boxShadow: 4, borderRadius: 4 }}>
      <CardContent>
        <Typography variant="h5" fontWeight="bold" textAlign="center" mb={3} gutterBottom>
          Add New Product
        </Typography>
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            name="product_name"
            label="Product Name"
            variant="outlined"
            onChange={handleChange}
            fullWidth
          />
          <TextField
            name="product_quantity"
            label="Quantity"
            type="number"
            variant="outlined"
            onChange={handleChange}
            fullWidth
          />
          <TextField
            name="price_per_unit"
            label="Price per Unit"
            type="number"
            variant="outlined"
            onChange={handleChange}
            fullWidth
          />
          <TextField
            name="location"
            label="Location"
            variant="outlined"
            onChange={handleChange}
            fullWidth
          />
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleSubmit}
            sx={{ marginTop: 2 }}
            startIcon={<IoIosAddCircleOutline />}
          >
            Add Product
          </Button>
        </Box>
      </CardContent>
    </Card>
  </Box>
  );
};

export default AddProductForm;
