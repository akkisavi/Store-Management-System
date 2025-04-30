import React, { useState } from "react";
import { axiosInstance } from "../lib/axios";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import toast from "react-hot-toast";
import { IoIosAddCircleOutline } from "react-icons/io";

const AddEmployee = () => {
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const handleAddEmployee = async () => {
    try {
      const response = await axiosInstance.post(
        "/api/admin/add-employee",
        newEmployee
      );
      toast.success(response.data.message);
      setNewEmployee({
        name: "",
        email: "",
        password: "",
        role: "",
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <Box
      component="form"
      autoComplete="off"
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="80vh"
      bgcolor="#ffff99"
    >
      <Card sx={{ width: 400, padding: 3, boxShadow: 4, borderRadius: 4 }}>
        <CardContent>
          <Typography
            variant="h5"
            fontWeight="bold"
            textAlign="center"
            mb={3}
            gutterBottom
          >
            Add Employee
          </Typography>
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              label="Name"
              autoComplete="new-name"
              value={newEmployee.name}
              onChange={(e) =>
                setNewEmployee({ ...newEmployee, name: e.target.value })
              }
              fullWidth
            />
            <TextField
              label="Email"
              autoComplete="new-email"
              value={newEmployee.email}
              onChange={(e) =>
                setNewEmployee({ ...newEmployee, email: e.target.value })
              }
              fullWidth
            />
            <TextField
              label="Password"
              type="password"
              autoComplete="new-password"
              value={newEmployee.password}
              onChange={(e) =>
                setNewEmployee({ ...newEmployee, password: e.target.value })
              }
              fullWidth
            />
            <FormControl fullWidth>
              <InputLabel id="role-label">Role</InputLabel>
              <Select
                labelId="role-label"
                value={newEmployee.role}
                label="Role"
                onChange={(e) =>
                  setNewEmployee({ ...newEmployee, role: e.target.value })
                }
              >
                <MenuItem value="manager">Manager</MenuItem>
                <MenuItem value="employee">Employee</MenuItem>
              </Select>
            </FormControl>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={handleAddEmployee}
              sx={{ marginTop: 2 }}
              startIcon={<IoIosAddCircleOutline />}
            >
              Add Employee
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AddEmployee;
