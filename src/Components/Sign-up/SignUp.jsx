import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./SignUp.module.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase-config"; // Assuming you have Firestore in your Firebase project
import { db } from "../../firebase/firebase-config";
import { doc, setDoc } from "firebase/firestore";
const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    confirmPassword: "",
    position: "",
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const validateForm = () => {
    const { name, surname, email, password, confirmPassword, position } =
      formData;

    if (!name) {
      setError("Name is required");
      return false;
    }
    if (!surname) {
      setError("Surname is required");
      return false;
    }
    if (!email || !email.includes("@") || !email.includes(".")) {
      setError("Please enter a valid email address.");
      return false;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return false;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return false;
    }
    if (!position) {
      setError("Select your position");
      return false;
    }
    setError(null);
    return true;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const storeUserPositionInFirebase = async (
    userId,
    name,
    surname,
    email,
    position
  ) => {
    try {
      const userRef = doc(db, "users", userId);
      await setDoc(userRef, {
        name: name,
        surname: surname,
        position: position,
        email: email,
      });
    } catch (error) {
      console.error("Error storing user position in Firestore:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }
    const { email, password, position } = formData;

    try {
      const authUser = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setFormData({
        name: "",
        surname: "",
        email: "",
        password: "",
        confirmPassword: "",
        position: "",
      });
      setError(null);

      if (authUser.user) {
        await storeUserPositionInFirebase(
          authUser.user.uid,
          formData.name,
          formData.surname,
          formData.email,
          position
        );
      }

      navigate("/delivery-app");
    } catch (error) {
      setError("Error creating user account:");
    }
  };

  return (
    <div className={styles.signin}>
      <div className={styles.formContainer}>
        <h1 className={styles.title}>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          {error && <div className={styles.error}>{error}</div>}
          <div>
            <label>Name</label> <br />
            <TextField
              className={styles.inputField}
              type="text"
              name="name"
              autoComplete="name"
              value={formData.name || ""}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Surname</label> <br />
            <TextField
              className={styles.inputField}
              type="text"
              name="surname"
              autoComplete="surname"
              value={formData.surname || ""}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Email</label> <br />
            <TextField
              className={styles.inputField}
              type="email"
              name="email"
              autoComplete="email"
              value={formData.email || ""}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Password</label> <br />
            <TextField
              className={styles.inputField}
              type="password"
              name="password"
              autoComplete="new-password" // Suggested for password fields
              value={formData.password || ""}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Confirm Password</label> <br />
            <TextField
              className={styles.inputField}
              name="confirmPassword"
              type="password"
              autoComplete="new-password" // Suggested for password fields
              value={formData.confirmPassword || ""}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.div}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Choose your position
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Choose your position"
                value={formData.position || ""}
                name="position"
                onChange={handleInputChange}
              >
                <MenuItem value="User">User</MenuItem>
                <MenuItem value="Courier">Courier</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className={styles.div}>
            <Button type="submit" className={styles.button} variant="contained">
              Sign Up
            </Button>
          </div>
          <div>
            <p>
              Already have an account?{" "}
              <Link className={styles.text} to="/delivery-app">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
