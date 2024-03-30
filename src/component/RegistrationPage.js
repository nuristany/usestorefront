import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function RegistrationForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    contact_number: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://web-production-036f.up.railway.app/auth/users/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Failed to register user");
      }
      // Registration successful
      navigate("/");
      console.log("User registered successfully");
    } catch (error) {
      console.error("Error registering user:", error.message);
    }
  };
  return (
    <div className="signup-container">
      <div className="signup">
        <form onSubmit={handleSubmit} className="signupForm">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
          />
          <input
            type="text"
            name="first_name"
            placeholder="First Name"
            value={formData.first_name}
            onChange={handleChange}
          />
          <input
            type="text"
            name="last_name"
            placeholder="Last Name"
            value={formData.last_name}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <input
            type="text"
            name="contact_number"
            placeholder="Contact Number"
            value={formData.contact_number}
            onChange={handleChange}
          />
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default RegistrationForm;
