import { useState, useEffect } from "react";
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

const PendingOrders = ({ language, setCourierOrders }) => {
  const [pendingOrders, setPendingOrders] = useState([]);
  const location = useLocation();
  const locationPath = location.pathname.split("/");
  const courierId = locationPath[locationPath.length - 1];

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

  const handleAcceptOrder = async (orderId) => {
    try {
      const orderRef = doc(db, "orders", orderId);
      await updateDoc(orderRef, {
        status: "In Process",
        courierId: courierId,
      });

      const updatedOrders = pendingOrders.filter(
        (order) => order.id !== orderId
      );
      setPendingOrders(updatedOrders);
      const acceptedOrder = pendingOrders.find((order) => order.id === orderId);
      acceptedOrder.status = "In Process";
      // Add the accepted order to courierOrders
      setCourierOrders((prevOrders) => [...prevOrders, acceptedOrder]);
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
            <th>{language === "English" ? "Order ID" : "Համար"}</th>
            <th>{language === "English" ? "Order Name" : "Անուն"}</th>
            <th>{language === "English" ? "From" : "Որտեղից"}</th>
            <th>{language === "English" ? "To" : "Որտեղ"}</th>
            <th>
              {language === "English" ? "Addition Info" : "Ավել Ինֆորմացիա"}
            </th>
            <th>{language === "English" ? "Status" : "Կարգավիճակ"}</th>
            <th>{language === "English" ? "Action" : "Գործողություն"}</th>
          </tr>
        </thead>
        <tbody>
          {pendingOrders.map(
            (order) =>
              order.status === "Pending" && (
                <tr key={order.id}>
                  <td>{order.orderId}</td>
                  <td>{order.orderName}</td>
                  <td>{order.from}</td>
                  <td>{order.to}</td>
                  <td>{order.additionalInfo}</td>
                  <td>{order.status}</td>
                  <td>
                    <button
                      onClick={() => handleAcceptOrder(order.id, order.userId)}
                    >
                      Accept
                    </button>
                  </td>
                </tr>
              )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PendingOrders;
