//type rfce

import React, { useState } from "react";
import "./Login.css";
import { Link, useHistory } from "react-router-dom"; //usehistory is to go back to home page after login
import { useStateValue } from "./StateProvider";
import { auth } from "./firebasedetails";

/* a Link is included so that it can take me to home page ('/')*/
/*for password the type is not text because for obvious reasons that it show text... we want ***** format do password */

/*remember to get styling in css ... you have to make it a class by giving class name ... and inside the class all the <h1..5> you can name the container and the h1 code to style it... check login.css file*/
/*below i am using const after function to know what i am entering in the signin*/
/* after const i am going to assign a value in Email class and add a onChange to assign an event  as setEmail (it then gets mapped to value ={email}, indirectly i am allowing the user to enter a email id) */

/* to link a function when u click sign in 'OnClick' is added*/

function Login() {
  const history = useHistory(); //it automatically changes the URL to home
  const [email, setEmail] = useState(""); // there are the states
  const [password, setPassword] = useState("");

  //the following is to signin for the same user id and pass as done in register
  const signIn = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        history.push("/"); //if login is successful then go to home
      })
      .catch((error) => alert(error.message));
  };
  //after sign in when we enter submit it should not refresh so we use e.preventDefault();

  const register = (e) => {
    e.preventDefault(); //after sign in when we enter submit it should not refresh so we use e.preventDefault();
    auth.createUserWithEmailAndPassword(email, password).then((auth) => {
      console.log(auth);
      if (auth) {
        history.push("/"); //this takes back to home
      }
    }); //this part successfully created a new user with email and password.... (before some works with firebase email enabling)
  };

  return (
    <div className="login">
      <Link to="/">
        <img
          className="login_logo"
          src="http://pngimg.com/uploads/amazon/amazon_PNG26.png"
        />
      </Link>

      <div className="login_container">
        <h1> Sign-in</h1>
        <form>
          <h5> E-mail</h5>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <h5>Password</h5>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" onClick={signIn} className="Sign_In_button">
            Sign In
          </button>
        </form>
        <p> By signing in you agree to amazon terms and conditions</p>
        <button onClick={register} className="login_register_button">
          Create your Amazon Account
        </button>
      </div>
    </div>
  );
}

export default Login;
