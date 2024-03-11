import { Button, Modal } from "@mui/material";
import React, { useState } from "react";
import styles from "./UserProfile.module.css";
import UserEditProfile from "../UserEditProfile/UserEditProfile";

const UserProfile = ({ userData, setUserData, isOpen, onClose }) => {
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
          <h2 className={styles.header}>User Profile Details</h2>
          <p className={styles.text}>Name: {userData?.name}</p>
          <p className={styles.text}>Surname: {userData?.surname}</p>
          <p className={styles.text}>Email: {userData?.email}</p>
          {userData?.phoneNumber && (
            <p className={styles.text}>Phone Number: {userData?.phoneNumber}</p>
          )}
          {userData?.birthDate && (
            <p className={styles.text}>Birth Date: {userData?.birthDate}</p>
          )}
          {userData?.mainAddress && (
            <p className={styles.text}>Main Address: {userData?.mainAddress}</p>
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
              Edit
            </Button>
          </div>
        </div>
      </Modal>
      <UserEditProfile
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        userData={userData}
        setUserData={setUserData}
      />
    </>
  );
};

export default UserProfile;
