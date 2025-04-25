import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { axiosInstance } from "../lib/axios";

const SellProductForm = () => {
  const [form, setForm] = useState({
    product_id: "",
    quantity_sold: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSell = async () => {
    try {
      const response = await axiosInstance.post("/api/sales/sell", form, {
        responseType: "blob" // Expect a PDF
      });
  
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      window.open(url, "_blank"); // Opens the PDF in a new tab
    } catch (error) {
      console.log(error);
      alert("Sale failed");
    }  
  };

  return (
    <Box display="flex" flexDirection="column" gap={2} maxWidth={400}>
      <TextField name="product_id" label="Product ID" type="number" onChange={handleChange} />
      <TextField name="quantity_sold" label="Quantity Sold" type="number" onChange={handleChange} />
      <Button variant="contained" onClick={handleSell}>Sell</Button>
    </Box>
  );
};

export default SellProductForm;
