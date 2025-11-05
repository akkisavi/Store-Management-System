import { Box, TextField, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from "@mui/material";
import { useState, useEffect } from "react";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

const FetchProductForm = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get("/product/all");
        setProducts(response.data);
      } catch (error) {
        console.log("Error fetching products:", error);
        toast.error("Error fetching products");
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.product_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box display="flex" flexDirection="column" gap={2} maxWidth="99%" margin="auto" mt={3}>
      {/* Search Bar */}
      <TextField
        label="Search Product"
        variant="outlined"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        fullWidth
        sx={{ backgroundColor: "white" }}
      />

      {/* Product Table */}
      <TableContainer component={Paper} className="border border-gray-300">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>Product Name</b></TableCell>
              <TableCell><b>Quantity</b></TableCell>
              <TableCell><b>Price per Unit</b></TableCell>
              <TableCell><b>Location</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow key={product.product_id}>
                <TableCell>{product.product_name}</TableCell>
                <TableCell>{product.product_quantity}</TableCell>
                <TableCell>₹{product.price_per_unit}</TableCell>
                <TableCell>{product.location}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default FetchProductForm;
