import { doc, updateDoc } from "@firebase/firestore";
import { Button, Modal, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { db } from "../../../firebase/firebase-config";
import styles from "./UserEditProfile.module.css";

const UserEditProfile = ({ isOpen, onClose, userData }) => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");

  useEffect(() => {
    if (userData) {
      setName(userData?.name);
      setSurname(userData?.surname);
    }
  }, [userData]);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleSurnameChange = (event) => {
    setSurname(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const updatedUserData = { ...userData, name, surname };
      await updateDoc(doc(db, "users", userData.id), updatedUserData);
      onClose();
      window.location.reload();
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "8px",
        }}
      >
        <h2 className={styles.header}>Edit User Profile</h2>
        <TextField
          label="Name"
          value={name}
          onChange={handleNameChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Surname"
          value={surname}
          onChange={handleSurnameChange}
          fullWidth
          margin="normal"
        />
        <div className={styles.btns}>
          <Button className={styles.btn} variant="outlined" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="outlined"
            className={styles.btn}
            onClick={handleSubmit}
          >
            Save Changes
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default UserEditProfile;
