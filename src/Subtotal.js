//type rfce

import React from "react";
import "./Subtotal.css";
import CurrencyFormat from "react-currency-format";
import { useStateValue } from "./StateProvider";
import { getBasketTotal } from "./reducer";
import { useHistory } from "react-router-dom";

//usehistory is like what the person has selected
import { motion } from "framer-motion";
//below the value variable is like a render prop
function Subtotal() {
  const history = useHistory(); //to check the user browser history.... this is for the day challenge for price and order header
  const [{ basket }, dispatch] = useStateValue();
  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              Subtotal({basket?.length} items): <strong>{value}</strong>
            </p>
            <small className="subtotal_gift">
              <input type="checkbox" /> This order contains a gift
            </small>
          </>
        )}
        decimalScale={2}
        value={getBasketTotal(basket)}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"₹"}
      />
      <motion.button
        whileHover={{ scale: 1.1 }}
        onClick={
          (e) => history.push("/payment") //here i am pushing the user to payment and product page upon clicking the order link..... then edit in app page to give a route
        }
      >
        Proceed to checkout
      </motion.button>
    </div>
  );
}

export default Subtotal;
