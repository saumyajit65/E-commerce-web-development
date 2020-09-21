//type RFCE and the following code pops up... this is the advantage of ES7 extenstion which is added
//Link to="/" command makes the amazon logo a hyperlink to go to homepage as home is declared by "/" (check app)
import React from "react";
import "./Header.css";
import SearchIcon from "@material-ui/icons/Search"; // this from where I am getting the search icion from the website.... remaining is for declaration of object and styling.... if u write @material-ui/icons/SearchImage then diff logo shall appear
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket"; //for the shoppiong baskjet icon
//import { Link } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import { auth } from "./firebasedetails";

function Header() {
  //this part before reutrn is done after enabling the "Addtobasket" button in product.js by using "const addToBasket"
  const [{ basket, user }, dispatch] = useStateValue(); //user is added lot later... when signout show when signin and viceversa work was going on
  const handleAuthentication = () => {
    //if there was a user and u clicked it then sign out
    if (user) {
      // here u wrote import {auth} above.... to bring in all authentication details from firebase
      auth.signOut(); // if user present the upon click sign out
    }
  };
  return (
    <div className="header">
      <Link to="/">
        <img
          className="header_logo"
          src="http://pngimg.com/uploads/amazon/amazon_PNG25.png"
          alt=""
        />
      </Link>

      <div className="header_search">
        <input className="header_searchInput" type="text" />
        <SearchIcon className="header_searchIcon" />
      </div>

      <div className="header_nav">
        <Link
          to={!user && "/Login"} // previously only this <Link to="/Login"> but now changed to this bec when u signout it was redirecting to register page... but now it shall stay in home page
        >
          <div
            onClick={handleAuthentication}
            className="header_option" // it is a function created so that when u clock sign in or signout
          >
            <span className="header_optionLineOne">
              Hello{" "}
              {
                !user ? "Guest" : user.email //? mark protects from error.... !user states... if not user
              }
            </span>
            <span className="header_optionLineTwo">
              {user ? "Sign Out" : "Sign In"}
            </span>
          </div>
        </Link>

        <Link to="/orders">
          <div className="header_option">
            <span className="header_optionLineOne">Return</span>
            <span className="header_optionLineTwo">& Orders</span>
          </div>
        </Link>

        <div className="header_option">
          <span className="header_optionLineOne">Your</span>
          <span className="header_optionLineTwo">Prime</span>
        </div>

        <Link to="/checkout">
          <div className="header_optionBasket">
            <ShoppingBasketIcon />
            <span className="header_optionLineTwo header_basketCount">
              {basket?.length}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}
export default Header;
