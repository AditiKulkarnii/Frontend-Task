import React from "react";
import AdminPanel from "../components/AdminPanel";

const AdminPage = () => {
  return (
    <div className="admin-page">
      <div className="wishlist-container justify-center bg-gray-100 mt-3" >
      <p className="text-blue-900 text-xl font-extrabold text-center ">Dashboard</p>
      <AdminPanel />
      </div>
    </div>
  );
};

export default AdminPage;
