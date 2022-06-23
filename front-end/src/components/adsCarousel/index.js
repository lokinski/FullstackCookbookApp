import React, { Component } from "react";
import { Carousel } from "react-bootstrap";

class AdsCarousel extends Component {
  render() {
    return (
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={window.location.origin + "/img/sample_ad.png"}
            alt="Ad"
          />
        </Carousel.Item>
      </Carousel>
    );
  }
}

export default AdsCarousel;
