import * as React from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/login/LoginPage.jsx";
import EmployeeHomePage from "./pages/employeehome/EmployeeHomePage.jsx";
import AdminHomePage from "./pages/admin/AdminHomePage.jsx";
import {Toaster} from 'react-hot-toast'

function App() {
  return (
    <>
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/employee" or element={<EmployeeHomePage />} />
      <Route path="/" element={<EmployeeHomePage />} />
      <Route path="/admin" element={<AdminHomePage />} />
    </Routes>
    <Toaster/>
    </>
  );
}

export default App;
