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
  CircularProgress,
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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const valid =
    newEmployee.name.trim() &&
    newEmployee.email.trim() &&
    newEmployee.password.trim() &&
    newEmployee.role;

  const handleAddEmployee = async (e) => {
    e?.preventDefault();
    if (!valid) return toast.error("Please fill all fields");
    try {
      setIsSubmitting(true);
      const response = await axiosInstance.post(
        "/admin/add-employee",
        newEmployee
      );
      toast.success(response.data.message);
      setNewEmployee({ name: "", email: "", password: "", role: "" });
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleAddEmployee}
      autoComplete="off"
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="80vh"
      bgcolor="#f4f5f7"
      px={2}
    >
      <Card
        sx={{
          width: 360,
          borderRadius: 2,
          boxShadow: "none",
          border: "1px solid rgba(16,24,40,0.06)",
          background: "#fff",
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Typography
            variant="h6"
            fontWeight={600}
            textAlign="center"
            mb={2}
            color="text.primary"
          >
            Add Employee
          </Typography>

          <Box display="flex" flexDirection="column" gap={1.25}>
            <TextField
              label="Name"
              placeholder="John Doe"
              autoComplete="name"
              value={newEmployee.name}
              size="small"
              onChange={(e) =>
                setNewEmployee({ ...newEmployee, name: e.target.value })
              }
              fullWidth
              variant="outlined"
            />

            <TextField
              label="Email"
              placeholder="john@example.com"
              autoComplete="email"
              value={newEmployee.email}
              size="small"
              onChange={(e) =>
                setNewEmployee({ ...newEmployee, email: e.target.value })
              }
              fullWidth
              variant="outlined"
            />

            <TextField
              label="Password"
              placeholder="••••••••"
              type="password"
              autoComplete="new-password"
              value={newEmployee.password}
              size="small"
              onChange={(e) =>
                setNewEmployee({ ...newEmployee, password: e.target.value })
              }
              fullWidth
              variant="outlined"
            />

            <FormControl fullWidth size="small">
              <InputLabel id="role-label">Role</InputLabel>
              <Select
                labelId="role-label"
                value={newEmployee.role}
                label="Role"
                onChange={(e) =>
                  setNewEmployee({ ...newEmployee, role: e.target.value })
                }
                variant="outlined"
              >
                <MenuItem value="manager">Manager</MenuItem>
                <MenuItem value="employee">Employee</MenuItem>
              </Select>
            </FormControl>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              size="medium"
              disabled={!valid || isSubmitting}
              sx={{
                mt: 1,
                borderRadius: 1.5,
                textTransform: "none",
                height: 42,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {isSubmitting ? (
                <CircularProgress size={18} color="inherit" />
              ) : (
                <>
                  <IoIosAddCircleOutline style={{ marginRight: 8 }} />
                  Add Employee
                </>
              )}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AddEmployee;
