import React from "react";

const AdminHomePage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-bold mb-4">Welcome Admin</h1>
        <p className="text-gray-600 mb-4">Manage your store efficiently.</p>
        <div className="space-y-3">
          <button className="w-full bg-blue-500 text-white py-2 rounded">Add Employee</button>
          <button className="w-full bg-blue-500 text-white py-2 rounded">Delete Employee</button>
          <button className="w-full bg-blue-500 text-white py-2 rounded">Daily Sales</button>
          <button className="w-full bg-blue-500 text-white py-2 rounded">Profit Overview</button>
        </div>
      </div>
    </div>
  );
};

export default AdminHomePage;
