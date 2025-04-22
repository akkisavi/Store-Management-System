import React from "react";

const EmployeeHomePage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-bold mb-4">Welcome Employee</h1>
        <p className="text-gray-600 mb-4">Let’s start working!</p>
        <div className="space-y-3">
          <button className="w-full bg-green-500 text-white py-2 rounded">Add Product</button>
          <button className="w-full bg-green-500 text-white py-2 rounded">Sell Product</button>
          <button className="w-full bg-green-500 text-white py-2 rounded">Generate Bill</button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeHomePage;
