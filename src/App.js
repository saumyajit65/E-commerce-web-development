import React, { useEffect } from "react"; //use effect (a firebase module) is a dynamic if statement
import "./App.css";
import Header from "./Header";
import Home from "./Home";
import Footer from "./Footer";
//above is for creating pages and the following is part of react-router-dom
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Checkout from "./Checkout";
import Login from "./Login";
import Payment from "./Payment";
import { auth } from "./firebasedetails"; //to be used for Useeffect()
import { useStateValue } from "./StateProvider"; // this is added after const [{ }, dispatch] = useStateValue(); below
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Orders from "./Orders";

const promise = loadStripe(
  "pk_test_51HT1hLIiXgKppsupYX4orFtCWIJyafwDZJPYcU5ULfPrXi0LfU95SXsoMBk4Wz1eIEgaihjw0tVSbZxpSMI2MECw00C7xIeG0M"
); //secret key is in index.js in functions

function App() {
  const [{}, dispatch] = useStateValue(); //this one is added after user: null is assigned in reducer

  //we need to know who logged in so we require a useeffect ()
  useEffect(() => {
    //will only run once when we sign in for displaying who signed in
    auth.onAuthStateChanged((authUser) => {
      console.log("the user is >>>", authUser); //This is the command for listener during log in and log out
      if (authUser) {
        dispatch({
          type: "SET_USER", //this shall add the user to the data layer till u r logged in
          user: authUser,
        });
        //the user just logged in
      } else {
        //the user is logged out.
        dispatch({
          type: "SET_USER", //this shall add the user to the data layer till u r logged in
          user: null, // because the user logged out so no need to have his/her name... it is indicating nobody is logged in
        });
      }
    });
  }, []); // after you wrote this user effect part ... go to reducer to add user = null

  return (
    //BEM convention for styling (App to app)....software installation done and
    //the following router part(or word) comes after long time and the whole code is wrapped
    //up inside it to transit into page of checking out with all the items in it
    //after wrapping to router then use switch command(and inside the route command) to render home and header by putting both inside the <Switch>

    //IMP : ALWAYS HAVE THE DEFAULT ROUTE AT THE BOTTOM AND TRANSITION PAGES AT THE TOP LIKE 'CHECKOUT'
    <Router>
      <div className="app">
        <Switch>
          <Route path="/orders">
            <Header />
            <Orders />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/checkout">
            <Header />
            <Checkout />
          </Route>
          <Route path="/payment">
            <Header />
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>
          <Route path="/">
            <Header />
            <Home />
            <Footer />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

//the end result of route and switch is that in your http address if u have localhost:3000 and u enter localhost:3000/abc
// then it will always show the home and header if there is no existence of abc page (like abc u didnt have in the code)

export default App;
//in each sheet u import if needed but 'export like above is a must
