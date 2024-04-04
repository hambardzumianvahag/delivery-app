import React, { useState } from "react";
import styles from "./UserContent.module.css";
import UserOrderModal from "../UserOrderModal/UserOrderModal";
import userContentImage from "../../../images/userContent.png";
import { ChakraProvider, theme } from "@chakra-ui/react";
const UserContent = ({ setUserData, userData, language, setUserOrders, userOrders }) => {
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
        {language === "English" ? (
          <h1>
            Order Products <br /> Faster Easier
          </h1>
        ) : (
          <h1>
            Պատվիրեք ապրանքներ <br /> Ավելի արագ և հեշտ
          </h1>
        )}
        {language === "English" ? (
          <p>
            Order your product any time <br /> and we will deliver it from point
            A <br />
            to point B on time
          </p>
        ) : (
          <p>
            Պատվիրեք ձեր ապրանքը ցանկացած ժամանակ <br /> և մենք այն կառաքենք A
            կետից <br />B կետ ժամանակին
          </p>
        )}

        <button
          className={styles.orderBtn}
          variant="contained"
          onClick={handleOpenModal}
        >
          {language === "English" ? "Make An Order" : "Կատարել Պատվեր"}
        </button>
      </div>
      <div className={styles.imageContainer}>
        <img src={userContentImage} alt="chbacec" />
      </div>

      <ChakraProvider theme={theme}>
        <UserOrderModal
          userOrders={userOrders}
          setUserOrders={setUserOrders}
          userData={userData}
          setUserData={setUserData}
          isOpen={isModalOpen}
          language={language}
          onClose={handleCloseModal}
        />
      </ChakraProvider>
    </div>
  );
};

export default UserContent;
