import { Button, IconButton, Input, InputAdornment } from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./SignIn.module.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "../../../firebase/firebase-config";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const fetchUserPosition = async (email) => {
    try {
      const usersCollection = collection(db, "users");
      const couriersCollection = collection(db, "couriers");

      // Query the users collection
      const usersQuery = query(usersCollection, where("email", "==", email));
      const usersSnapshot = await getDocs(usersQuery);

      // Query the couriers collection
      const couriersQuery = query(
        couriersCollection,
        where("email", "==", email)
      );
      const couriersSnapshot = await getDocs(couriersQuery);

      let userFound = false;

      // Check if the email belongs to a user
      usersSnapshot.forEach((doc) => {
        userFound = true;
        const userId = doc.id; // Assuming userID is stored as document ID in Firestore
        navigate(`/delivery-app/user/${userId}`);
      });

      // Check if the email belongs to a courier
      couriersSnapshot.forEach((doc) => {
        userFound = true;
        const courierId = doc.id; // Assuming courierID is stored as document ID in Firestore
        navigate(`/delivery-app/courier/${courierId}`);
      });

      if (!userFound) {
        setError("Login Error! Try again.");
      }
    } catch (error) {
      setError("Login Error! Try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    try {
      await signInWithEmailAndPassword(auth, email, password).then(
        (userCredentials) => {
          if (!userCredentials.user.emailVerified) {
            setError(
              "Please verify the email. We have sent an email verification to you"
            );
          } else {
            setError("");
            fetchUserPosition(email);
          }
        }
      );
    } catch (error) {
      setError("Login Error! Try again.");
    }
  };

  return (
    <div className={styles.signin}>
      <div className={styles.formContainer}>
        <h1 className={styles.title}>Login</h1>
        <form onSubmit={handleSubmit}>
          {error && <div className={styles.error}>{error}</div>}
          <div>
            <Input
              placeholder="Email"
              className={styles.inputField}
              type="email"
              name="email"
              autoComplete="email"
              value={formData.email || ""}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Input
              placeholder="Password"
              className={styles.inputField}
              autoComplete="password"
              value={formData.password || ""}
              onChange={handleInputChange}
              name="password"
              id="standard-adornment-password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </div>
          <div className={styles.div}></div>
          <div className={styles.div}>
            <Button type="submit" className={styles.button} variant="contained">
              Login
            </Button>
          </div>
          <div className={styles.div}>
            <Link to="/delivery-app/forgotpassword" className={styles.text}>
              <p className={styles.text}>Forgot Password?</p>
            </Link>
          </div>
          <div>
            <p>
              Need an account?{" "}
              <Link className={styles.text} to="/delivery-app/signup">
                Sign Up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
