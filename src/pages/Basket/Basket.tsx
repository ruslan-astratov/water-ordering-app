import React from "react";
import { Routes, Route, Link } from "react-router-dom";

import styles from "./Basket.module.scss";

function Basket() {
  console.log("Рендер Basket");
  return (
    <div>
      Корзина
      <br></br>
      <Link to="/">Главная</Link>
    </div>
  );
}

export default Basket;
