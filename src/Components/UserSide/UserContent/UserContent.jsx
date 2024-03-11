import React, { useState } from "react";
import styles from "./UserContent.module.css";
import UserOrderModal from "../UserOrderModal/UserOrderModal";
import userContentImage from "../../../images/userContent.png";

const UserContent = ({ setUserData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.userContent}>
      <div className={styles.userContentText}>
        <h1>
          Order Products <br /> Faster Easier
        </h1>
        <p>
          Order your product any time <br /> and we will deliver it from point A{" "}
          <br />
          to point B on time
        </p>
        <button
          className={styles.orderBtn}
          variant="contained"
          onClick={handleOpenModal}
        >
          Make an Order
        </button>
      </div>
      <div className={styles.imageContainer}>
        <img src={userContentImage} alt="chbacec" />
      </div>

      <UserOrderModal
        setUserData={setUserData}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default UserContent;
