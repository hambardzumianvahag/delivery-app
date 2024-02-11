import { Button, Modal, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import styles from "./UserOrderModal.module.css";
import { db } from "../../../firebase/firebase-config";
import { addDoc, collection, getDocs } from "@firebase/firestore";

const UserOrderModal = ({ isOpen, onClose }) => {
  const [orderData, setOrderData] = useState({
    orderId: "",
    orderName: "",
    from: "",
    to: "",
    additionalInfo: "",
  });

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

  const handleConfirmOrder = async () => {
    try {
      await addDoc(collection(db, "orders"), orderData);
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
              color="secondary"
              onClick={onClose}
              className={styles.cancelButton}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
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
