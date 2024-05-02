import React, { useEffect, useState } from "react";
import UserHeader from "../UserHeader/UserHeader";
import { useParams } from "react-router";
import { collection, getDocs, query, where } from "@firebase/firestore";
import { db } from "../../../firebase/firebase-config";
import UserContent from "../UserContent/UserContent";
import UserAbout from "../UserAbout/UserAbout";
import UserContact from "../UserContact/UserContact";
import UserFooter from "../UserFooter/UserFooter";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import styles from "./UserMain.module.css";

const UserMain = () => {
  const { userID } = useParams();
  const [userData, setUserData] = useState(null);
  const [userOrders, setUserOrders] = useState([]);
  const [language, setLanguage] = useState("English");

  const handleClick = () => {
    window.location.href = "tel:+37444470818"; 
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const usersCollection = collection(db, "users");
        const userQuery = query(usersCollection, where("id", "==", userID));
        const userQuerySnapshot = await getDocs(userQuery);

        if (!userQuerySnapshot.empty) {
          const userData = userQuerySnapshot.docs[0].data();
          setUserData(userData);
        } else {
          console.log("User not found");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    const fetchUserOrders = async () => {
      try {
        const ordersCollection = collection(db, "orders");
        const ordersQuery = query(
          ordersCollection,
          where("userId", "==", userID)
        );
        const ordersQuerySnapshot = await getDocs(ordersQuery);

        if (!ordersQuerySnapshot.empty) {
          const ordersData = ordersQuerySnapshot.docs.map((doc) => doc.data());
          setUserOrders(ordersData);
        } else {
          console.log("No orders found for this user");
        }
      } catch (error) {
        console.error("Error fetching user orders:", error);
      }
    };

    fetchUserData();
    fetchUserOrders();
  }, [userID]);

  return (
    <div>
      <UserHeader
        setUserOrders={setUserOrders}
        userOrders={userOrders}
        userData={userData}
        setUserData={setUserData}
        language={language}
        setLanguage={setLanguage}
      />
      <UserContent
        userOrders={userOrders}
        setUserData={setUserData}
        setUserOrders={setUserOrders}
        userData={userData}
        language={language}
      />
      <div className={styles.support} onClick={handleClick}>
        <ContactSupportIcon style={{ fontSize: "50" }} />
      </div>
      <UserAbout language={language} />
      <UserContact language={language} />
      <UserFooter language={language} />
    </div>
  );
};

export default UserMain;
