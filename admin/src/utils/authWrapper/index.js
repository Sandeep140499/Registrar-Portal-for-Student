import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../pages/auth/hook/useAuth";

const AuthWrapper = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user && location.pathname === "/") {
      navigate("/dashboard", { replace: true });
    }
  }, [user, location, navigate]);

  return children;
};

export default AuthWrapper;
