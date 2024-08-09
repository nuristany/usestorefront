
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// function RegistrationForm() {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     password: "",
//     first_name: "",
//     last_name: "",
//     phone: "",
//     confirmPassword: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch("https://web-production-036f.up.railway.app/auth/users/", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });
//       if (!response.ok) {
//         throw new Error("Failed to register user");
//       }
//       // Registration successful
//       navigate("/");
//       console.log("User registered successfully");
//     } catch (error) {
//       console.error("Error registering user:", error.message);
//     }
//   };
//   return (
//     <div className="signup-container">
//       <div className="signup">
//         <form onSubmit={handleSubmit} className="signupForm">
//           <input
//             type="text"
//             name="username"
//             placeholder="Username"
//             value={formData.username}
//             onChange={handleChange}
//           />
//           <input
//             type="text"
//             name="first_name"
//             placeholder="First Name"
//             value={formData.first_name}
//             onChange={handleChange}
//           />
//           <input
//             type="text"
//             name="last_name"
//             placeholder="Last Name"
//             value={formData.last_name}
//             onChange={handleChange}
//           />
//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             value={formData.email}
//             onChange={handleChange}
//           />
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={formData.password}
//             onChange={handleChange}
//           />
//           <input
//             type="password"
//             name="confirmPassword"
//             placeholder="Confirm Password"
//             value={formData.confirmPassword}
//             onChange={handleChange}
//           />
//           <input
//             type="text"
//             name="phone"
//             placeholder="Contact Number"
//             value={formData.phone}
//             onChange={handleChange}
//           />
//           <button type="submit">Sign Up</button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default RegistrationForm;

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faPhone,
  faEnvelope,
  faLock,
} from "@fortawesome/free-solid-svg-icons"; // Import the user icon
import { useNavigate } from "react-router-dom";

function RegistrationForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    first_name: "",
    last_name: "",
    phone: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      //const accessToken = localStorage.getItem("access");
      const response = await fetch("https://django-rail-production-f714.up.railway.app/auth/users/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.detail || "Failed to register user");
      }
      // Registration successful
      navigate("/login");
      console.log("User registered successfully");
    } catch (error) {
      console.error("Error registering user:", error.message);
      setError(error.message);
    }
  };

  return (
    <div className="registration-container">
      <div className="wrapper">
        <h4>New To ibuy?</h4>
        <form onSubmit={handleSubmit}>
          {error && <div className="error">{error}</div>}
          <div className="input-box">
            <div className="input-field">
              <input
                type="text"
                placeholder="Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
              <FontAwesomeIcon icon={faUser} className="faUser" />
            </div>
            <div className="input-field">
              <input
                type="text"
                name="first_name"
                placeholder="First Name"
                value={formData.first_name}
                onChange={handleChange}
                required
              />
              <FontAwesomeIcon icon={faUser} className="faUser" />
            </div>
          </div>
          <div className="input-box">
            <div className="input-field">
              <input
                type="text"
                placeholder="Last Name"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                required
              />
              <FontAwesomeIcon icon={faUser} className="faUser" />
            </div>
            <div className="input-field">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <FontAwesomeIcon icon={faEnvelope} className="faUser" />
            </div>
          </div>
          <div className="input-box">
            <div className="input-field">
              <input
                type="number"
                placeholder="Mobile Number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
              <FontAwesomeIcon icon={faPhone} className="faUser" />
            </div>
            <div className="input-field">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <FontAwesomeIcon icon={faLock} className="faUser" />
            </div>
          </div>
          <div className="input-box">
            <div className="input-field">
              <input
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              <FontAwesomeIcon icon={faLock} className="faUser" />
            </div>
          </div>
          {/* Other input fields */}

          <label>
            <input type="checkbox" required /> I've read and accept the terms & condition
          </label>

          <button type="submit" className="btn">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegistrationForm;

