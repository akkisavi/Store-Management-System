import { Box, Button, TextField, Card, CardContent, Typography } from "@mui/material";
import { useState, useEffect } from "react";
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
  
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const response = await axiosInstance.get("/product/all");
        setProducts(response.data);
      } catch (error) {
        console.log("Error fetching products:", error);
        toast.error("Error fetching products");
      }
    };

    fetchAllProducts();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const existingProduct = products.find(
      (product) => product.product_name.toLowerCase() === form.product_name.toLowerCase()
    );

    if (existingProduct) {
      const updatedProduct = {
        ...existingProduct,
        product_quantity: existingProduct.product_quantity + parseInt(form.product_quantity),
      };

      try {
        await axiosInstance.post("/product/add", updatedProduct);
        toast.success("Product quantity updated successfully");
      } catch (error) {
        console.log(error);
        toast.error("Error updating product quantity");
      }
    } else {
      try {
        await axiosInstance.post("/product/add", form);
        toast.success("Product added successfully");
      } catch (error) {
        console.log(error);
        toast.error("Error adding product");
      }
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh" bgcolor={"#f4f5f7"}>
      <Card sx={{ width: 400, padding: 3, boxShadow: 4, borderRadius: 4 }}>
        <CardContent>
          <Typography variant="h5" fontWeight="bold" textAlign="center" mb={3} gutterBottom>
            Add/Update Product
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
              Add/Update Product
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AddProductForm;
