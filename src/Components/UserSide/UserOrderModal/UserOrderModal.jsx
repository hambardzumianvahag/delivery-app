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
  Select,
} from "@chakra-ui/react";
import { db } from "../../../firebase/firebase-config";
import { addDoc, collection, getDocs, updateDoc } from "@firebase/firestore";
import { useLocation } from "react-router";
import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";

const libraries = ["places"];

const UserOrderModal = ({
  isOpen,
  onClose,
  userOrders,
  userData,
  language,
  setUserOrders,
}) => {
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
    courierId: "",
    additionalInfo: "",
    status: "Pending",
    distance: "",
    duration: "",
    total: "",
    vehicleType: "",
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
    //
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

      const updatedOrders = [...userOrders, { ...orderData, oId }];
      setUserOrders(updatedOrders);

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
        vehicleType: "",
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
            {language === "English" ? "Order Number " : "Պատվեր "}
            {orderData.orderId}
          </ModalHeader>
          <ModalBody padding="10px" fontSize="16px">
            {error && <span className={styles.error}>{error}</span>}
            <div className={styles.orderContainer}>
              <p>
                {language === "English" ? "Order Name: " : "Պատվերի Անուն։ "}
              </p>
              <Input
                name="orderName"
                placeholder={
                  language === "English"
                    ? "Enter the name of this order..."
                    : "Մուտքագրեք պատվերի անունը..."
                }
                value={orderData.orderName}
                onChange={handleChange}
                className={styles.textField}
              />
            </div>
            <div className={styles.orderContainer}>
              <p>
                {language === "English" ? "From: " : "Որտեղի՞ց։ "}
                {userData?.mainAddress &&
                !orderData.from &&
                orderData.to !== userData?.mainAddress ? (
                  <span
                    onClick={handleUseMainAddressforFrom}
                    className={styles.mainAddress}
                  >
                    {language === "English"
                      ? "Use Main Address"
                      : "Օգտագործել հիմնական հասցեն"}
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
                  placeholder={
                    language === "English"
                      ? "Enter starting address (e.g., Street Name, City, Country)"
                      : "Մուտքագրեք  հասցեն (օրինակ՝ փողոցի անունը, քաղաքը, երկիրը)"
                  }
                />
              </Autocomplete>
            </div>
            <div className={styles.orderContainer}>
              <p>
                {language === "English" ? "To: " : "Որտե՞ղ։ "}
                {userData?.mainAddress &&
                !orderData.to &&
                orderData.from !== userData?.mainAddress ? (
                  <span
                    onClick={handleUseMainAddressforTo}
                    className={styles.mainAddress}
                  >
                    {language === "English"
                      ? "Use Main Address"
                      : "Օգտագործել հիմնական հասցեն"}
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
                  placeholder={
                    language === "English"
                      ? "Enter starting address (e.g., Street Name, City, Country)"
                      : "Մուտքագրեք  հասցեն (օրինակ՝ փողոցի անունը, քաղաքը, երկիրը)"
                  }
                />
              </Autocomplete>
            </div>
            <div className={styles.vehicleType}>
              <p>
                {language === "English"
                  ? "Preferred Vehicle Type: "
                  : "Նախընտրելի Մեքենայի Տեսակը։ "}
              </p>
              <Select
                name="vehicleType"
                value={orderData.vehicleType}
                onChange={handleChange}
                className={styles.selectField}
              >
                <option value="sedan">
                  {language === "English" ? "Sedan" : "Սեդան"}
                </option>
                <option value="jeep">
                  {language === "English" ? "Jeep" : "Ջիպ"}
                </option>
                <option value="truck">
                  {language === "English" ? "Truck" : "Բեռնատար"}
                </option>
              </Select>
            </div>
            <div className={styles.additionalInfoContainer}>
              <span>
                {language === "English"
                  ? "Additional Information"
                  : "Հավելյալ Ինֆորմացիա"}
              </span>
              <Textarea
                placeholder={
                  language === "English"
                    ? "Any additional information about your order if it's needed?"
                    : "Ձեր պատվերի մասին լրացուցիչ տեղեկություններ կա՞ն, եթե դա անհրաժեշտ է:"
                }
                name="additionalInfo"
                value={orderData.additionalInfo}
                onChange={handleChange}
                className={styles.textArea}
              />
            </div>
            {distance && duration && orderData.from && orderData.to ? (
              <div className={styles.orderSummary}>
                <Text className={styles.summaryTitle}>
                  {language === "English"
                    ? "Order Summary"
                    : "Պատվերի ամփոփում"}
                </Text>
                <Text className={styles.distance}>
                  {" "}
                  {language === "English"
                    ? "Distance: "
                    : "Հեռավորություն: "}{" "}
                  {distance}{" "}
                </Text>
                <Text className={styles.duration}>
                  {" "}
                  {language === "English" ? "Duration: " : "Տևողություն: "}{" "}
                  {duration}{" "}
                </Text>
                <Text className={styles.total}>
                  {language === "English" ? "Total: " : "Ընդհանուր։ "}:{" "}
                  {orderData.vehicleType === "sedan"
                    ? 300 + distance.slice(0, 3) * 150
                    : orderData.vehicleType === "jeep"
                    ? 300 + distance.slice(0, 3) * 200
                    : 300 + distance.slice(0, 3) * 400}{" "}
                  AMD
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
              {language === "English" ? "Cancel" : "Չեղարկել"}
            </Button>
            <Button
              onClick={handleConfirmOrder}
              colorScheme="yellow"
              ml={3}
              className={styles.confirmButton}
            >
              {language === "English" ? "Confirm Order" : "Հաստատել պատվերը"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </div>
    </Modal>
  );
};

export default UserOrderModal;
