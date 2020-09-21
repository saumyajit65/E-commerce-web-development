import React from "react";
import "./Footer.css";

//declare a space..then a container./.. then a row and divide row in 3 parts (or columns)
function Footer() {
  return (
    <div className="footer1">
      <div className="Container">
        <div className="row">
          {/* Column1 */}
          <div className="columns">
            <h4>About</h4>
            <ul className="list-unstyled">
              <li>
                This is one of my creations from many. I am passionate towards
                coding so created an E-commernce website out of interest.Also,
                free-lancing similar projects using ReactJS, Firebase and
                Stripe.
              </li>
            </ul>
          </div>
          {/* Column2 */}
          <div className="columns">
            <h4>Support</h4>
            <ul className="list-unstyled">
              <h5>Address</h5>
              <li>Delft, The Netherlands</li>

              <h5>Contact</h5>
              <li>+31-616393024 or +91-7077700170</li>
              <h5>Whatsapp</h5>
              <li>+31-616393024 or +91-7077700170</li>
              <h5>Email</h5>
              <li>saumyajit.parida@gmail.com</li>
              <h5>LinkedIn</h5>
              <li>https://www.linkedin.com/in/saumyajit65/</li>
              <h5>GitHub</h5>
              <li>https://github.com/saumyajit65</li>
            </ul>
          </div>
          {/* Column3 */}
          <div className="columns">
            <h4>Space for future details </h4>
            <li>For more details</li>
            <li>https://infallible-roentgen-1b3041.netlify.app/</li>
          </div>
        </div>
        <div className="Privacy">
          <p className="Bottom_privacy">
            &copy;{new Date().getFullYear()} Saumyajit Parida | All rights
            reserved | Terms Of Service | Privacy
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
