import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "./auth/useAuthStore";
import toast from "react-hot-toast";

export default function ProtectedRoute({ children }) {
  const { isAdmin, isLoading, error, checkAdminStatus } = useAuthStore();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        await checkAdminStatus();
      } finally {
        if (mounted) setChecked(true);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [checkAdminStatus]);

  useEffect(() => {
    if (checked && error) {
      toast.error(`Access denied: ${error}`);
    }
  }, [checked, error]);

  if (!checked || isLoading) {
    return (
      <div style={{ padding: 24, textAlign: "center" }}>
        <h3>Checking permissions…</h3>
      </div>
    );
  }

  if (!isAdmin) {
    return <Navigate to="/employee" replace />;
  }

  return children;
}
