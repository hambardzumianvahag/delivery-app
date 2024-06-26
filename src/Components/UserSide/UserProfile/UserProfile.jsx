import { Button, Modal } from "@mui/material";
import React, { useState } from "react";
import styles from "./UserProfile.module.css";
import UserEditProfile from "../UserEditProfile/UserEditProfile";

const UserProfile = ({ userData, setUserData, isOpen, onClose, language }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const handleOpenEditModal = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };
  return (
    <>
      <Modal open={isOpen} onClose={onClose}>
        <div className={styles.container}>
          <span className={styles.close} onClick={onClose}>
            &#10005;
          </span>
          <h2 className={styles.header}>
            {language === "English"
              ? "User Profile Details"
              : "Օգտատիրոջ տվյալների մանրամասներ"}
          </h2>
          <p className={styles.text}>
            {language === "English" ? "Name: " : "Անուն։ "}
            {userData?.name}
          </p>
          <p className={styles.text}>
            {" "}
            {language === "English" ? "Surname: " : "Ազգանուն։ "}
            {userData?.surname}
          </p>
          <p className={styles.text}>
            {" "}
            {language === "English" ? "Email: " : "Էլ.փոստ։ "}
            {userData?.email}
          </p>
          {userData?.phoneNumber && (
            <p className={styles.text}>
              {" "}
              {language === "English" ? "Phone Number: " : "Հեռախոսահամար։ "}
              {userData?.phoneNumber}
            </p>
          )}
          {userData?.birthDate && (
            <p className={styles.text}>
              {" "}
              {language === "English" ? "Birth Date: " : "Ծննդյան ամսաթիվ։ "}
              {userData?.birthDate}
            </p>
          )}
          {userData?.mainAddress && (
            <p className={styles.text}>
              {language === "English" ? "Main Address: " : "Հիմնական հասցե։ "}
              {userData?.mainAddress}
            </p>
          )}
          <div className={styles.btns}>
            <Button
              className={styles.btn}
              variant="outlined"
              onClick={handleOpenEditModal}
              sx={{
                borderColor: "#fdc72d",
                color: "#fdc72d",
                "&:hover": {
                  backgroundColor: "#fdc72d",
                  borderColor: "#fdc72d",
                  color: "black",
                },
              }}
            >
              {language === "English" ? "Edit" : "Փոփոխել"}
            </Button>
          </div>
        </div>
      </Modal>
      <UserEditProfile
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        userData={userData}
        setUserData={setUserData}
        language={language}
      />
    </>
  );
};

export default UserProfile;
