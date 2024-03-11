import React from "react";
import {
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import styles from "./UserOrderHistory.module.css";
import { db } from "../../../firebase/firebase-config";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "@firebase/firestore";

const UserOrderHistory = ({ userData, isOpen, onClose, setUserData }) => {
  const handleCancelOrder = async (orderId) => {
    try {
      // Update order status in the orders collection
      const ordersCollection = collection(db, "orders");
      const q = query(ordersCollection, where("orderId", "==", orderId));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach(async (elem) => {
        // Update the status of the order to "Cancelled"
        const orderRef = doc(db, "orders", elem.id);
        await updateDoc(orderRef, {
          status: "Cancelled",
        });

        // Get the user who placed this order
        const userId = userData.id;
        const userRef = doc(db, "users", userId);
        const userSnapshot = await getDoc(userRef);

        if (userSnapshot.exists()) {
          const userData = userSnapshot.data();
          const updatedOrders = userData?.orders?.map((order) => {
            if (order.orderId === orderId) {
              return { ...order, status: "Cancelled" };
            }
            return order;
          });

          setUserData((prevData) => ({
            ...prevData,
            orders: updatedOrders,
          }));

          // Update the user document
          await updateDoc(userRef, {
            orders: updatedOrders,
          });
        }
      });
    } catch (error) {
      console.error("Error cancelling order:", error);
    }
  };
  return (
    <Modal open={isOpen} onClose={onClose}>
      <div className={styles.modalContainer}>
        <div className={styles.modalContent}>
          <h2 className={styles.title}>User Order History</h2>
          <span className={styles.close} onClick={onClose}>
            &#10005;
          </span>
          <div className={styles.tableWrapper}>
            <TableContainer>
              <Table className={styles.table}>
                <TableHead>
                  <TableRow>
                    <TableCell className={styles.headerCell}>
                      Order ID
                    </TableCell>
                    <TableCell className={styles.headerCell}>
                      Order Name
                    </TableCell>
                    <TableCell className={styles.headerCell}>From</TableCell>
                    <TableCell className={styles.headerCell}>To</TableCell>
                    <TableCell className={styles.headerCell}>
                      Additional Info
                    </TableCell>
                    <TableCell className={styles.headerCell}>
                      Order Status
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {userData?.orders?.map((order) => (
                    <TableRow key={order.orderId}>
                      <TableCell>{order.orderId}</TableCell>
                      <TableCell>{order.orderName}</TableCell>
                      <TableCell>{order.from}</TableCell>
                      <TableCell>{order.to}</TableCell>
                      <TableCell>{order.additionalInfo}</TableCell>
                      <TableCell>
                        {order.status === "Pending" ? (
                          <button
                            className={styles.cancelOrder}
                            onClick={() => handleCancelOrder(order.orderId)}
                          >
                            Cancel
                          </button>
                        ) : (
                          <span>{order.status}</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default UserOrderHistory;
