import { Box, Button, TextField, Autocomplete, Paper, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { MdOutlineSell } from "react-icons/md";

const SellProductForm = () => {
  const [form, setForm] = useState({
    product_id: "",
    quantity_sold: "",
    product_name: "",
  });

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [inputValue, setInputValue] = useState("");

  // Fetch all products
  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const response = await axiosInstance.get("/api/product/all");
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

  const handleSell = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/api/sales/sell", form, {
        responseType: "blob",
      });

      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      window.open(url, "_blank");
      toast.success("Sale successful");
    } catch (error) {
      console.log(error);
      toast.error("Sale failed");
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="80vh"
      mt={2}
    >
      <Paper elevation={3} sx={{ padding: 4, width: "100%", maxWidth: 450, borderRadius: 3 }}>
        <Typography variant="h5" fontWeight="bold" textAlign="center" mb={3}>
          Sell Product
        </Typography>

        <form onSubmit={handleSell}>
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              name="product_id"
              label="Product ID"
              type="number"
              value={form.product_id || ""}
              InputProps={{
                readOnly: true,
              }}
              fullWidth
            />

            <Autocomplete
              options={filteredProducts}
              getOptionLabel={(option) => option.product_name || ""}
              value={form.product_name ? { product_name: form.product_name } : null}
              inputValue={inputValue}
              onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
                const filtered = products.filter((product) =>
                  product.product_name.toLowerCase().includes(newInputValue.toLowerCase())
                );
                setFilteredProducts(filtered);
              }}
              onChange={(event, newValue) => {
                if (newValue) {
                  setForm({
                    ...form,
                    product_id: newValue.id,
                    product_name: newValue.product_name,
                  });
                  setInputValue(newValue.product_name);
                } else {
                  setForm({ ...form, product_id: "", product_name: "" });
                  setInputValue("");
                }
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Product Name"
                  variant="outlined"
                  fullWidth
                />
              )}
            />

            <TextField
              name="quantity_sold"
              label="Quantity Sold"
              type="number"
              value={form.quantity_sold || ""}
              onChange={handleChange}
              fullWidth
            />

            <Button variant="contained" size="large" startIcon={<MdOutlineSell />} type="submit" fullWidth>
             Sell Product
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default SellProductForm;
