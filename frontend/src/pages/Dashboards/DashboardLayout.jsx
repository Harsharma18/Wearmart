import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import UserDashboardLayout from "./UserDashboardLayout";
import AdminDashboardLayout from "./AdminDashboardLayout";
import { Toaster } from "react-hot-toast";
function DashboardLayout() {
  const { user } = useSelector((state) => state.auth);

  const renderDashboard = () => {
    switch (user?.role) {
      case "user":
        return <UserDashboardLayout />;
      case "admin":
        return <AdminDashboardLayout />;
      default:
        return <Navigate to="/login" replace />;
    }
  };

  return (

    <div className="min-h-screen grid grid-cols-1 md:grid-cols-5 bg-gray-100">
     
      <aside className="col-span-1 md:col-span-1 bg-white border-r-gray-400 p-4 shadow-sm">
        {renderDashboard()}
      </aside>

     <Toaster/>
      <main className="col-span-1 md:col-span-4 p-4 md:p-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default DashboardLayout;
