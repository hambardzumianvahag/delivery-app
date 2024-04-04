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
  getDocs,
  query,
  updateDoc,
  where,
} from "@firebase/firestore";

const UserOrderHistory = ({
  setUserOrders,
  userOrders,
  isOpen,
  onClose,
  language,
}) => {
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

        // Update userOrders
        const updatedUserOrders = userOrders.map((order) =>
          order.orderId === orderId ? { ...order, status: "Cancelled" } : order
        );
        setUserOrders(updatedUserOrders);
      });
    } catch (error) {
      console.error("Error cancelling order:", error);
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <div className={styles.modalContainer}>
        <div className={styles.modalContent}>
          <h1 className={styles.title}>
            {language === "English"
              ? "User Order History"
              : "Պատվերների պատմություն"}
          </h1>
          <span className={styles.close} onClick={onClose}>
            &#10005;
          </span>
          <div className={styles.tableWrapper}>
            <TableContainer>
              <Table className={styles.table}>
                <TableHead>
                  <TableRow>
                    <TableCell className={styles.headerCell}>
                      {language === "English" ? "ID" : "Համար"}
                    </TableCell>
                    <TableCell className={styles.headerCell}>
                      {language === "English" ? "Name" : "Անուն"}
                    </TableCell>
                    <TableCell className={styles.headerCell}>
                      {language === "English" ? "From" : "Որտեղից"}
                    </TableCell>
                    <TableCell className={styles.headerCell}>
                      {language === "English" ? "To" : "Որտեղ"}
                    </TableCell>
                    <TableCell className={styles.headerCell}>
                      {language === "English" ? "Distance" : "Հեռավորություն"}
                    </TableCell>
                    <TableCell className={styles.headerCell}>
                      {language === "English" ? "Total" : "Ընդհանուր"}
                    </TableCell>
                    <TableCell className={styles.headerCell}>
                      {language === "English"
                        ? "Additional info"
                        : "Հավելյալ ինֆո"}
                    </TableCell>
                    <TableCell className={styles.headerCell}>
                      {language === "English" ? "Status" : "Կարգավիճակ"}
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {userOrders?.map((order) => (
                    <TableRow key={order.orderId}>
                      <TableCell>{order.orderId}</TableCell>
                      <TableCell>{order.orderName}</TableCell>
                      <TableCell>{order.from}</TableCell>
                      <TableCell>{order.to}</TableCell>
                      <TableCell>{order.distance}</TableCell>
                      <TableCell>{order.total}</TableCell>
                      <TableCell>{order.additionalInfo}</TableCell>

                      <TableCell>
                        {order.status === "Pending" ? (
                          <button
                            className={styles.cancelOrder}
                            onClick={() => handleCancelOrder(order.orderId)}
                          >
                            {language === "English" ? "Cancel" : "Չեղարկել"}
                          </button>
                        ) : (
                          <span className={styles.status}>
                            {language === "English" &&
                            order.status === "Cancelled"
                              ? order.status
                              : order.status === "Cancelled" &&
                                language === "Armenian"
                              ? "Չեղարկված"
                              : order.status === "In Process" &&
                                language === "English"
                              ? order.status
                              : "Ընթացքի մեջ"}
                          </span>
                          //! STEX PAYMAN STATUSI HET KAPVAC
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
