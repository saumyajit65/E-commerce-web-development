import React from "react";
import "./CheckoutProduct.css";
import { useStateValue } from "./StateProvider";
import { motion } from "framer-motion";
//the checkoutproduct shall have some propos inside as variable declaration
function CheckoutProduct({ ID, title, image, price, rating, hideButton }) {
  const [{ basket }, dispatch] = useStateValue(); //this code is added to support adding and removing potion ... specifically to support dispatch function  (just below)
  const removeFromBasket = () => {
    dispatch({
      type: "REMOVE_FROM_BASKET",
      ID: ID,
    });
  };
  return (
    <div className="checkoutProduct">
      <img className="checkoutProduct_image" src={image} alt="" />

      <div className="checkoutProduct_info">
        <p className="checkoutProduct_title">{title}</p>
        <p className="checkoutProduct_price">
          <small>₹</small>
          <strong>{price}</strong>
        </p>
        <div className="checkoutProduct_rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p>&#9733;</p>
            ))}
        </div>
        {!hideButton && ( //hide button part was added later but prev a button was created... it means only render if it is not hidden
          <motion.button whileHover={{ scale: 1.1 }} onClick={removeFromBasket}>
            Remove from Basket
          </motion.button>
        )}
      </div>
    </div>
  );
}

export default CheckoutProduct;
