import React, { useEffect, useState } from "react";
import CourierHeader from "../CourierHeader/CourierHeader";
import PendingOrders from "../PendingOrders/PendingOrders";
import { useParams } from "react-router";
import { collection, getDocs, query, where } from "@firebase/firestore";
import { db } from "../../../firebase/firebase-config";
import styles from "./CourierMain.module.css";

const CourierMain = () => {
  const { userID } = useParams();
  const courierId = userID;
  const [courierData, setCourierData] = useState(null);
  const [courierOrders, setCourierOrders] = useState([]);
  const [language, setLanguage] = useState("English");
  useEffect(() => {
    const fetchCourierData = async () => {
      try {
        const couriersCollection = collection(db, "couriers");
        const courierQuery = query(
          couriersCollection,
          where("id", "==", courierId)
        );
        const courierQuerySnapshot = await getDocs(courierQuery);

        if (!courierQuerySnapshot.empty) {
          const data = courierQuerySnapshot.docs[0].data();
          setCourierData(data);
        } else {
          console.log("Courier not found");
        }
      } catch (error) {
        console.error("Error fetching courier data:", error);
      }
    };

    const fetchPendingOrders = async () => {
      try {
        const ordersCollection = collection(db, "orders");
        const ordersQuery = query(
          ordersCollection,
          where("courierId", "==", courierId)
        );
        const ordersQuerySnapshot = await getDocs(ordersQuery);

        if (!ordersQuerySnapshot.empty) {
          const ordersData = ordersQuerySnapshot.docs.map((doc) => doc.data());
          setCourierOrders(ordersData);
        } else {
          console.log("No pending orders found for this courier");
        }
      } catch (error) {
        console.error("Error fetching pending orders:", error);
      }
    };

    fetchCourierData();
    fetchPendingOrders();
  }, [courierId]);

  return (
    <div className={styles.courierMain}>
      <CourierHeader
        courierData={courierData}
        setCourierData={setCourierData}
        pendingOrders={courierOrders}
        language={language}
        setLanguage={setLanguage}
      />
      <PendingOrders language={language} setCourierOrders={setCourierOrders} />
    </div>
  );
};

export default CourierMain;
