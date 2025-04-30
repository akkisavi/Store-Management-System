import React, { useEffect, useState } from "react";
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
  Button,
} from "@mui/material";
import { Delete, Edit, Save, Cancel } from "@mui/icons-material";

const DeleteEmployee = () => {
  const [employees, setEmployees] = useState([]);
  const [editRowId, setEditRowId] = useState(null);
  const [editData, setEditData] = useState({ name: "", role: "" });

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axiosInstance.get("/api/admin/allEmployees");
      setEmployees(response.data);
    } catch (error) {
      toast.error("Failed to fetch employees");
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/api/admin/employee/${id}`);
      toast.success("Employee deleted");
      fetchEmployees();
    } catch (error) {
      toast.error("Failed to delete employee");
      console.error(error);
    }
  };

  const handleEditClick = (employee) => {
    setEditRowId(employee.id);
    setEditData({ name: employee.name, role: employee.role });
  };

  const handleSave = async (id) => {
    try {
      await axiosInstance.put(`/api/admin/update-employee/${id}`, editData);
      toast.success("Employee updated");
      setEditRowId(null);
      fetchEmployees();
    } catch (error) {
      toast.error("Failed to update employee");
      console.error(error);
    }
  };

  return (
    <Box p={3}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow
              sx={{
                backgroundColor: "#b5b5b5",
              }}
            >
              <TableCell sx={{ fontWeight: "bold" }}>Employee ID</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Employee Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Role</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Last Activity</TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="right">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((emp) => (
              <TableRow key={emp.id}>
                <TableCell>{emp.id}</TableCell>
                <TableCell>
                  {editRowId === emp.id ? (
                    <TextField
                      value={editData.name}
                      onChange={(e) =>
                        setEditData({ ...editData, name: e.target.value })
                      }
                      size="small"
                    />
                  ) : (
                    emp.name
                  )}
                </TableCell>
                <TableCell>
                  {editRowId === emp.id ? (
                    <Select
                      value={editData.role}
                      onChange={(e) =>
                        setEditData({ ...editData, role: e.target.value })
                      }
                      size="small"
                    >
                      <MenuItem value="manager">Manager</MenuItem>
                      <MenuItem value="employee">Employee</MenuItem>
                    </Select>
                  ) : (
                    emp.role
                  )}
                </TableCell>
                <TableCell>
                  {new Date(emp.last_activity).toLocaleString()}
                </TableCell>
                <TableCell align="right">
                  {editRowId === emp.id ? (
                    <>
                      <IconButton onClick={() => handleSave(emp.id)}>
                        <Save />
                      </IconButton>
                      <IconButton onClick={() => setEditRowId(null)}>
                        <Cancel />
                      </IconButton>
                    </>
                  ) : (
                    <>
                      <IconButton onClick={() => handleEditClick(emp)}>
                        <Edit />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(emp.id)}>
                        <Delete />
                      </IconButton>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default DeleteEmployee;
