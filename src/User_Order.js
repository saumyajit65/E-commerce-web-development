import React from "react";
import "./User_Order.css";
import moment from "moment"; //to pass any kind of data stamps
import CheckoutProduct from "./CheckoutProduct";
import CurrencyFormat from "react-currency-format";

function User_Order({ order }) {
  //here i am asking the orders as prop
  return (
    <div className="order">
      <h2>Order</h2>
      <p>{moment.unix(order.data.created).format("MMMM Do YYYY, h:mma")}</p>
      <p className="order_id">
        <small>{order.id}</small>
      </p>
      {order.data.basket?.map((item) => (
        <CheckoutProduct
          ID={item.ID}
          title={item.title}
          image={item.image}
          price={item.price}
          rating={item.rating}
          hideButton //after you pay there is no point of having a remove item from basket
        />
      ))}
      <CurrencyFormat
        renderText={(value) => (
          <h3 className="order__total">Order Total: {value}</h3>
        )}
        decimalScale={2}
        value={order.data.amount / 100} //to get the original value bec it shall be in subunits
        displayType={"text"}
        thousandSeparator={true}
        prefix={"₹"}
      />
    </div>
  );
}

export default User_Order;
