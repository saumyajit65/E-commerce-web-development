//type rfce
import React from "react";
import Subtotal from "./Subtotal";
import "./Checkout.css";
import CheckoutProduct from "./CheckoutProduct";
import { useStateValue } from "./StateProvider";

//i have this function to add products in the basket "const [{ basket }, dispatch] = useStateValue();"

function Checkout() {
  const [{ basket, user }, dispatch] = useStateValue(); //user is added later for showing the name of the user in header

  return (
    <div className="checkout">
      <div className="checkout_left">
        <img
          className="checkout_ad"
          src="http://www.pngmart.com/files/12/Grass-Easter-Egg-PNG-Pic.png"
          alt=""
        />
        <div>
          <h3>
            Hello,{" "}
            {
              user?.email //? mark protects from error
            }
          </h3>
          <h2 className="checkout_title">Your shopping basket</h2>
          {basket.map((item) => (
            <CheckoutProduct
              ID={item.ID}
              title={item.title}
              image={item.image}
              price={item.price}
              rating={item.rating}
            />
          ))}

          {/*CheckoutProduct*/}
          {/*CheckoutProduct*/}
          {/*CheckoutProduct*/}
          {/*CheckoutProduct*/}
          {/*CheckoutProduct*/}
        </div>
      </div>

      <div className="checkout_right">
        <Subtotal />
      </div>
    </div>
  );
}

export default Checkout;
