import { Button } from "@mui/material";
import React, { useState } from "react";
import styles from "./UserContent.module.css";
import UserOrderModal from "../UserOrderModal/UserOrderModal";

const UserContent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div>
      <Button
        className={styles.orderBtn}
        variant="outlined"
        onClick={handleOpenModal}
      >
        Make an Order
      </Button>
      <UserOrderModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default UserContent;
