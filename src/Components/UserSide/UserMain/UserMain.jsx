import React, { useEffect, useState } from "react";
import UserHeader from "../UserHeader/UserHeader";
import { useParams } from "react-router";
import { collection, getDocs, query, where } from "@firebase/firestore";
import { db } from "../../../firebase/firebase-config";
import UserContent from "../UserContent/UserContent";
import UserAbout from "../UserAbout/UserAbout";
import UserContact from "../UserContact/UserContact";
import UserFooter from "../UserFooter/UserFooter";

const UserMain = () => {
  const { userID } = useParams();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const usersCollection = collection(db, "users");
        const q = query(usersCollection, where("id", "==", userID));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const userData = querySnapshot.docs[0].data();
          setUserData(userData);
        } else {
          console.log("User not found");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [userID]);
  console.log(userData);
  return (
    <div>
      <UserHeader userData={userData} setUserData={setUserData} />
      <UserContent setUserData={setUserData} userData={userData} />
      <UserAbout />
      <UserContact />
      <UserFooter />
    </div>
  );
};

export default UserMain;
