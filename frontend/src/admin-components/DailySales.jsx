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
  Card,
  CardContent,
  ToggleButton,
  ToggleButtonGroup,
  Stack,
  Divider,
} from "@mui/material";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { format } from "date-fns";
import { LuLoaderCircle } from "react-icons/lu";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  Legend,
} from "recharts";

const currencyFormatter = new Intl.NumberFormat(undefined, {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 2,
});

const numberFormatter = new Intl.NumberFormat();

const DailySales = () => {
  const [salesData, setSalesData] = useState([]);
  const [expandedDate, setExpandedDate] = useState(null);
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(true);

  const [view, setView] = useState("table"); 
  const [chartType, setChartType] = useState("line"); 
  const [metric, setMetric] = useState("sales"); 

  useEffect(() => {
    fetchSalesData();
  }, []);

  const fetchSalesData = async () => {
    try {
      const response = await axiosInstance.get("/admin/daily-sales");
      const normalized =
        (response.data || []).map((d) => ({
          date: d.date,
          total_sales: Number(d.total_sales) || 0,
          total_profit: Number(d.total_profit) || 0,
        })) || [];

      normalized.sort((a, b) => new Date(a.date) - new Date(b.date));
      setSalesData(normalized);
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
        `/admin/daily-sales/${formattedDate}/details`
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

  const chartData = salesData.map((d) => ({
    date: format(new Date(d.date), "MMM dd"),
    fullDate: format(new Date(d.date), "yyyy-MM-dd"),
    total_sales: d.total_sales,
    total_profit: d.total_profit,
  }));

  return (
    <Box p={4}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2} spacing={2}>
        <Typography variant="h5">Daily Sales Report</Typography>

        <Stack direction="row" spacing={1} alignItems="center">
          <ToggleButtonGroup
            value={view}
            exclusive
            onChange={(_, v) => v && setView(v)}
            size="small"
          >
            <ToggleButton value="table">Table</ToggleButton>
            <ToggleButton value="chart">Chart</ToggleButton>
          </ToggleButtonGroup>

          {view === "chart" && (
            <>
              <ToggleButtonGroup
                value={metric}
                exclusive
                onChange={(_, v) => v && setMetric(v)}
                size="small"
              >
                <ToggleButton value="sales">Sales</ToggleButton>
                <ToggleButton value="profit">Profit</ToggleButton>
                <ToggleButton value="both">Both</ToggleButton>
              </ToggleButtonGroup>

              <ToggleButtonGroup
                value={chartType}
                exclusive
                onChange={(_, v) => v && setChartType(v)}
                size="small"
              >
                <ToggleButton value="line">Line</ToggleButton>
                <ToggleButton value="bar">Bar</ToggleButton>
              </ToggleButtonGroup>
            </>
          )}
        </Stack>
      </Stack>

      <Divider sx={{ mb: 2 }} />

      {loading ? (
        <Typography>
          <LuLoaderCircle className="animate-spin" /> Loading...
        </Typography>
      ) : (
        <>
          {view === "chart" ? (
            <Card>
              <CardContent>
                <Typography variant="subtitle1" gutterBottom>
                  {metric === "sales"
                    ? "Daily Total Sales"
                    : metric === "profit"
                    ? "Daily Total Profit"
                    : "Daily Sales & Profit"}
                </Typography>

                <Box sx={{ height: 360, width: "100%" }}>
                  <ResponsiveContainer>
                    {chartType === "line" ? (
                      <LineChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                        <YAxis />
                        <Tooltip
                          formatter={(val) =>
                            typeof val === "number" ? currencyFormatter.format(val) : val
                          }
                        />
                        <Legend />
                        {(metric === "sales" || metric === "both") && (
                          <Line
                            type="monotone"
                            dataKey="total_sales"
                            name="Sales"
                            stroke="#3f51b5"
                            strokeWidth={2}
                            dot={{ r: 3 }}
                          />
                        )}
                        {(metric === "profit" || metric === "both") && (
                          <Line
                            type="monotone"
                            dataKey="total_profit"
                            name="Profit"
                            stroke="#ff6f00"
                            strokeWidth={2}
                            dot={{ r: 3 }}
                          />
                        )}
                      </LineChart>
                    ) : (
                      <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                        <YAxis />
                        <Tooltip
                          formatter={(val) =>
                            typeof val === "number" ? currencyFormatter.format(val) : val
                          }
                        />
                        <Legend />
                        {(metric === "sales" || metric === "both") && (
                          <Bar dataKey="total_sales" name="Sales" fill="#3f51b5" />
                        )}
                        {(metric === "profit" || metric === "both") && (
                          <Bar dataKey="total_profit" name="Profit" fill="#ff6f00" />
                        )}
                      </BarChart>
                    )}
                  </ResponsiveContainer>
                </Box>

                <Box mt={2} display="flex" gap={2} flexWrap="wrap">
                  <Typography variant="body2">
                    Total days: <strong>{salesData.length}</strong>
                  </Typography>
                  <Typography variant="body2">
                    Sum Sales:{" "}
                    <strong>
                      {currencyFormatter.format(
                        salesData.reduce((s, cur) => s + Number(cur.total_sales || 0), 0)
                      )}
                    </strong>
                  </Typography>
                  <Typography variant="body2">
                    Sum Profit:{" "}
                    <strong>
                      {currencyFormatter.format(
                        salesData.reduce((s, cur) => s + Number(cur.total_profit || 0), 0)
                      )}
                    </strong>
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          ) : (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                    <TableCell />
                    <TableCell sx={{ fontWeight: "bold" }}>Date</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Total Sales</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Total Profit</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {salesData.map((data) => {
                    const formattedDate = format(new Date(data.date), "yyyy-MM-dd");

                    return (
                      <React.Fragment key={formattedDate}>
                        <TableRow hover>
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
                          <TableCell>
                            {(Number(data.total_sales) || 0)}
                          </TableCell>
                          <TableCell>
                            {currencyFormatter.format(Number(data.total_profit) || 0)}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell colSpan={4} sx={{ paddingBottom: 0, paddingTop: 0 }}>
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
                                          <TableCell>{product.product_name}</TableCell>
                                          <TableCell>
                                            {numberFormatter.format(product.quantity_sold)}
                                          </TableCell>
                                          <TableCell>
                                            {currencyFormatter.format(product.total_price)}
                                          </TableCell>
                                          <TableCell>{product.sold_by}</TableCell>
                                        </TableRow>
                                      ))}
                                    </TableBody>
                                  </Table>
                                ) : (
                                  <Typography>
                                    <LuLoaderCircle className="animate-spin" /> Loading...
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
        </>
      )}
    </Box>
  );
};

export default DailySales;
