import React from "react";
import "./Home.css";
import Product from "./Product";
//import *./ styles.css *;

//to insert any text into the div / (<div/>)  just enter like this <p> I am the home component</p>;
// reference site for images http://www.pngmart.com/, pngimg.com
import Carousel from "react-elastic-carousel";
import styled from "styled-components";
//for making a carousel
const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 },
];

function Home() {
  return (
    <div className="home">
      <div
        className="home_container" //https://linkpicture.com/en/index.php all images are here
      >
        <Carousel>
          <img
            className="home_img"
            src="https://www.linkpicture.com/q/1_335.jpg"
            alt=""
          />
          <img
            className="home_img"
            src="https://www.linkpicture.com/q/2_126.png"
            alt=""
          />
          <img
            className="home_img"
            src="https://www.linkpicture.com/q/3_211.jpg"
            alt=""
          />
          <img
            className="home_img"
            src="https://www.linkpicture.com/q/4_184.jpg"
            alt=""
          />
        </Carousel>

        <div className="home_row">
          <Product
            ID="A123"
            title="Apple iphone"
            image="http://www.pngmart.com/files/8/Apple-iPhone-PNG-Clipart-Background.png"
            price={60000.56}
            rating={4}
          />
          <Product
            ID="A123"
            title="Computer Printer"
            image="http://www.pngmart.com/files/6/Computer-Printer-PNG-Picture.png"
            price={2500.65}
            rating={3}
          />
        </div>

        <div className="home_row">
          <Product
            ID="A123"
            title="Evaporative Air Cooler"
            image="http://www.pngmart.com/files/7/Evaporative-Air-Cooler-Transparent-Background.png"
            price={26500.32}
            rating={2}
          />
          <Product
            ID="A123"
            title="Denim Jean"
            image="http://www.pngmart.com/files/7/Denim-Jean-PNG-Transparent-Picture.png"
            price={3212.55}
            rating={5}
          />
          <Product
            ID="A123"
            title="Garden Tools"
            image="http://www.pngmart.com/files/8/Shovel-Tools-PNG-Transparent-Image.png"
            price={2987.23}
            rating={5}
          />
        </div>

        <div className="home_row">
          <Product
            ID="A123"
            title="LED TV"
            image="http://www.pngmart.com/files/7/LED-Television-Transparent-Background.png"
            price={21520.25}
            rating={2}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
