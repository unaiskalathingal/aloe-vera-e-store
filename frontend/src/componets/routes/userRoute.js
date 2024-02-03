import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Navigate, Outlet } from "react-router-dom";
import axios from "axios";

export default function PrivateRoute() {
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      try {
        const res = await axios.get(
          "http://localhost:4000/api/v1/auth/user-auth"
        );
        if (res.data.ok) {
          setOk(true);
        } else {
          setOk(false);
        }
      } catch (error) {
        console.error("Error during authentication check:", error);
        setOk(false);
      } finally {
        setLoading(false);
      }
    };

    if (auth?.token) authCheck();
  }, [auth?.token]);

  if (loading) { 
    return <div>Please wait...</div>;
  }

  return ok ? <Outlet /> : <Navigate to="/login" />;
}
