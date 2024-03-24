import React, { useState, useEffect, useRef } from "react";
import styles from "./UserOrderModal.module.css";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Textarea,
  Input,
  Text,
  SkeletonText,
} from "@chakra-ui/react";
import { db } from "../../../firebase/firebase-config";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "@firebase/firestore";
import { useLocation } from "react-router";
import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";

const libraries = ["places"];

const UserOrderModal = ({ isOpen, onClose, setUserData, userData }) => {
  const [error, setError] = useState("");
  const location = useLocation();
  const locationPath = location.pathname.split("/");
  const userId = locationPath[locationPath.length - 1];
  const [orderData, setOrderData] = useState({
    userId: userId,
    orderId: "",
    orderName: "",
    from: "",
    to: "",
    additionalInfo: "",
    status: "Pending",
    distance: "",
    duration: "",
    total: "",
  });

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyAPHw8Db5Ux9sMohE1FBZZmntxl_cdCDOQ",
    libraries: libraries,
  });
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef();
  /** @type React.MutableRefObject<HTMLInputElement> */
  const destinationRef = useRef();

  useEffect(() => {
    const fetchOrdersCount = async () => {
      try {
        const ordersRef = collection(db, "orders");
        const ordersSnapshot = await getDocs(ordersRef);
        const count = ordersSnapshot.size;
        const orderId = `#${String(count + 1).padStart(4, "0")}`;
        setOrderData((prevData) => ({ ...prevData, orderId }));
      } catch (error) {
        console.log(isLoaded);
        console.error("Error fetching orders count: ", error);
      }
    };
    if (orderData.from && orderData.to) {
      calculateRoute();
    }
    fetchOrdersCount();
  }, [isLoaded, orderData.from, orderData.to]);

  if (!isLoaded) {
    return <SkeletonText />;
  }
  async function calculateRoute() {
    if (originRef.current.value === "" || destinationRef.current.value === "") {
      setDistance("");
      setDuration("");
      setOrderData((prevData) => ({
        ...prevData,
        distance: "",
        duration: "",
        total: "",
      }));
      return;
    }

    try {
      // eslint-disable-next-line no-undef
      const directionsService = new google.maps.DirectionsService();
      const results = await directionsService.route({
        origin: originRef.current.value,
        destination: destinationRef.current.value,
        // eslint-disable-next-line no-undef
        travelMode: google.maps.TravelMode.DRIVING,
      });

      if (results.status === "OK") {
        const calculatedDistance = results.routes[0].legs[0].distance.text;
        const calculatedDuration = results.routes[0].legs[0].duration.text;
        const total = 300 + parseFloat(calculatedDistance.slice(0, 3)) * 100;
        setDistance(calculatedDistance);
        setDuration(calculatedDuration);
        setOrderData((prevData) => ({
          ...prevData,
          distance: calculatedDistance,
          duration: calculatedDuration,
          total: `${total} AMD`,
        }));
      } else {
        // Handle the case where directions cannot be found
        console.error("Directions not found:", results.status);
        setDistance("");
        setDuration("");
        setOrderData((prevData) => ({
          ...prevData,
          distance: "",
          duration: "",
          total: "",
        }));
      }
    } catch (error) {
      console.error("Error calculating route:", error);
      setDistance("");
      setDuration("");
      setOrderData((prevData) => ({
        ...prevData,
        distance: "",
        duration: "",
        total: "",
      }));
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!orderData.orderName) {
      setError("Order Name Field is Required");
      return false;
    }
    if (!orderData.from) {
      setError("From Field is Required");
      return false;
    }
    if (!orderData.to) {
      setError("To Field is Required");
      return false;
    }
    if (orderData.orderName.length > 20) {
      setError("Order Name is too long");
      return false;
    }
    if (orderData.from.length > 20) {
      setError("From Address is too long");
      return false;
    }
    if (orderData.to.length > 20) {
      setError("To Address is too long");
      return false;
    }
    if (!orderData.distance) {
      setError("Please Enter valid addresses");
      return false;
    } //! stugelu entaka
    setError("");
    return true;
  };

  const handleConfirmOrder = async () => {
    if (!validateForm()) {
      return;
    }
    try {
      const orderRef = await addDoc(collection(db, "orders"), orderData);
      const oId = orderRef.id;
      await updateDoc(orderRef, { oId });

      const userDocRef = doc(db, "users", userId);
      const userDocSnap = await getDoc(userDocRef);
      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        const updatedOrders = [
          ...(userData.orders || []),
          { ...orderData, oId },
        ];
        await updateDoc(userDocRef, { orders: updatedOrders });
        const updatedUserDocSnap = await getDoc(userDocRef);
        if (updatedUserDocSnap.exists()) {
          const updatedUserData = updatedUserDocSnap.data();

          setUserData(updatedUserData);
        }
      } else {
        console.error("User document does not exist");
      }
      onClose();
      const ordersRef = collection(db, "orders");
      const ordersSnapshot = await getDocs(ordersRef);
      const count = ordersSnapshot.size + 1;
      const orderId = `#${String(count).padStart(4, "0")}`;
      setOrderData({
        userId: userId,
        orderName: "",
        from: "",
        to: "",
        additionalInfo: "",
        orderId,
        distance: "",
        duration: "",
        total: "",
        status: "Pending",
      });
    } catch (error) {
      console.error("Error adding order: ", error);
    }
  };

  const handleUseMainAddressforFrom = () => {
    setOrderData((prevData) => ({
      ...prevData,
      from: userData?.mainAddress,
    }));
  };

  const handleUseMainAddressforTo = () => {
    setOrderData((prevData) => ({
      ...prevData,
      to: userData?.mainAddress,
    }));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <div className={styles.modalContainer}>
        <ModalContent className={styles.modalContent}>
          <ModalHeader className={styles.header}>
            Order Number {orderData.orderId}
          </ModalHeader>
          <ModalBody padding="10px" fontSize="16px">
            {error && <span className={styles.error}>{error}</span>}
            <div className={styles.orderContainer}>
              <p>Order Name: </p>
              <Input
                name="orderName"
                placeholder="Enter the name of this order..."
                value={orderData.orderName}
                onChange={handleChange}
                className={styles.textField}
              />
            </div>
            <div className={styles.orderContainer}>
              <p>
                From:
                {userData?.mainAddress &&
                !orderData.from &&
                orderData.to !== userData?.mainAddress ? (
                  <span
                    onClick={handleUseMainAddressforFrom}
                    className={styles.mainAddress}
                  >
                    Use Main Address
                  </span>
                ) : null}
              </p>
              <Autocomplete className={styles.Autocomplete}>
                <Input
                  name="from"
                  value={orderData.from}
                  onChange={handleChange}
                  variant="outline"
                  ref={originRef}
                  className={styles.textField}
                  placeholder="Enter starting address (e.g., Street Name, City, Country)"
                />
              </Autocomplete>
            </div>
            <div className={styles.orderContainer}>
              <p>
                To:
                {userData?.mainAddress &&
                !orderData.to &&
                orderData.from !== userData?.mainAddress ? (
                  <span
                    onClick={handleUseMainAddressforTo}
                    className={styles.mainAddress}
                  >
                    Use Main Address
                  </span>
                ) : null}{" "}
              </p>
              <Autocomplete>
                <Input
                  name="to"
                  ref={destinationRef}
                  value={orderData.to}
                  onChange={handleChange}
                  variant="outline"
                  className={styles.textField}
                  placeholder="Enter starting address (e.g., Street Name, City, Country)"
                />
              </Autocomplete>
            </div>
            <div className={styles.additionalInfoContainer}>
              <span>Additional Information</span>
              <Textarea
                placeholder="Any additional information about your order if it's needed?"
                name="additionalInfo"
                value={orderData.additionalInfo}
                onChange={handleChange}
                className={styles.textArea}
              />
            </div>
            {distance && duration && orderData.from && orderData.to ? (
              <div className={styles.orderSummary}>
                <Text className={styles.summaryTitle}>Order Summary</Text>
                <Text className={styles.distance}>Distance: {distance} </Text>
                <Text className={styles.duration}>Duration: {duration} </Text>
                <Text className={styles.total}>
                  Total: {300 + distance.slice(0, 3) * 100} AMD
                </Text>
              </div>
            ) : null}
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={onClose}
              colorScheme="red"
              className={styles.cancelButton}
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirmOrder}
              colorScheme="yellow"
              ml={3}
              className={styles.confirmButton}
            >
              Confirm Order
            </Button>
          </ModalFooter>
        </ModalContent>
      </div>
    </Modal>
  );
};

export default UserOrderModal;
