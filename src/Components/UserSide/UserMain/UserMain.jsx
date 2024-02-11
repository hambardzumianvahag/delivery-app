import React, { useEffect, useState } from "react";
import UserHeader from "../UserHeader/UserHeader";
import { useParams } from "react-router";
import { collection, getDocs, query, where } from "@firebase/firestore";
import { db } from "../../../firebase/firebase-config";
import UserContent from "../UserContent/UserContent";

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

  return (
    <div>
      <UserHeader userData={userData} />
      <UserContent />
    </div>
  );
};

export default UserMain;
