import { useContext, useState } from "react";
import "./login.scss";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase"// Assurez-vous d'importer la référence à votre instance de base de données
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Correction de la variable navigate

  const { dispatch } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      // Authentification de l'utilisateur
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      // Récupérer les données de l'utilisateur depuis le backend
      const response = await fetch(`http://localhost:3000/admin/users/${user.uid}`);
      const userData = await response.json();
  const id=userData.id;
      console.log("Données utilisateur :", userData);
      dispatch({ type: "LOGIN_SUCCESS", payload: { user: userData, userId: id } });

      // Vérifier si l'utilisateur existe et a un rôle
      if (userData && userData.role) {
        const role = userData.role;
        console.log("Rôle de l'utilisateur :", role);
        // Rediriger l'utilisateur en fonction de son rôle
        if (role === "admin") {
          navigate("/template");
        } else if (role === "prof") {
          navigate(`/profile/${id}`);
        } else if (role === "etudiant") {
          navigate("/profile");
        } else {
          navigate("/dash");
        }
      } else {
        setError("Le rôle de l'utilisateur n'a pas été trouvé");
      }
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
      setError(true);
    }
  };
  
  

  return (
    <div style={{
      backgroundColor: '#c9d6ff',
      background: 'linear-gradient(to right, #e2e2e2, #c9d6ff)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      height: '100vh'
    }}>
      <div className="container">
        <div className="form-container sign-in">
          <form onSubmit={handleLogin}>
            <h1>Welcome back</h1>
            <input
              type="email"
              placeholder="Email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && (
              <span className='text-red-600 font-bold'>{error}</span>
            )}
            <button type="submit">
              Sign In
            </button>
          </form>
        </div>
        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-right">
              <h1>Hello, Friend!</h1>
              <p>Register with your personal details to use all of site features</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
