import { doc, updateDoc } from "@firebase/firestore";
import { Button, Modal, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { db } from "../../../firebase/firebase-config";
import styles from "./CourierEditModal.module.css";

const CourierEditModal = ({
  isOpen,
  onClose,
  courierData,
  setCourierData,
  language,
}) => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [birthDate, setBirthDate] = useState("");

  useEffect(() => {
    if (courierData) {
      setName(courierData?.name);
      setSurname(courierData?.surname);
      setPhoneNumber(courierData?.phoneNumber || "");
      setBirthDate(courierData?.birthDate || "");
    }
  }, [courierData]);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleSurnameChange = (event) => {
    setSurname(event.target.value);
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleBirthDateChange = (event) => {
    setBirthDate(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const updatedUserData = {
        ...courierData,
        name,
        surname,
        phoneNumber,
        birthDate,
      };

      await updateDoc(doc(db, "couriers", courierData.id), updatedUserData);
      onClose();
      setCourierData(updatedUserData);
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
        <h2 className={styles.header}>
          {language === "English"
            ? "Edit User Profile"
            : "Փոխել օգտատիրոջ տվյալները"}
        </h2>
        <TextField
          label={language === "English" ? "Name" : "Անուն"}
          value={name}
          onChange={handleNameChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label={language === "English" ? "Surname" : "Ազգանուն"}
          value={surname}
          onChange={handleSurnameChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label={language === "English" ? "Phone Number" : "Հեռախոսահամար"}
          type="number"
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label={language === "English" ? "Birth Date" : "Ծննդյան ամսաթիվ"}
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
            {language === "English"
              ? "Save Changes"
              : "Պահպանել Փոփոխությունները"}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default CourierEditModal;
