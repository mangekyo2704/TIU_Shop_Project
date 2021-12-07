import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Grid from "./Grid";

const Slider = props => {
  const { data, timeOut = 3000, auto = true, control = true } = props;
  const [activeSlider, setActiveSlider] = useState(0);
  console.log(control);
  const nextSlider = () => {
    const index = activeSlider + 1 === data.length ? 0 : activeSlider + 1;
    setActiveSlider(index);
  };

  const preSlider = () => {
    const index = activeSlider - 1 === -1 ? data.length - 1 : activeSlider - 1;
    setActiveSlider(index);
  };

  useEffect(() => {
    if (auto) {
      const slideAuto = setInterval(() => {
        // nextSlider();
      }, timeOut);

      return () => {
        clearInterval(slideAuto);
      };
    }
  }, [nextSlider, timeOut, auto]);
  return (
    <div className="slider">
      {data.map((item, index) => (
        <SliderItem key={index} item={item} active={index === activeSlider} />
      ))}
      {control ? (
        <div className="slider__control">
          <div className="slider__control__item" onClick={preSlider}>
            <i className="bx bx-chevron-left"></i>
          </div>
          <div className="slider__control__item" onClick={nextSlider}>
            <i className="bx bx-chevron-right"></i>
          </div>
        </div>
      ) : null}
    </div>
  );
};

const SliderItem = props => (
  <div className={`slider__item ${props.active ? "active" : ""}`}>
    <div className={`slider__item__info ${props.active ? "active" : ""}`}>
      <div className="slider__item__info__title">
        <h2>{props.item.title}</h2>
      </div>
      <div className="slider__item__info__description">
        <span>{props.item.description}</span>
      </div>
      <div className="slider__item__info__btn">
        <Link to="/">
          <button>Shop Now</button>
        </Link>
      </div>
    </div>
    <Grid col={2}>
      <div className={`slider__item__image ${props.active ? "active" : ""}`}>
        <img src={props.item.path[0]} alt="" />
      </div>
      <div className={`slider__item__image ${props.active ? "active" : ""}`}>
        <img src={props.item.path[1]} alt="" />
      </div>
    </Grid>
  </div>
);

Slider.propTypes = {
  data: PropTypes.array.isRequired,
  control: PropTypes.bool,
  auto: PropTypes.bool,
  timeOut: PropTypes.number
};

export default Slider;
