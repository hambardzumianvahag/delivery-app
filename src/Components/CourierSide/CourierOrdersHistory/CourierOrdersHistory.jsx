import {
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import styles from "./CourierOrdersHistory.module.css";

const CourierOrdersHistory = ({
  openModal,
  onClose,
  pendingOrders,
  language,
}) => {
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
                  {pendingOrders?.map((order) => (
                    <TableRow key={order.orderId}>
                      <TableCell>{order.orderId}</TableCell>
                      <TableCell>{order.orderName}</TableCell>
                      <TableCell>{order.from}</TableCell>
                      <TableCell>{order.to}</TableCell>
                      <TableCell>{order.distance}</TableCell>
                      <TableCell>{order.total}</TableCell>
                      <TableCell>{order.additionalInfo}</TableCell>

                      <TableCell>{order.status}</TableCell>
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

export default CourierOrdersHistory;
