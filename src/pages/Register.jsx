import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!email.trim()) newErrors.email = "L'email est requis";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Format d'email invalide";

    if (password.length < 6) newErrors.password = "Le mot de passe doit contenir au moins 6 caractères";
    if (password !== confirmPassword) newErrors.confirmPassword = "Les mots de passe ne correspondent pas";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = existingUsers.find(user => user.email === email);

    if (userExists) {
      setErrors({ email: "Un utilisateur avec cet email existe déjà." });
      return;
    }

    const newUser = { email, password };
    localStorage.setItem("users", JSON.stringify([...existingUsers, newUser]));
    alert("Inscription réussie !");
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-100 flex justify-center items-center p-6">
      <div className="bg-white p-8 rounded shadow-md max-w-sm w-full">
        <h2 className="text-2xl font-bold text-center mb-6">Créer un compte</h2>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full mb-2 p-2 border rounded" />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

          <input type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full mb-2 p-2 border rounded" />
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

          <input type="password" placeholder="Confirmer le mot de passe" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full mb-4 p-2 border rounded" />
          {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}

          <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">S'inscrire</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
