import { Button, Modal } from "@mui/material";
import React, { useState } from "react";
import styles from "./UserProfile.module.css";
import UserEditProfile from "../UserEditProfile/UserEditProfile";

const UserProfile = ({ userData, isOpen, onClose }) => {
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
          <h2 className={styles.header}>User Profile Details</h2>
          <p className={styles.text}>Name: {userData?.name}</p>
          <p className={styles.text}>Surname: {userData?.surname}</p>
          <p className={styles.text}>Email: {userData?.email}</p>
          <div className={styles.btns}>
          <Button className={styles.btn} variant="outlined" onClick={onClose}>
            Close
          </Button>
          <Button
            className={styles.btn}
            variant="outlined"
            onClick={handleOpenEditModal}
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
      />
    </>
  );
};

export default UserProfile;
