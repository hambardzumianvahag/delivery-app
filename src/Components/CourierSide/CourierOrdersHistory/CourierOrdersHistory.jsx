import {
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useState } from "react";
import styles from "./CourierOrdersHistory.module.css";
import OrderDetails from "../OrderDetails/OrderDetails";

const CourierOrdersHistory = ({
  openModal,
  onClose,
  courierOrders,
  language,
}) => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  function filterDuplicates(arr, prop) {
    return arr.filter(
      (obj, index, self) =>
        index === self.findIndex((t) => t[prop] === obj[prop])
    );
  }

  courierOrders = filterDuplicates(courierOrders, "oId");

  const handleCloseModal = () => {
    setSelectedOrder(null);
  };

  const handleSeeMore = (order) => {
    setOpen(true);
    setSelectedOrder(order);
  };
  return (
    <Modal open={openModal} onClose={onClose}>
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
                      {language === "English" ? "From" : "Որտեղից"}
                    </TableCell>
                    <TableCell className={styles.headerCell}>
                      {language === "English" ? "To" : "Որտեղ"}
                    </TableCell>
                    <TableCell className={styles.headerCell}>
                      {language === "English" ? "Distance" : "Հեռավորություն"}
                    </TableCell>
                    <TableCell className={styles.headerCell}>
                      {language === "English" ? "Cost" : "Արժեք"}
                    </TableCell>
                    <TableCell className={styles.headerCell}>
                      {language === "English" ? "Status" : "Կարգավիճակ"}
                    </TableCell>
                    <TableCell className={styles.headerCell}>
                      {language === "English" ? "See More" : "Տեսնել Ավելին"}
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {courierOrders?.map((order) => (
                    <TableRow key={order.oId}>
                      <TableCell className={styles.name}>
                        {order.orderName}
                      </TableCell>
                      <TableCell className={styles.from}>
                        {order.from}
                      </TableCell>
                      <TableCell className={styles.to}>{order.to}</TableCell>
                      <TableCell className={styles.distance}>
                        {order.distance}
                      </TableCell>
                      <TableCell className={styles.total}>
                        {order.total}
                      </TableCell>
                      <TableCell className={styles.status}>
                        {language === "English" && order.status === "Pending"
                          ? "Pending"
                          : language === "Armenian" &&
                            order.status === "Pending"
                          ? "Սպասել"
                          : language === "English" &&
                            order.status === "In Process"
                          ? "In Process"
                          : language === "Armenian" &&
                            order.status === "In Process"
                          ? "Ընթացքի մեջ"
                          : language === "English" &&
                            order.status === "Finalizing"
                          ? "Finalizing"
                          : language === "Armenian" &&
                            order.status === "Finalizing"
                          ? "Մոտենում է Ավարտին"
                          : language === "English" &&
                            order.status === "Completed"
                          ? "Completed"
                          : language === "Armenian" &&
                            order.status === "Completed"
                          ? "Ավարտված"
                          : language === "English" &&
                            order.status === "Cancelled"
                          ? "Cancelled"
                          : "Չեղարկված"}
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
        </div>
      </div>
    </Modal>
  );
};

export default CourierOrdersHistory;
