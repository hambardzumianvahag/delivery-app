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
import styles from "./SignIn.module.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase-config";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase-config";

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    position: "",
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const fetchUserPosition = async (email) => {
    try {
      const usersCollection = collection(db, "users");
      const q = query(usersCollection, where("email", "==", email));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.size > 0) {
        querySnapshot.forEach((doc) => {
          const userPosition = doc.data().position;
          if (userPosition === formData.position) {
            const userId = doc.id; // Assuming userID is stored as document ID in Firestore
            if (email === "admin@gmail.com") {
              navigate("/delivery-app/admin");
            } else {
              navigate(`/delivery-app/user/${userId}`); // Navigate to /user/userID
            }
          } else {
            setError("Login Error! Try again.");
          }
        });
      } else {
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
      await signInWithEmailAndPassword(auth, email, password);
      fetchUserPosition(email);
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
              autoComplete="password"
              name="password"
              value={formData.password || ""}
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
              Login
            </Button>
          </div>
          <div className={styles.div}>
            <Link to="/delivery-app/verify" className={styles.text}>
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
