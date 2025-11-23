import { useState, useEffect } from "react";
import {
  Box,
  TextField,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  InputAdornment,
  IconButton,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

const priceFormatter = new Intl.NumberFormat("en-IN");

const FetchProductForm = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axiosInstance.get("/product/all");
        setProducts(res.data || []);
      } catch (err) {
        console.error("Error fetching products:", err);
        toast.error("Error fetching products");
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((p) =>
    p.product_name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box maxWidth={1000} margin="24px auto" px={2}>
      <TextField
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search products"
        size="small"
        fullWidth
        variant="outlined"
        sx={{
          background: "rgba(255,255,255,0.9)",
          borderRadius: 2,
          ".MuiOutlinedInput-root": { paddingRight: 0 },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon fontSize="small" color="action" />
            </InputAdornment>
          ),
          endAdornment: searchQuery ? (
            <InputAdornment position="end">
              <IconButton
                size="small"
                onClick={() => setSearchQuery("")}
                aria-label="clear"
              >
                <ClearIcon fontSize="small" />
              </IconButton>
            </InputAdornment>
          ) : null,
        }}
      />

      <TableContainer
        component={Paper}
        elevation={0}
        sx={{
          mt: 2,
          borderRadius: 2,
          border: "1px solid rgba(0,0,0,0.06)",
          overflow: "hidden",
        }}
      >
        <Table size="small">
          <TableHead>
            <TableRow sx={{ background: "rgba(0,0,0,0.02)" }}>
              <TableCell sx={{ fontSize: 13, fontWeight: 600 }}>Product</TableCell>
              <TableCell sx={{ fontSize: 13, fontWeight: 600 }}>Qty</TableCell>
              <TableCell sx={{ fontSize: 13, fontWeight: 600 }}>Price</TableCell>
              <TableCell sx={{ fontSize: 13, fontWeight: 600 }}>Location</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredProducts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} sx={{ py: 6, textAlign: "center" }}>
                  <Typography color="text.secondary" variant="body2">
                    No products found
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              filteredProducts.map((product) => (
                <TableRow
                  key={product.product_id}
                  hover
                  sx={{ "&:last-child td": { borderBottom: "none" } }}
                >
                  <TableCell sx={{ fontSize: 13 }}>
                    <Typography noWrap>{product.product_name}</Typography>
                  </TableCell>
                  <TableCell sx={{ fontSize: 13, width: 80 }}>
                    {product.product_quantity}
                  </TableCell>
                  <TableCell sx={{ fontSize: 13, width: 110 }}>
                    ₹{priceFormatter.format(product.price_per_unit)}
                  </TableCell>
                  <TableCell sx={{ fontSize: 13, color: "text.secondary" }}>
                    {product.location || "-"}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default FetchProductForm;
