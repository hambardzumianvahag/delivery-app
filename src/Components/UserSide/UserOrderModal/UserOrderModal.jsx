import { Button, Modal, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import styles from "./UserOrderModal.module.css";
import { db } from "../../../firebase/firebase-config";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "@firebase/firestore";
import { useLocation } from "react-router";

const UserOrderModal = ({ isOpen, onClose, setUserData }) => {
  const [orderData, setOrderData] = useState({
    orderId: "",
    orderName: "",
    from: "",
    to: "",
    additionalInfo: "",
    status: "Pending",
  });
  const [error, setError] = useState("");
  const location = useLocation();
  const locationPath = location.pathname.split("/");
  const userId = locationPath[locationPath.length - 1];

  useEffect(() => {
    const fetchOrdersCount = async () => {
      try {
        const ordersRef = collection(db, "orders");
        const ordersSnapshot = await getDocs(ordersRef);
        const count = ordersSnapshot.size;
        const orderId = `#${String(count + 1).padStart(4, "0")}`;
        setOrderData((prevData) => ({ ...prevData, orderId }));
      } catch (error) {
        console.error("Error fetching orders count: ", error);
      }
    };
    fetchOrdersCount();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!orderData.orderName) {
      setError("Order Name Field is Required");
      return false;
    }
    if (!orderData.from) {
      setError("From Field is Required");
      return false;
    }
    if (!orderData.to) {
      setError("To Field is Required");
      return false;
    }
    if (orderData.orderName.length > 12) {
      setError("Order Name is too long (maximum 12 characters)");
      return false;
    }
    if (orderData.from.length > 12) {
      setError("From Address is too long (maximum 12 characters)");
      return false;
    }
    if (orderData.to.length > 12) {
      setError("To Address is too long (maximum 12 characters)");
      return false;
    }
    setError("");
    return true;
  };

  const handleConfirmOrder = async () => {
    if (!validateForm()) {
      return;
    }
    try {
      await addDoc(collection(db, "orders"), orderData);
      const userDocRef = doc(db, "users", userId);
      const userDocSnap = await getDoc(userDocRef);
      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        const updatedOrders = [...(userData.orders || []), orderData];
        await updateDoc(userDocRef, { orders: updatedOrders });

        const updatedUserDocSnap = await getDoc(userDocRef);
        if (updatedUserDocSnap.exists()) {
          const updatedUserData = updatedUserDocSnap.data();

          setUserData(updatedUserData);
        }
      } else {
        console.error("User document does not exist");
      }
      onClose();
      const ordersRef = collection(db, "orders");
      const ordersSnapshot = await getDocs(ordersRef);
      const count = ordersSnapshot.size + 1;
      const orderId = `#${String(count).padStart(4, "0")}`;
      setOrderData({
        orderName: "",
        from: "",
        to: "",
        additionalInfo: "",
        orderId,
        status: "Pending",
      });
    } catch (error) {
      console.error("Error adding order: ", error);
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <div className={styles.modalContent}>
        <div className={styles.modalBody}>
          <h2 className={styles.header}>Order Number {orderData.orderId}</h2>
          {error && <span className={styles.error}>{error}</span>}
          <div className={styles.orderContainer}>
            <p>Order Name: </p>
            <TextField
              name="orderName"
              value={orderData.orderName}
              onChange={handleChange}
              variant="outlined"
              className={styles.textField}
            />
          </div>
          <div className={styles.orderContainer}>
            <p>From: </p>
            <TextField
              name="from"
              value={orderData.from}
              onChange={handleChange}
              variant="outlined"
              className={styles.textField}
            />
          </div>
          <div className={styles.orderContainer}>
            <p>To: </p>
            <TextField
              name="to"
              value={orderData.to}
              onChange={handleChange}
              variant="outlined"
              className={styles.textField}
            />
          </div>
          <div className={styles.additionalInfoContainer}>
            <span>Additional Information</span>
            <textarea
              name="additionalInfo"
              value={orderData.additionalInfo}
              onChange={handleChange}
              className={styles.textArea}
            />
          </div>
          <div className={styles.buttonContainer}>
            <Button
              variant="contained"
              onClick={onClose}
              className={styles.cancelButton}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleConfirmOrder}
              className={styles.confirmButton}
            >
              Confirm Order
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default UserOrderModal;
