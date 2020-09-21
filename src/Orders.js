import React, { useState, useEffect } from "react";
import { db } from "./firebasedetails";
import "./Orders.css";
import { useStateValue } from "./StateProvider";
import User_Order from "./User_Order";
//here we wish to have details of order in the data base

function Orders() {
  //first we need to store all the order
  const [orders, setOrders] = useState([]); //giving an initial value of null
  //then pull users (from the state value)
  const [{ basket, user }, dispatch] = useStateValue();

  // this following part is interfacing with firebase cloud data base to extract data
  useEffect(() => {
    if (user) {
      //if user exists then do real time data collection
      db.collection("users")
        .doc(user?.uid)
        .collection("orders")
        .orderBy("created", "desc") //arrange all the orders in the descending order (date wise)
        .onSnapshot((snapshot) =>
          setOrders(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(), //all the things are stored in a data key
            }))
          )
        );
    } else {
      setOrders([]); //if no user then set orders empty
    }
  }, [user]);

  //return the user order part and creation of user_order.js
  return (
    <div className="orders">
      <h1>Your Orders</h1>

      <div className="orders__order">
        {orders?.map((
          order //map through all the elements and return the order element. it is after interfacing dynamically above with firebase
        ) => (
          <User_Order order={order} />
        ))}
      </div>
    </div>
  );
}

export default Orders;
