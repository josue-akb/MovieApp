import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Admin = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div>
      <h2>Dashboard Admin</h2>
      <p>Bienvenue !</p>
      <button onClick={logout}>Se déconnecter</button>
    </div>
  );
};

export default Admin;
