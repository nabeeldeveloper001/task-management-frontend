import { useState, useEffect } from "react";

const useAuthCheck = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("authToken"));

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsAuthenticated(!!token);
  }, []);

  return isAuthenticated;
};

export default useAuthCheck;
