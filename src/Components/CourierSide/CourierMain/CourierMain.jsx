import { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
  getDoc,
} from "@firebase/firestore";
import { db } from "../../../firebase/firebase-config";
import styles from "./CourierMain.module.css";
import { Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router";

const CourierMain = () => {
  const [pendingOrders, setPendingOrders] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const locationPath = location.pathname.split("/");
  const courierId = locationPath[locationPath.length - 1];

  console.log(pendingOrders);

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

  useEffect(() => {
    const updateCourierOrders = async () => {
      try {
        const courierDocRef = doc(db, "couriers", courierId);
        const courierDocSnap = await getDoc(courierDocRef);

        if (courierDocSnap.exists()) {
          const courierData = courierDocSnap.data();
          const updatedOrders = pendingOrders.filter(
            (order) => order.status === "In Process"
          );
          const finalOrders = [...(courierData.orders || []), ...updatedOrders];

          // Update courier's document with the new orders added
          await updateDoc(courierDocRef, { orders: finalOrders });

          // Update orders array in user's document
          updatedOrders.forEach(async (order) => {
            const userDocRef = doc(db, "users", order.userId);
            const userDocSnap = await getDoc(userDocRef);
            if (userDocSnap.exists()) {
              const userData = userDocSnap.data();
              const userOrders = userData.orders || [];
              const updatedUserOrders = userOrders.map((userOrder) => {
                if (userOrder.id === order.id) {
                  return { ...userOrder, status: "In Process" };
                }
                return userOrder;
              });
              await updateDoc(userDocRef, { orders: updatedUserOrders });
            }
          });
        }
      } catch (error) {
        console.error("Error updating courier orders: ", error);
      }
    };

    updateCourierOrders();
  }, [pendingOrders]);

  const handleAcceptOrder = async (orderId, userId) => {
    try {
      const updatedOrders = pendingOrders.map((order) => {
        if (order.id === orderId) {
          return { ...order, status: "In Process" };
        }
        return order;
      });
      setPendingOrders(updatedOrders);
      // Update Firestore
      const orderRef = doc(db, "orders", orderId);
      await updateDoc(orderRef, {
        status: "In Process",
      });

      // Update orders array in user's document
      const userDocRef = doc(db, "users", userId);
      const userDocSnap = await getDoc(userDocRef);
      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        const userOrders = userData.orders || [];
        const updatedUserOrders = userOrders.map((userOrder) => {
          if (userOrder.oId === orderId) {
            //!stexa sxale chi gnum ordere
            console.log("gta");
            return { ...userOrder, status: "In Process" };
          } else {
            console.log("chgta");
          }
          return userOrder;
        });
        await updateDoc(userDocRef, { orders: updatedUserOrders });
      }
    } catch (error) {
      console.error("Error accepting order: ", error);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Pending Orders</h2>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Order Name</th>
            <th>From</th>
            <th>To</th>
            <th>Additional Info</th>
            <th>Status</th>
            <th>Action</th>
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
      <Button onClick={() => navigate("/delivery-app/")}>Logout</Button>
    </div>
  );
};

export default CourierMain;
