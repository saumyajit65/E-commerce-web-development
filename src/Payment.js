import React, { useState, useEffect } from "react";
import "./Payment.css";
import { useStateValue } from "./StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import { Link, useHistory } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "./reducer";
import axios from "./axios";
import { db } from "./firebasedetails";
import { motion } from "framer-motion";

//{/* payment section shall have 3 items; 1. delivery adress, mode of payment  payment items*/ }
//same payment section class for ease in styling
//basket?.length has info about no of items aswell as a link to the checkout page
//cardElements are used below
function Payment() {
  const [{ basket, user }, dispatch] = useStateValue();
  const history = useHistory();
  /*this part is added later for card payment*/
  const stripe = useStripe(); //hooks for payment
  const elements = useElements(); //hooks for payment
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");

  /*for payment we need to add two states for handlechange ...for disable the button and for error*/
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);

  //the following process is for getting the clientsecret to process payment from stripe
  const [clientSecret, setClientSecret] = useState(true);
  //axios is used to get, make or do anytype of requests
  useEffect(() => {
    const getClientSecret = async () => {
      const response = await axios({
        method: "post",
        //stripe expects the total amount in (subunits like in cents or paisa so *100) one form that all products are shown
        url: `/payments/create?total=${getBasketTotal(basket) * 100}`, //this API URL is powered by axios... ?total is for query
      }); //backhand support for axios... we are making a post req for which url we create to pass the total amount of API (basket total)
      setClientSecret(response.data.clientSecret); //the entire thing is backhand...this part will run whenever the basket changes and update the special clinet secret which allows charge customer right
    };
    getClientSecret();
  }, [basket]);
  console.log("THE SECRET IS >>>", clientSecret);
  console.log("THE USER IS >>>", user);

  const handleSubmit = async (e) => {
    /*it shall do the stripe functions...fancy stuff*/
    e.preventDefault();
    setProcessing(true); //this shall prevent you from doing anything other after you click the buy button... it shall disable othre functionality

    //before doing this i have to inform strip that this is the total amount for payment and get a clientsecret
    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        //uses the client secret and informs the stripe how much needed to charge... then find the card element and charge
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        //this is part for payment of confirmation

        //paymentIntent = payment confirmation
        setSucceeded(true);
        setError(null);
        setProcessing(false);

        //this part is after creating the order page for collecting data of users from firebase.cloud... after the order becomes successful
        db.collection("users")
          .doc(user?.uid)
          .collection("orders")
          .doc(paymentIntent.id)
          .set({
            basket: basket,
            amount: paymentIntent.amount,
            created: paymentIntent.created,
          }); //it uses a NosQL structure... like collection command

        //then to make the basket empty
        dispatch({
          type: "EMPTY_BASKET", //this will be listened by 'reducer.js' as CASE for every dispatch
        });

        history.replace("/orders");
      }); //the response is received here and the brackets are like this
  };
  const handleChange = (e) => {
    /*here we will listen to the card details that customer entering*/
    /*then show error if the card details are entered wrong*/
    setDisabled(e.empty);
    setError(e.error ? e.error.message : "");
  };

  return (
    <div className="payment">
      <div className="payment_container">
        <h1>
          checkout(<Link to="/checkout">{basket?.length} items)</Link>
        </h1>
        <div className="payment_section">
          <div className="payment_title">
            <h3> Delivery Address</h3>
          </div>
          <div className="payment_address">
            <p //here we want to get the email, so import the {user and basket} through const
            >
              {user?.email}
            </p>
            <p>BTM stage 1</p>
            <p>Bengaluru</p>
          </div>
        </div>

        <div className="payment_section">
          <div className="payment_title">
            <h3> Review items and delivery</h3>
          </div>

          <div className="payment_items">
            {basket.map((
              item //previously u did coding of checkout products... same has to be mappped in this section only
            ) => (
              <CheckoutProduct
                ID={item.ID}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))}
          </div>
        </div>

        <div className="payment_section">
          <div className="payment_title">
            <h3>Payment method</h3>
          </div>
          <div
            className="payment_details" //here we shall program with stripe and we can do one time adn recurring subscription also
          >
            <form onSubmit={handleSubmit}>
              <CardElement
                onChange={
                  handleChange //it handles the change upon click for card details
                }
              />
              <div //for price format
                className="payment_pricecontainer" //to render our price format
              >
                <CurrencyFormat
                  renderText={(value) => <h3>Order total: {value}</h3>}
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"₹"}
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  disabled={processing || disabled || succeeded}
                >
                  <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                </motion.button>
              </div>
              {/* Errors-  the following means only if it is an card entry number error then show 'error'*/}
              {error && <div>error</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
