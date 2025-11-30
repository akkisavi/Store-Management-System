import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "./auth/useAuthStore"; 
import toast from "react-hot-toast";

export default function ProtectedRoute({ children }) {
  const { isAdmin, isLoading, error, checkAdminStatus } = useAuthStore();
  const [checked, setChecked] = useState(false);
  const location = useLocation();

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        await checkAdminStatus();
      } finally {
        if (mounted) setChecked(true);
      }
    })();
    return () => { mounted = false; };
  }, [checkAdminStatus]);

  if (!checked || isLoading) {
    return (
      <div style={{ padding: 24, textAlign: "center" }}>
        <h3>Checking permissions…</h3>
      </div>
    );
  }

  if (error) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  if (!isAdmin) {
    toast.error("Access denied: Admins only");
    return <Navigate to="/employee" />;
  }

  return children;
}
