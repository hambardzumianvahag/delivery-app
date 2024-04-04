import { Button, Modal } from "@mui/material";
import React, { useState } from "react";
import styles from "./CourierProfileModal.module.css";
import CourierEditModal from "../CourierEditModal/CourierEditModal";

const CourierProfileModal = ({
  openModal,
  onClose,
  courierData,
  language,
  setCourierData,
}) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const handleOpenEditModal = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  return (
    <>
      <Modal open={openModal} onClose={onClose}>
        <div className={styles.container}>
          <span className={styles.close} onClick={onClose}>
            &#10005;
          </span>
          <h2 className={styles.header}>
            {language === "English"
              ? "Courier Profile Details"
              : "Առաքիչի տվյալների մանրամասներ"}
          </h2>
          <p className={styles.text}>
            {language === "English" ? "Name: " : "Անուն։ "}
            {courierData?.name}
          </p>
          <p className={styles.text}>
            {" "}
            {language === "English" ? "Surname: " : "Ազգանուն։ "}
            {courierData?.surname}
          </p>
          <p className={styles.text}>
            {" "}
            {language === "English" ? "Email: " : "Էլ.փոստ։ "}
            {courierData?.email}
          </p>
          {courierData?.phoneNumber && (
            <p className={styles.text}>
              {" "}
              {language === "English" ? "Phone Number: " : "Հեռախոսահամար։ "}
              {courierData?.phoneNumber}
            </p>
          )}
          {courierData?.birthDate && (
            <p className={styles.text}>
              {" "}
              {language === "English" ? "Birth Date: " : "Ծննդյան ամսաթիվ։ "}
              {courierData?.birthDate}
            </p>
          )}
          {courierData?.mainAddress && (
            <p className={styles.text}>
              {language === "English" ? "Main Address: " : "Հիմնական հասցե։ "}
              {courierData?.mainAddress}
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
      <CourierEditModal
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        courierData={courierData}
        setCourierData={setCourierData}
        language={language}
      />
    </>
  );
};

export default CourierProfileModal;
