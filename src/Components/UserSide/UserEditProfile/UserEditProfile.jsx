import { doc, updateDoc } from "@firebase/firestore";
import { Button, Modal, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { db } from "../../../firebase/firebase-config";
import styles from "./UserEditProfile.module.css";

const UserEditProfile = ({ isOpen, onClose, userData, setUserData }) => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [mainAddress, setMainAddress] = useState("");
  const [birthDate, setBirthDate] = useState("");

  useEffect(() => {
    if (userData) {
      setName(userData?.name);
      setSurname(userData?.surname);
      setPhoneNumber(userData?.phoneNumber || "");
      setMainAddress(userData?.mainAddress || "");
      setBirthDate(userData?.birthDate || "");
    }
  }, [userData]);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleSurnameChange = (event) => {
    setSurname(event.target.value);
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleMainAddressChange = (event) => {
    setMainAddress(event.target.value);
  };

  const handleBirthDateChange = (event) => {
    setBirthDate(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const updatedUserData = {
        ...userData,
        name,
        surname,
        phoneNumber,
        mainAddress,
        birthDate,
      };

      await updateDoc(doc(db, "users", userData.id), updatedUserData);
      onClose();
      setUserData(updatedUserData);
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
        <span className={styles.close} onClick={onClose}>
          &#10005;
        </span>
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
        <TextField
          label="Phone Number"
          type="number"
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Main Address"
          value={mainAddress}
          onChange={handleMainAddressChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Birth Date"
          type="date"
          value={birthDate}
          onChange={handleBirthDateChange}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <div className={styles.btns}>
          <Button
            variant="outlined"
            className={styles.btn}
            onClick={handleSubmit}
            sx={{
              borderColor: "#fdc72d",
              height: "50px",
              margin: "10px 0",
              color: "#fdc72d",
              "&:hover": {
                backgroundColor: "#fdc72d",
                borderColor: "#fdc72d",
                color: "black",
              },
            }}
          >
            Save Changes
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default UserEditProfile;
