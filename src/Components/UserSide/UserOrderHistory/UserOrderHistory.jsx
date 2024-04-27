import React, { useState } from "react";
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
import OrderDetails from "../OrderDetails/OrderDetails";

const UserOrderHistory = ({
  setUserOrders,
  userOrders,
  isOpen,
  onClose,
  language,
}) => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);

  const handleCloseModal = () => {
    setSelectedOrder(null);
  };

  const handleSeeMore = (order) => {
    setOpen(true);
    setSelectedOrder(order);
  };

  const handleCancelOrder = async (orderId) => {
    try {
      const ordersCollection = collection(db, "orders");
      const q = query(ordersCollection, where("orderId", "==", orderId));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (elem) => {
        const orderRef = doc(db, "orders", elem.id);
        await updateDoc(orderRef, {
          status: "Cancelled",
        });
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
    <>
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
                        {language === "English" ? "Name" : "Անուն"}
                      </TableCell>

                      <TableCell className={styles.headerCell}>
                        {language === "English" ? "Total" : "Ընդհանուր"}
                      </TableCell>

                      <TableCell className={styles.headerCell}>
                        {language === "English" ? "Status" : "Կարգավիճակ"}
                      </TableCell>
                      <TableCell className={styles.headerCell}>
                        {language === "English" ? "See More" : "Տեսնել ավելին"}
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {userOrders?.map((order) => (
                      <TableRow key={order.orderId}>
                        <TableCell className={styles.name}>
                          {order.orderName}
                        </TableCell>
                        <TableCell className={styles.total}>
                          {order.total}
                        </TableCell>
                        <TableCell className={styles.status}>
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
                                ? "Cancelled"
                                : order.status === "Cancelled" &&
                                  language === "Armenian"
                                ? "Չեղարկված"
                                : order.status === "In Process" &&
                                  language === "English"
                                ? "In Process"
                                : order.status === "In Process" &&
                                  language === "Armenian"
                                ? "Ընթացքի Մեջ"
                                : language === "English" &&
                                  order.status === "Finalizing"
                                ? "Finalizing"
                                : language === "Armenian" &&
                                  order.status === "Finalizing"
                                ? "Մոտենում է Ավարտին"
                                : language === "English" &&
                                  order.status === "Completed"
                                ? "Completed"
                                : "Ավարտված"}
                            </span>
                          )}
                        </TableCell>
                        <TableCell>
                          <button
                            className={styles.seeMore}
                            onClick={() => handleSeeMore(order)}
                          >
                            {language === "English" ? "See More" : "Ավելին"}
                          </button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
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
      </Modal>
    </>
  );
};

export default UserOrderHistory;
