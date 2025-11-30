import * as React from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/login/LoginPage.jsx";
import EmployeeHomePage from "./pages/employeehome/EmployeeHomePage.jsx";
import AdminHomePage from "./pages/admin/AdminHomePage.jsx";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/employee" or element={<EmployeeHomePage />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminHomePage />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
