import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "@firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../../firebase/firebase-config";
import styles from "./ProcessingOrders.module.css";
import OrderDetails from "../OrderDetails/OrderDetails";

const ProcessingOrders = ({
  language,
  processingOrders,
  setProcessingOrders,
  setCourierOrders,
  courierOrders,
  setFinishingOrders,
}) => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  const handleCloseModal = () => {
    setSelectedOrder(null);
  };

  const handleSeeMore = (order) => {
    setOpen(true);
    setSelectedOrder(order);
  };

  const fetchProcessingOrders = async () => {
    try {
      const ordersRef = collection(db, "orders");
      const q = query(ordersRef, where("status", "==", "In Process"));
      const querySnapshot = await getDocs(q);
      const orders = [];
      querySnapshot.forEach((doc) => {
        orders.push({ id: doc.id, ...doc.data() });
      });
      setProcessingOrders(orders);
    } catch (error) {
      console.error("Error fetching processing orders: ", error);
    }
  };

  useEffect(() => {
    fetchProcessingOrders();
  }, []);

  const handleCompleteOrder = async (orderId) => {
    try {
      const orderRef = doc(db, "orders", orderId);
      await updateDoc(orderRef, {
        status: "Finalizing",
      });

      const existingOrderIndex = courierOrders.findIndex(
        (order) => order.oId === orderId
      );
      if (existingOrderIndex !== -1) {
        const updatedCourierOrders = [...courierOrders];
        updatedCourierOrders[existingOrderIndex].status = "Finalizing";
        setCourierOrders(updatedCourierOrders);
      } else {
        console.warn(`Order with ID ${orderId} not found in CourierOrders.`);
      }

      const updatedOrders = processingOrders.filter(
        (order) => order.id !== orderId
      );
      setProcessingOrders(updatedOrders);

      const acceptedOrder = processingOrders.find(
        (order) => order.id === orderId
      );
      acceptedOrder.status = "Finalizing";
      setFinishingOrders((prevOrders) => [...prevOrders, acceptedOrder]);
    } catch (error) {
      console.error("Error completing order: ", error);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        {language === "English" ? "Processing Orders" : "Ընդունված պատվերներ"}
      </h2>
      <table>
        <thead>
          <tr>
            <th>{language === "English" ? "Order Name" : "Անուն"}</th>
            <th>{language === "English" ? "From" : "Որտեղից"}</th>
            <th>{language === "English" ? "To" : "Որտեղ"}</th>
            <th>{language === "English" ? "Distance" : "Հեռավորություն"}</th>
            <th>{language === "English" ? "Cost" : "արժեք"}</th>
            <th>{language === "English" ? "See More" : "Տեսնել Ավելին"}</th>
            <th>{language === "English" ? "Action" : "Գործողություն"}</th>
          </tr>
        </thead>
        <tbody>
          {processingOrders.map((order) => (
            <tr key={order.oId}>
              <td>{order.orderName}</td>
              <td>{order.from}</td>
              <td>{order.to}</td>
              <td>{order.distance}</td>
              <td>{order.total}</td>
              <td>
                {" "}
                <button
                  className={styles.seeMore}
                  onClick={() => handleSeeMore(order)}
                >
                  {language === "English" ? "See More" : "Ավելին"}
                </button>
              </td>
              <td>
                <button onClick={() => handleCompleteOrder(order.id)}>
                  Finalizing
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedOrder && (
        <OrderDetails
          orderDetails={selectedOrder}
          onClose={handleCloseModal}
          open={open}
          language={language}
          handleClose={handleClose}
        />
      )}
    </div>
  );
};

export default ProcessingOrders;
