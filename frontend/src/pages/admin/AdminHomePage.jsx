import React, { useState, useEffect } from 'react';
import { Button, TextField, Typography, Box } from '@mui/material';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { axiosInstance } from './../../lib/axios';

const AdminDashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [newEmployee, setNewEmployee] = useState({ name: '', email: '', password: '', role: '' });
  const [salesData, setSalesData] = useState([]);
  
  const handleAddEmployee = async () => {
    try {
      const response = await axiosInstance.post('/api/admin/add-employee', newEmployee);
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong');
    }
  };

  const fetchSalesData = async () => {
    try {
      const response = await axios.get('/api/admin/daily-sales');
      if (Array.isArray(response.data)) {
        setSalesData(response.data);
      } else {
        setSalesData([]);
        toast.error('Sales data format is incorrect');
      }
    } catch (error) {
      toast.error('Failed to fetch sales data');
      console.error(error);
    }
  };

  // Fetch Employees
  const fetchEmployees = async () => {
    try {
      const response = await axios.get('/api/admin/employees');
      setEmployees(response.data);
    } catch (error) {
      toast.error('Failed to fetch employees');
      console.error(error);
    }
  };

  useEffect(() => {
    fetchSalesData();
    fetchEmployees();
  }, []);

  return (
    <Box>
      <Typography variant="h4">Admin Dashboard</Typography>

      {/* Add Employee Form */}
      <Box>
        <TextField label="Name" value={newEmployee.name} onChange={e => setNewEmployee({ ...newEmployee, name: e.target.value })} />
        <TextField label="Email" value={newEmployee.email} onChange={e => setNewEmployee({ ...newEmployee, email: e.target.value })} />
        <TextField label="Password" type="password" value={newEmployee.password} onChange={e => setNewEmployee({ ...newEmployee, password: e.target.value })} />
        <TextField label="Role" value={newEmployee.role} onChange={e => setNewEmployee({ ...newEmployee, role: e.target.value })} />
        <Button onClick={handleAddEmployee}>Add Employee</Button>
      </Box>

      {/* Sales Report */}
      <Box>
        <Typography variant="h6">Daily Sales</Typography>
        {Array.isArray(salesData) && salesData.length > 0 ? (
          <ul>
            {salesData.map((data, index) => (
              <li key={index}>{data.date}: {data.total_sales} sales, ${data.total_profit} profit</li>
            ))}
          </ul>
        ) : (
          <Typography>No sales data available</Typography>
        )}
      </Box>
    </Box>
  );
};

export default AdminDashboard;
