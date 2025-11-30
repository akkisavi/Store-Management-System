import React, { useEffect, useState, useMemo } from "react";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Select,
  MenuItem,
  IconButton,
  Avatar,
  Tooltip,
  Typography,
  Chip,
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
} from "@mui/material";
import { Delete, Edit, Save, Cancel, Search } from "@mui/icons-material";

const DeleteEmployee = () => {
  const [employees, setEmployees] = useState([]);
  const [editRowId, setEditRowId] = useState(null);
  const [editData, setEditData] = useState({ name: "", email: "", role: "" });
  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axiosInstance.get("/admin/allEmployees");
      console.debug("allEmployees response:", response.data);

      let data = response.data;
      let arr = [];

      if (Array.isArray(data)) {
        arr = data;
      } else if (data && Array.isArray(data.employees)) {
        arr = data.employees;
      } else if (data && Array.isArray(data.data)) {
        arr = data.data;
      } else {
        if (data && typeof data === "object") {
          const maybeArray = Object.values(data).filter((v) => v && typeof v === "object" && (v.id || v._id || v.email));
          if (maybeArray.length) arr = maybeArray;
        }
      }

      setEmployees(arr);
    } catch (error) {
      toast.error("Failed to fetch employees");
      console.error(error);
    }
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axiosInstance.delete(`/admin/employee/${deleteId}`);
      toast.success("Employee deleted");
      setConfirmOpen(false);
      setDeleteId(null);
      fetchEmployees();
    } catch (error) {
      toast.error("Failed to delete employee");
      console.error(error);
    }
  };

  const handleEditClick = (employee) => {
    const id = employee.id ?? employee._id ?? null;
    setEditRowId(id);
    setEditData({ name: employee.name ?? "", email: employee.email ?? "", role: employee.role ?? "" });
  };

  const handleSave = async (id) => {
    try {
      await axiosInstance.put(`/admin/update-employee/${id}`, editData);
      toast.success("Employee updated");
      setEditRowId(null);
      fetchEmployees();
    } catch (error) {
      toast.error("Failed to update employee");
      console.error(error);
    }
  };

  const filteredEmployees = useMemo(() => {
    if (!Array.isArray(employees)) return [];
    const q = search.trim().toLowerCase();
    if (!q) return employees;
    return employees.filter((e) => {
      const idStr = String(e.id ?? e._id ?? "");
      return (
        idStr.toLowerCase().includes(q) ||
        (e.name ?? "").toString().toLowerCase().includes(q) ||
        (e.email ?? "").toString().toLowerCase().includes(q) ||
        (e.role ?? "").toString().toLowerCase().includes(q)
      );
    });
  }, [employees, search]);

  return (
    <Box p={2}>
      <Paper sx={{ p: 2, borderRadius: 2, boxShadow: "none", border: "1px solid #eaeaea" }}>
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
          <Typography variant="h6" sx={{ fontWeight: 600, color: "text.primary" }}>
            Employees
          </Typography>

          <TextField
            size="small"
            variant="outlined"
            placeholder="Search by name, email, role or id"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              startAdornment: <Search fontSize="small" sx={{ mr: 1, color: "text.secondary" }} />,
            }}
            sx={{
              width: 320,
              "& .MuiOutlinedInput-root": {
                background: "#fafafa",
                borderRadius: 1,
                height: 36,
              },
            }}
          />
        </Box>

        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow sx={{ background: "transparent" }}>
                <TableCell sx={{ fontWeight: 600, color: "text.secondary" }}>ID</TableCell>
                <TableCell sx={{ fontWeight: 600, color: "text.secondary" }}>Name</TableCell>
                <TableCell sx={{ fontWeight: 600, color: "text.secondary" }}>Email</TableCell>
                <TableCell sx={{ fontWeight: 600, color: "text.secondary" }}>Role</TableCell>
                <TableCell sx={{ fontWeight: 600, color: "text.secondary" }}>Last Activity</TableCell>
                <TableCell align="right" sx={{ fontWeight: 600, color: "text.secondary" }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredEmployees.map((emp) => {
                const id = emp.id ?? emp._id ?? "";
                const initials =
                  typeof emp.name === "string" && emp.name.trim()
                    ? emp.name
                        .split(" ")
                        .map((n) => n[0] ?? "")
                        .slice(0, 2)
                        .join("")
                        .toUpperCase()
                    : "U";

                return (
                  <TableRow
                    key={id || Math.random()}
                    hover
                    sx={{
                      "&:hover": { backgroundColor: "#fbfbfb" },
                      borderRadius: 1,
                    }}
                  >
                    <TableCell sx={{ width: 80, color: "text.secondary" }}>{id}</TableCell>

                    <TableCell>
                      <Box display="flex" alignItems="center" gap={1}>
                        <Avatar sx={{ width: 32, height: 32, fontSize: 13, bgcolor: "#e0e0e0", color: "#444" }}>
                          {initials}
                        </Avatar>
                        <Box>
                          {editRowId === id ? (
                            <TextField
                              value={editData.name}
                              onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                              size="small"
                              variant="standard"
                              sx={{ input: { fontSize: 14 } }}
                            />
                          ) : (
                            <Typography sx={{ fontSize: 14 }}>{emp.name ?? "—"}</Typography>
                          )}
                        </Box>
                      </Box>
                    </TableCell>

                    <TableCell sx={{ color: "text.secondary" }}>
                      {editRowId === id ? (
                        <TextField
                          value={editData.email}
                          onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                          size="small"
                          variant="standard"
                          sx={{ input: { fontSize: 13 } }}
                        />
                      ) : (
                        <Typography sx={{ fontSize: 13, color: "text.secondary" }}>{emp.email ?? "—"}</Typography>
                      )}
                    </TableCell>

                    <TableCell>
                      {editRowId === id ? (
                        <Select
                          value={editData.role}
                          onChange={(e) => setEditData({ ...editData, role: e.target.value })}
                          size="small"
                          variant="standard"
                          sx={{ fontSize: 13 }}
                        >
                          <MenuItem value="manager">Manager</MenuItem>
                          <MenuItem value="employee">Employee</MenuItem>
                        </Select>
                      ) : (
                        <Chip
                          label={emp.role ?? "—"}
                          size="small"
                          variant="outlined"
                          sx={{
                            textTransform: "capitalize",
                            borderColor: "#e0e0e0",
                            color: "text.secondary",
                            fontSize: 12,
                          }}
                        />
                      )}
                    </TableCell>

                    <TableCell sx={{ color: "text.secondary", fontSize: 13 }}>
                      {emp.last_activity ? new Date(emp.last_activity).toLocaleString() : "—"}
                    </TableCell>

                    <TableCell align="right">
                      {editRowId === id ? (
                        <>
                          <Tooltip title="Save">
                            <IconButton size="small" onClick={() => handleSave(id)}>
                              <Save fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Cancel">
                            <IconButton size="small" onClick={() => setEditRowId(null)}>
                              <Cancel fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </>
                      ) : (
                        <>
                          <Tooltip title="Edit">
                            <IconButton size="small" onClick={() => handleEditClick(emp)}>
                              <Edit fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete">
                            <IconButton size="small" onClick={() => handleDeleteClick(id)} sx={{ color: "error.main" }}>
                              <Delete fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Confirm delete?</DialogTitle>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)} size="small">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="error" size="small">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DeleteEmployee;
