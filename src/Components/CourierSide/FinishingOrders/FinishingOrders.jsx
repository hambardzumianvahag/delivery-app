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
import styles from "./FinishingOrders.module.css";
import OrderDetails from "../OrderDetails/OrderDetails";

const FinishingOrders = ({
  setCourierData,
  finishingOrders,
  setFinishingOrders,
  language,
  courierOrders,
  setCourierOrders,
  courierData,
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

  const fetchFinishingOrders = async () => {
    try {
      const ordersRef = collection(db, "orders");
      const q = query(ordersRef, where("status", "==", "Finalizing"));
      const querySnapshot = await getDocs(q);
      const orders = [];
      querySnapshot.forEach((doc) => {
        orders.push({ id: doc.id, ...doc.data() });
      });
      setFinishingOrders(orders);
    } catch (error) {
      console.error("Error fetching processing orders: ", error);
    }
  };

  useEffect(() => {
    fetchFinishingOrders();
  }, []);

  const handleCompleteOrder = async (orderId, totalCost) => {
    try {
      const orderRef = doc(db, "orders", orderId);
      await updateDoc(orderRef, {
        status: "Completed",
      });

      if (totalCost) {
        // Check if totalCost is defined
        const numericTotal = parseInt(totalCost.replace(/\D/g, ""), 10);
        console.log(numericTotal);
        const updatedBalance = courierData.balance + numericTotal;
        setCourierData({ ...courierData, balance: updatedBalance });

        const courierDocRef = doc(db, "couriers", courierData.id);
        await updateDoc(courierDocRef, {
          balance: updatedBalance,
        });
      }

      const existingOrderIndex = courierOrders.findIndex(
        (order) => order.oId === orderId
      );
      if (existingOrderIndex !== -1) {
        const updatedCourierOrders = [...courierOrders];
        updatedCourierOrders[existingOrderIndex].status = "Completed";
        setCourierOrders(updatedCourierOrders);
      } else {
        console.warn(`Order with ID ${orderId} not found in CourierOrders.`);
      }

      const updatedOrders = finishingOrders.filter(
        (order) => order.id !== orderId
      );
      setFinishingOrders(updatedOrders);
    } catch (error) {
      console.error("Error completing order: ", error);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        {language === "English" ? "Finalizing Orders" : "Ավարտվող պատվերներ"}
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
          {finishingOrders.map((order) => (
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
                <button
                  onClick={() => handleCompleteOrder(order.id, order.total)}
                >
                  Complete
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

export default FinishingOrders;
