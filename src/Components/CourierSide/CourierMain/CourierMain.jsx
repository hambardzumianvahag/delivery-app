import React, { useEffect, useState } from "react";
import CourierHeader from "../CourierHeader/CourierHeader";
import PendingOrders from "../PendingOrders/PendingOrders";
import { useParams } from "react-router";
import {
  collection,
  getDocs,
  query,
  updateDoc,
  where,
} from "@firebase/firestore";
import { db } from "../../../firebase/firebase-config";
import styles from "./CourierMain.module.css";
import ProcessingOrders from "../ProcessingOrders/ProcessingOrders";
import FinishingOrders from "../FinishingOrders/FinishingOrders";

const CourierMain = () => {
  const { userID } = useParams();
  const courierId = userID;
  const [courierData, setCourierData] = useState(null);
  const [courierOrders, setCourierOrders] = useState([]);
  const [pendingOrders, setPendingOrders] = useState([]);
  const [processingOrders, setProcessingOrders] = useState([]);
  const [finishingOrders, setFinishingOrders] = useState([]);
  const [language, setLanguage] = useState("English");
  console.log(courierData);
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
          where("status", "==", "Pending")
        );
        const ordersQuerySnapshot = await getDocs(ordersQuery);
        if (!ordersQuerySnapshot.empty) {
          const updatePromises = ordersQuerySnapshot.docs.map(async (doc) => {
            const data = doc.data();
            const orderTime = data.time;
            const orderDate = new Date(data.date);
            const currentTime = new Date();
            const todayDate = new Date(currentTime.toDateString());
            const registrationTime = new Date(
              `${currentTime.toLocaleDateString()} ${orderTime}`
            );
            const fifteenMinutes = 15 * 60 * 1000;
            if (
              currentTime - registrationTime >= fifteenMinutes ||
              orderDate.toDateString() !== todayDate.toDateString()
            ) {
              await updateDoc(doc.ref, { status: "Cancelled" });
              return null;
            } else {
              return data;
            }
          });
          const updatedOrders = await Promise.all(updatePromises);
          const ordersData = updatedOrders.filter((order) => order !== null);
          setPendingOrders(ordersData);
        }
      } catch (error) {
        console.error("Error fetching pending orders:", error);
      }
    };

    const fetchProcessingOrders = async () => {
      try {
        const ordersCollection = collection(db, "orders");
        const ordersQuery = query(
          ordersCollection,
          where("status", "==", "In Process")
        );
        const ordersQuerySnapshot = await getDocs(ordersQuery);

        if (!ordersQuerySnapshot.empty) {
          const ordersData = ordersQuerySnapshot.docs.map((doc) => doc.data());
          setProcessingOrders(ordersData);
          setCourierOrders((prevOrders) => [...prevOrders, ...ordersData]);
        }
      } catch (error) {
        console.error("Error fetching processing orders:", error);
      }
    };

    const fetchFinishingOrders = async () => {
      try {
        const ordersCollection = collection(db, "orders");
        const ordersQuery = query(
          ordersCollection,
          where("status", "==", "Finalizing")
        );
        const ordersQuerySnapshot = await getDocs(ordersQuery);

        if (!ordersQuerySnapshot.empty) {
          const ordersData = ordersQuerySnapshot.docs.map((doc) => doc.data());
          setFinishingOrders(ordersData);
          setCourierOrders((prevOrders) => [...prevOrders, ...ordersData]);
        }
      } catch (error) {
        console.error("Error fetching finishing orders:", error);
      }
    };

    const fetchCourierOrders = async () => {
      try {
        const ordersCollection = collection(db, "orders");
        const ordersQuery = query(
          ordersCollection,
          where("courierId", "==", courierId)
        );
        const ordersQuerySnapshot = await getDocs(ordersQuery);

        if (!ordersQuerySnapshot.empty) {
          const ordersData = ordersQuerySnapshot.docs.map((doc) => doc.data());

          // Create a Set to store unique order IDs
          const uniqueOrderIds = new Set(
            courierOrders.map((order) => order.oId)
          );

          const newOrdersData = ordersData.filter((order) => {
            // Check if the order ID is already in the uniqueOrderIds set
            if (!uniqueOrderIds.has(order.oId)) {
              // If it's not, add it to the set and return true
              uniqueOrderIds.add(order.oId);
              return true;
            }
            return false;
          });

          setCourierOrders((prevOrders) => [...prevOrders, ...newOrdersData]);
        }
      } catch (error) {
        console.error("Error fetching courier orders:", error);
      }
    };

    fetchCourierData();
    fetchPendingOrders();
    fetchProcessingOrders();
    fetchFinishingOrders();
    fetchCourierOrders();

    const interval = setInterval(() => {
      fetchPendingOrders();
      fetchProcessingOrders();
      fetchFinishingOrders();
    }, 60000);

    return () => clearInterval(interval);
  }, [courierId]);

  return (
    <div className={styles.courierMain}>
      <CourierHeader
        courierData={courierData}
        setCourierData={setCourierData}
        courierOrders={courierOrders}
        language={language}
        setLanguage={setLanguage}
      />
      {processingOrders.length === 1 ? (
        <ProcessingOrders
          processingOrders={processingOrders}
          setProcessingOrders={setProcessingOrders}
          language={language}
          setFinishingOrders={setFinishingOrders}
          setCourierOrders={setCourierOrders}
          courierOrders={courierOrders}
        />
      ) : finishingOrders.length === 1 ? (
        <FinishingOrders
          finishingOrders={finishingOrders}
          setFinishingOrders={setFinishingOrders}
          language={language}
          setCourierOrders={setCourierOrders}
          courierOrders={courierOrders}
          setCourierData={setCourierData}
          courierData={courierData}
        />
      ) : (
        <PendingOrders
          pendingOrders={pendingOrders}
          processingOrders={processingOrders}
          setPendingOrders={setPendingOrders}
          setProcessingOrders={setProcessingOrders}
          language={language}
          setCourierOrders={setCourierOrders}
        />
      )}
    </div>
  );
};

export default CourierMain;
