import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Greetings = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("token");

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/"); // Redirect to main page if logged in
    }
  }, [isLoggedIn, navigate]);

  // Define styles as JavaScript objects
  const styles = {
    homeContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      padding: "20px",
      backgroundColor: "#f8f9fa",
    },
    buttonsContainer: {
      marginTop: "20px",
    },
    btn: {
      textDecoration: "none",
      color: "white",
      backgroundColor: "#007bff",
      padding: "10px 20px",
      margin: "0 10px",
      borderRadius: "5px",
      transition: "background-color 0.3s",
    },
    loginBtn: {
      backgroundColor: "#28a745",
      ":hover": {
        backgroundColor: "#218838",
      },
    },
    signupBtn: {
      backgroundColor: "#17a2b8",
      ":hover": {
        backgroundColor: "#138496",
      },
    },
  };

  // Combine base btn style with specific button styles
  const loginBtnStyle = { ...styles.btn, ...styles.loginBtn };
  const signupBtnStyle = { ...styles.btn, ...styles.signupBtn };

  return (
    <div style={styles.homeContainer}>
      <h1>Welcome to the Online Quiz </h1>
      <p>Get ready to test your knowledge and challenge yourself!</p>
      <div style={styles.buttonsContainer}>
        <Link to="/login" style={loginBtnStyle}>
          Login
        </Link>
        <Link to="/register" style={signupBtnStyle}>
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Greetings;
