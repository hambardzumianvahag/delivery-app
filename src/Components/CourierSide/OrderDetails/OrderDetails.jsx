import React from "react";
import styles from "./OrderDetails.module.css";
import Modal from "@mui/material/Modal";

const OrderDetails = ({
  orderDetails,
  onClose,
  open,
  handleClose,
  language,
}) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <div className={styles.orderModalContainer}>
        <span className={styles.close} onClick={onClose}>
          &#10005;
        </span>
        <div className={styles.orderModalHeader}>
          <h2>
            {language === "English" ? "Order Details" : "Պատվերի մանրամասներ"}
          </h2>
        </div>
        <div className={styles.orderModalContent}>
          <div className={styles.orderItem}>
            <span className={styles.label}>
              {language === "English" ? "ID : " : "Համար : "}
            </span>
            <span className={styles.value}>{orderDetails.orderId}</span>
          </div>
          <div className={styles.orderItem}>
            <span className={styles.label}>
              {language === "English" ? "Name : " : "Անուն : "}
            </span>
            <span className={styles.value}>{orderDetails.orderName}</span>
          </div>
          <div className={styles.orderItem}>
            <span className={styles.label}>
              {language === "English" ? "From : " : "Որտեղից : "}
            </span>
            <span className={styles.value}>{orderDetails.from}</span>
          </div>
          <div className={styles.orderItem}>
            <span className={styles.label}>
              {language === "English" ? "To : " : "Որտեղ : "}
            </span>
            <span className={styles.value}>{orderDetails.to}</span>
          </div>
          <div className={styles.orderItem}>
            <span className={styles.label}>
              {language === "English"
                ? "Additional Information : "
                : "Հավելյալ Ինֆորմացիա : "}
            </span>
            <span className={styles.value}>{orderDetails.additionalInfo}</span>
          </div>
          <div className={styles.orderItem}>
            <span className={styles.label}>
              {language === "English" ? "Vehicle Type : " : "Մեքենայի տեսակ : "}
            </span>
            <span className={styles.value}>
              {language === "English" && orderDetails.vehicleType === "Sedan"
                ? "Sedan"
                : language === "Armenian" &&
                  orderDetails.vehicleType === "Sedan"
                ? "Սեդան"
                : language === "English" && orderDetails.vehicleType === "Jeep"
                ? "Jeep"
                : language === "Armenian" && orderDetails.vehicleType === "Jeep"
                ? "Ջիպ"
                : language === "English" && orderDetails.vehicleType === "Truck"
                ? "Truck"
                : "Բեռնատար"}
            </span>
          </div>
          <div className={styles.orderItem}>
            <span className={styles.label}>
              {language === "English" ? "Distance : " : "Հեռավորություն : "}
            </span>
            <span className={styles.value}>{orderDetails.distance}</span>
          </div>
          <div className={styles.orderItem}>
            <span className={styles.label}>
              {language === "English" ? "Date : " : "Ամսաթիվ : "}
            </span>
            <span className={styles.value}>{orderDetails.date}</span>
          </div>
          <div className={styles.orderItem}>
            <span className={styles.label}>
              {language === "English" ? "Time : " : "Ժամ : "}
            </span>
            <span className={styles.value}>{orderDetails.time}</span>
          </div>
          <div className={styles.orderItem}>
            <span className={styles.label}>
              {language === "English" ? "Status : " : "Կարգավիճակ : "}
            </span>
            <span className={styles.status}>
              {language === "English" && orderDetails.status === "Pending"
                ? "Pending"
                : language === "Armenian" && orderDetails.status === "Pending"
                ? "Սպասել"
                : language === "English" && orderDetails.status === "In Process"
                ? "In Process"
                : language === "Armenian" &&
                  orderDetails.status === "In Process"
                ? "Ընթացքի մեջ"
                : language === "English" && orderDetails.status === "Finalizing"
                ? "Finalizing"
                : language === "Armenian" &&
                  orderDetails.status === "Finalizing"
                ? "Մոտենում է Ավարտին"
                : language === "English" && orderDetails.status === "Completed"
                ? "Completed"
                : language === "Armenian" && orderDetails.status === "Completed"
                ? "Ավարտված"
                : language === "English" && orderDetails.status === "Cancelled"
                ? "Cancelled"
                : "Չեղարկված"}
            </span>
          </div>
          <div className={styles.orderItem}>
            <span className={styles.label}>
              {language === "English" ? "Total : " : "Ընդհանուր : "}
            </span>
            <span className={styles.value}>{orderDetails.total}</span>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default OrderDetails;
