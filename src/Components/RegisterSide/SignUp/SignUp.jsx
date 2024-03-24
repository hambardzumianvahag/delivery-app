import {
  Button,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./SignUp.module.css";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { auth, db } from "../../../firebase/firebase-config";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    confirmPassword: "",
    position: "",
  });
  const [isChecked, setIsChecked] = useState(false);

  const [error, setError] = useState(null);

  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const navigate = useNavigate();

  const validateForm = () => {
    const { name, surname, email, password, confirmPassword, position } =
      formData;
    const regexCapital = /[A-Z]/;
    const regexLowercase = /[a-z]/;
    const regexDigit = /[0-9]/;
    const regexSpecial = /[!@#$%^&*()_+\-=\[\]{}|:;"',.<>/?]/;

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
    if (!regexLowercase.test(password)) {
      setError("Password must contain at least 1 lowercase letter");
      return false;
    }
    if (!regexCapital.test(password)) {
      setError("Password must contain at least 1 uppercase letter");
      return false;
    }
    if (!regexDigit.test(password)) {
      setError("Password must contain at least 1 number");
      return false;
    }
    if (!regexSpecial.test(password)) {
      setError("Password must contain at least 1 symbol");
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
    if (!isChecked) {
      setError("Please Agree to the Terms & Conditions");
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
      // Reference to the "users" collection
      if (formData.position === "User") {
        const usersRef = doc(db, "users", userId);
        // Set user data in the "users" collection
        await setDoc(usersRef, {
          name: name,
          surname: surname,
          position: position,
          email: email,
          id: userId,
        });
      } else {
        // Reference to the "Couriers" collection
        const couriersRef = doc(db, "couriers", userId);
        // Set courier data in the "Couriers" collection
        await setDoc(couriersRef, {
          name: name,
          surname: surname,
          position: position,
          email: email,
          id: userId,
        });
      }
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
      await sendEmailVerification(auth.currentUser)
        .then(() => {
          console.log("Check Your Email");
        })
        .catch((error) => {
          console.log(error, "Something went wrong!");
        });
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
          <div className={styles.div}>
            <Input
              className={styles.inputField}
              placeholder="Name"
              type="text"
              name="name"
              autoComplete="name"
              value={formData.name || ""}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.div}>
            <Input
              placeholder="Surname"
              className={styles.inputField}
              type="text"
              name="surname"
              autoComplete="surname"
              value={formData.surname || ""}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.div}>
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
          <div className={styles.div}>
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
          <div className={styles.div}>
            <Input
              placeholder="Confirm Password"
              className={styles.inputField}
              autoComplete="new-password"
              name="confirmPassword"
              value={formData.confirmPassword || ""}
              onChange={handleInputChange}
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
          <div className={styles.bottomContainer}>
            <div className={styles.termsDiv}>
              <input
                checked={isChecked}
                onChange={() => setIsChecked(!isChecked)}
                type="checkbox"
              />{" "}
              <span
                className={styles.terms}
                onClick={() => setIsChecked(!isChecked)}
              >
                I Agree to the Terms & Conditions
              </span>
            </div>
            <div className={styles.selectDiv}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Select your position
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
          </div>
          <div className={styles.buttonDiv}>
            <Button type="submit" className={styles.button} variant="contained">
              Sign Up
            </Button>
          </div>
          <div className={styles.termsDiv}>
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
