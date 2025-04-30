import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  TableContainer,
  IconButton,
  Collapse,
} from "@mui/material";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { format, parseISO } from "date-fns";
import { LuLoaderCircle } from "react-icons/lu";

const DailySales = () => {
  const [salesData, setSalesData] = useState([]);
  const [expandedDate, setExpandedDate] = useState(null);
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSalesData();
  }, []);

  const fetchSalesData = async () => {
    try {
      const response = await axiosInstance.get("/api/admin/daily-sales");
      setSalesData(response.data);
    } catch (error) {
      toast.error("Failed to fetch sales data");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchDetailsForDate = async (rawDate) => {
    const formattedDate = format(new Date(rawDate), "yyyy-MM-dd");

    try {
      const response = await axiosInstance.get(
        `/api/admin/daily-sales/${formattedDate}/details`
      );
      setDetails((prev) => ({ ...prev, [formattedDate]: response.data }));
    } catch (error) {
      toast.error("Failed to fetch product details");
      console.error(error);
    }
  };

  const toggleRow = (rawDate) => {
    const formattedDate = format(new Date(rawDate), "yyyy-MM-dd");

    if (expandedDate === formattedDate) {
      setExpandedDate(null);
    } else {
      setExpandedDate(formattedDate);
      if (!details[formattedDate]) {
        fetchDetailsForDate(rawDate);
      }
    }
  };

  const formatDateDisplay = (dateString) => {
    return format(new Date(dateString), "MMM dd, yyyy");
  };

  return (
    <Box p={4}>
      <Typography variant="h5" gutterBottom>
        Daily Sales Report
      </Typography>

      {loading ? (
        <Typography>
          <LuLoaderCircle className="animate-spin" /> Loading...
        </Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#e0e0e0" }}>
                <TableCell />
                <TableCell sx={{ fontWeight: "bold" }}>Date</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Total Sales</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>
                  Total Profit ($)
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {salesData.map((data) => {
                const formattedDate = format(new Date(data.date), "yyyy-MM-dd");

                return (
                  <React.Fragment key={formattedDate}>
                    <TableRow>
                      <TableCell>
                        <IconButton
                          onClick={() => toggleRow(data.date)}
                          size="small"
                        >
                          {expandedDate === formattedDate ? (
                            <KeyboardArrowUp />
                          ) : (
                            <KeyboardArrowDown />
                          )}
                        </IconButton>
                      </TableCell>
                      <TableCell>{formatDateDisplay(data.date)}</TableCell>
                      <TableCell>{data.total_sales}</TableCell>
                      <TableCell>{data.total_profit}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        colSpan={4}
                        sx={{ paddingBottom: 0, paddingTop: 0 }}
                      >
                        <Collapse
                          in={expandedDate === formattedDate}
                          timeout="auto"
                          unmountOnExit
                        >
                          <Box margin={2}>
                            <Typography variant="subtitle1" gutterBottom>
                              Products Sold on {formatDateDisplay(data.date)}
                            </Typography>
                            {details[formattedDate] ? (
                              <Table size="small">
                                <TableHead>
                                  <TableRow>
                                    <TableCell>Product Name</TableCell>
                                    <TableCell>Quantity</TableCell>
                                    <TableCell>Price</TableCell>
                                    <TableCell>Sold By</TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {details[formattedDate].map((product, i) => (
                                    <TableRow key={i}>
                                      <TableCell>
                                        {product.product_name}
                                      </TableCell>
                                      <TableCell>
                                        {product.quantity_sold}
                                      </TableCell>
                                      <TableCell>
                                        {product.total_price}
                                      </TableCell>
                                      <TableCell>{product.sold_by}</TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            ) : (
                              <Typography>
                                <LuLoaderCircle className="animate-spin" />{" "}
                                Loading...
                              </Typography>
                            )}
                          </Box>
                        </Collapse>
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default DailySales;
