import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

const Login = () => {
  // const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_HOSTNAME}/user/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.errors) {
          setErrors(errorData.errors.map((err) => err.msg));
        } else {
          throw new Error(errorData.msg || "An error occurred");
        }
        return;
      }

      const data = await response.json();
      const token = data.token;
      const name = data.name;
      localStorage.setItem("token", token);
      localStorage.setItem("name", name);
      console.log("Login successful");
      window.location.href = "/";
      // navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", background: "white" }}>
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {errors.length > 0 && (
        <ul>
          {errors.map((err, index) => (
            <li key={index}>{err}</li>
          ))}
        </ul>
      )}

      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: "10px" }}>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ marginLeft: "10px", padding: "5px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ marginLeft: "10px", padding: "5px" }}
          />
        </div>

        <button
          type="submit"
          style={{
            padding: "5px 10px",
            backgroundColor: "blue",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
