import React, { useState } from "react";

const RegisterPage = () => {
  // State to manage form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  // State to manage errors
  const [errors, setErrors] = useState([]);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Array to store error messages
    const fieldErrors = [];
    // Check if any of the form fields are empty
    if (!formData.name) {
      fieldErrors.push("Name is required");
    }
    if (!formData.email) {
      fieldErrors.push("Email is required");
    }
    if (!formData.password) {
      fieldErrors.push("Password is required");
    }
    if (!formData.confirm_password) {
      fieldErrors.push("Confirm password is required");
    }
    // If there are field errors, set them in the state and return
    if (fieldErrors.length > 0) {
      setErrors(fieldErrors.map((msg, index) => ({ id: index, msg })));
      return;
    }
    // Make a fetch request to the server endpoint for registration
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_HOSTNAME}/user/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        // If there are errors, set them in the state
        setErrors(data.errors || []);
      } else {
        // Handle successful registration (e.g., redirect)
        console.log("User registered successfully");
        alert("registration successful");
        window.location.href = "/login";
      }
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  // Function to handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "0 auto",
        padding: "20px",
        backgroundColor: "white",
        borderRadius: "5px",
      }}
    >
      {/* Display errors */}
      {errors.length > 0 && (
        <div style={{ marginBottom: "10px" }}>
          {errors.map((error) => (
            <p key={error.id} style={{ color: "red", margin: "5px 0" }}>
              {error.msg}
            </p>
          ))}
        </div>
      )}
      <h1 style={{ textAlign: "center" }}>Register</h1>
      {/* Registration form */}
      <form onSubmit={handleSubmit}>
        {/* Name input */}
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            style={{ width: "100%", padding: "5px" }}
          />
        </div>
        {/* Email input */}
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={{ width: "100%", padding: "5px" }}
          />
        </div>
        {/* Password input */}
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            style={{ width: "100%", padding: "5px" }}
          />
        </div>
        {/* Confirm Password input */}
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="confirm_password">Confirm Password:</label>
          <input
            type="password"
            id="confirm_password"
            name="confirm_password"
            value={formData.confirm_password}
            onChange={handleChange}
            style={{ width: "100%", padding: "5px" }}
          />
        </div>
        {/* Submit button */}
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
