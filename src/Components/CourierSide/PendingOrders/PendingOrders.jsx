import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
} from "@firebase/firestore";
import { db } from "../../../firebase/firebase-config";
import styles from "./PendingOrders.module.css";
import { useLocation } from "react-router";
import OrderDetails from "../OrderDetails/OrderDetails";

const PendingOrders = ({
  setProcessingOrders,
  pendingOrders,
  setPendingOrders,
  language,
  setCourierOrders,
}) => {
  const location = useLocation();
  const locationPath = location.pathname.split("/");
  const courierId = locationPath[locationPath.length - 1];

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

  const fetchPendingOrders = async () => {
    try {
      const ordersRef = collection(db, "orders");
      const q = query(ordersRef, where("status", "==", "Pending"));
      const querySnapshot = await getDocs(q);
      const orders = [];
      querySnapshot.forEach((doc) => {
        orders.push({ id: doc.id, ...doc.data() });
      });
      setPendingOrders(orders);
    } catch (error) {
      console.error("Error fetching orders: ", error);
    }
  };

  useEffect(() => {
    fetchPendingOrders();
  }, []);

  const handleAcceptOrder = async (orderId, courierId) => {
    try {
      const orderRef = doc(db, "orders", orderId);
      await updateDoc(orderRef, {
        status: "In Process",
        courierId: courierId,
      });

      if (pendingOrders) {
        const updatedOrders = pendingOrders.filter(
          (order) => order.oId !== orderId
        );
        setPendingOrders(updatedOrders);
        const acceptedOrder = pendingOrders.find(
          (order) => order.oId === orderId
        );
        if (acceptedOrder) {
          acceptedOrder.status = "In Process";
          setCourierOrders((prevOrders) => [...prevOrders, acceptedOrder]);
          setProcessingOrders((prevOrders) => [...prevOrders, acceptedOrder]);
        }
      }
    } catch (error) {
      console.error("Error accepting order: ", error);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        {language === "English" ? "Pending Orders" : "Պատվերներ"}
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
          {pendingOrders.map(
            (order) =>
              order.status === "Pending" && (
                <tr key={order.oId}>
                  <td>{order.orderName}</td>
                  <td>{order.from}</td>
                  <td>{order.to}</td>
                  <td>{order.distance}</td>
                  <td>{order.total}</td>
                  <td>
                    <button
                      className={styles.seeMore}
                      onClick={() => handleSeeMore(order)}
                    >
                      {language === "English" ? "See More" : "Ավելին"}
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => handleAcceptOrder(order.oId, courierId)}
                    >
                      Accept
                    </button>
                  </td>
                </tr>
              )
          )}
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

export default PendingOrders;
