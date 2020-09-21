//type rfce
import React from "react";
import "./Product.css";
import { useStateValue } from "./StateProvider";
/*in the function attributes i am passing props, which are like proerties of elements and it makes all the items unique*/
/*use {} to assign the attributes from another file,... like calling in na function*/
import { motion } from "framer-motion";

function Product({ ID, title, image, price, rating }) {
  //this state function part (8 lines) is added after the stateprovider and reducer js is made
  const [{ basket }, dispatch] = useStateValue();
  // console.log("This is the basket >>>", basket);... u can have it or delete it... for review in inspect of a website
  const addToBasket = () => {
    //This function shall dispatch action into the data layer
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        ID: ID,
        title: title,
        image: image,
        price: price,
        rating: rating,
      },
    });
  };
  //the following is like a function for all the product format... like they should have a title, price etc
  return (
    <div className="product">
      <div className="product_info">
        <p>{ID}</p>
        <p>{title}</p>
        <p className="product_price">
          <small>₹</small>
          <strong>{price}</strong>
        </p>
        <div className="product_rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p>&#9733;</p>
            ))}
        </div>
      </div>

      <img src={image} alt="" />
      <motion.button whileHover={{ scale: 1.1 }} onClick={addToBasket}>
        Add to Basket
      </motion.button>
    </div>
  );
}
//{addToBasket} in curly brackets means that it is a function declared above

export default Product;
