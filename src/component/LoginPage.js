import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const username = e.target.elements.username.value;
    const password = e.target.elements.password.value;

    setLoading(true);
    try {
      const res = await axios.post("https://web-production-036f.up.railway.app/auth/jwt/create/", {
        username,
        password,
      });

      const response = res.data;
      localStorage.setItem("access", response.access);
      login(); // Call the login function directly
      navigate("/");
      console.log("Login successful");
    } catch (error) {
      console.error("Error during login:", error.message);
      setError("Invalid username or password");
    }
    setLoading(false);
  };

  return (
    <div className="user-container">
      <div className="user-login">
        <form onSubmit={handleSubmit}>
          <input type="text" name="username" placeholder="Username" required />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
          />
          {error && <div className="error">{error}</div>}
          <button type="submit" disabled={loading} className="login-button">
            {loading ? "Logging in..." : "Login"}
          </button>
          <div className="login-link">
            <p>
              Don't have an account? <Link to="/register">Create one</Link>
            </p>
            <hr />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;


// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate, Link } from "react-router-dom";
// import { useAuth } from "../AuthContext";

// const Login = () => {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const { login } = useAuth();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const username = e.target.elements.username.value;
//     const password = e.target.elements.password.value;

//     setLoading(true);
//     try {
//       const res = await axios.post("http://127.0.0.1:8000/auth/jwt/create/", {
//         username,
//         password,
//       });

//       const response = res.data;
//       localStorage.setItem("access", response.access);
//       login(); // Call the login function directly
//       navigate("/");
//       console.log("Login successful");
//     } catch (error) {
//       console.error("Error during login:", error.message);
//       setError("Invalid username or password");
//     }
//     setLoading(false);
//   };

//   return (
//     <div className="user-container">
//       <div className="user-login">
//         <form onSubmit={handleSubmit}>
//           <input type="text" name="username" placeholder="Username" required />
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             required
//           />
//           {error && <div className="error">{error}</div>}
//           <button type="submit" disabled={loading} className="login-button">
//             {loading ? "Logging in..." : "Login"}
//           </button>
//           <div className="login-link">
//             <p>
//               Don't have an account? <Link to="/register">Create one</Link>
//             </p>
//             <hr />
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;
