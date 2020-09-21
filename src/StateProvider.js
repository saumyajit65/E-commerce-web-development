/*State provider for shopping cart not the sum total of cart items*/

import React, { createContext, useContext, useReducer } from "react";
// The following export command prepapres the data layer
export const StateContext = createContext();

// the following part wraps the data in total and sends to the data layer
export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

// Pull information from the data layer
export const useStateValue = () => useContext(StateContext);
