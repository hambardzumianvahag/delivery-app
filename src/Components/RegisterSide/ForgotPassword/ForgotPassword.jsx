import { Button, TextField } from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./ForgotPassword.module.css";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../../firebase/firebase-config";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("Check Your Email");
        navigate("/delivery-app");
      })
      .catch((error) => {
        alert("Something went wrong!");
      });
  };
  return (
    <div className={styles.main}>
      <Link to="/delivery-app">
        <Button variant="outlined">Back</Button>
      </Link>
      <div className={styles.container}>
        <div className={styles.forgot}>
          <h1 className={styles.title}>Forgot Password</h1>
          <form onSubmit={handleSubmit}>
            <div>
              <TextField
                name="email"
                className={styles.inputField}
                placeholder="Enter Your Email"
              />
            </div>
            <Button className={styles.button} type="submit" variant="contained">
              Reset Password
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
