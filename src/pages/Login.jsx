import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      login();
      navigate("/Dashboard");
    } else {
      setErrors({ general: "Email ou mot de passe incorrect." });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-indigo-200 via-purple-100 to-yellow-100 flex justify-center items-center p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h1 className="text-3xl font-bold text-center text-indigo-700 mb-6">Se connecter</h1>
        <form onSubmit={handleLogin}>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full mb-3 p-2 border rounded" />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mot de passe" className="w-full mb-3 p-2 border rounded" />
          {errors.general && <p className="text-red-500 text-sm mb-3">{errors.general}</p>}
          <button type="submit" className="w-full py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">Se connecter</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
