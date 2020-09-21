//think it as creation of data layer
//it's like how we dispatch the action into the data layer

//understadn the context api redux and reducer are not the same thing but have the same pattern
//context api redux dispatches the data into the global storage / container and reducer listens and process the data
export const initialState = {
  basket: [],
  user: null,
};

//adding a selector which is powerfully used everywhere... it goes through the basket items and adds them.... initial amount is 0
export const getBasketTotal = (basket) =>
  basket?.reduce((amount, item) => item.price + amount, 0);

//now we hsall write the code for the reducer... which says be in the current page state as well as change the
//basket state by adding values or reducing
const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case "ADD_TO_BASKET":
      return { ...state, basket: [...state.basket, action.item] };

    //below I am using a new function, i.e. functionID which shall search for the index for which the click is made for removing the item
    case "EMPTY_BASKET":
      return {
        ...state,
        basket: [], //after you press buy now... keep the state back to original with empty backet
      };

    case "REMOVE_FROM_BASKET":
      const index = state.basket.findIndex(
        (basketItem) => basketItem.ID === action.ID
      ); //here the === means does any of the basket item equals index id
      //now lets copy the new basket to another variable , i.e. newbasket
      let newBasket = [...state.basket];

      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn(
          "cant remove product (id: ${action.ID}) as it is not in the basket"
        );
      }
      return { ...state, basket: newBasket };

    case "SET_USER": //this part is for user login case code written in app.js
      return {
        ...state,
        user: action.user,
      };

    default:
      return state;
  }
};

export default reducer;
