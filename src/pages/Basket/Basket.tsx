import React from "react";
import { Routes, Route, Link } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "../../app/store/hooks";
import {
  selectCount,
  selectStatus,
  selectSliderItems,
  reset,
  fetchSliderItems,
  setSelectedSliderItem,
} from "../../app/store/counterSlice";

import styles from "./Basket.module.scss";

function Basket() {
  const count = useAppSelector(selectCount);
  const status = useAppSelector(selectStatus);
  const images = useAppSelector(selectSliderItems);

  return (
    <div>
      <Link to="/water-ordering-app">Главная</Link>
      Корзина
      <br></br>
      <div className={styles.orders_list}>
        <div className={styles.orders_list_header}></div>
      </div>
    </div>
  );
}

export default Basket;
