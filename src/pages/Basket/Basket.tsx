import React from "react";
import { Routes, Route, Link } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "../../app/store/hooks";
import {
  selectCount,
  selectStatus,
  selectSliderItems,
  reset,
  selectBasket,
  fetchSliderItems,
  setSelectedSliderItem,
} from "../../app/store/counterSlice";

import "../../index.scss";
import styles from "./Basket.module.scss";

function Basket() {
  // const count = useAppSelector(selectCount);
  // const status = useAppSelector(selectStatus);
  // const images = useAppSelector(selectSliderItems);
  const basket = useAppSelector(selectBasket);

  return (
    <div className="container basket-page">
      <Link className={styles.link_to_catalog} to="/water-ordering-app">
        Главная
      </Link>
      <h1 className="page_heading">Корзина</h1>
      <br></br>
      <div className={styles.orders_list}>
        <div className={styles.orders_list_header}>
          <div className={styles.orders_list_item_desc}></div>
          <div className={styles.orders_list_item_price}>Стоимость</div>
          <div className={styles.orders_list_item_count}>Кол-во</div>
          <div className={styles.orders_list_item_total_sum}>Сумма</div>
        </div>
        <div className={styles.orders_list_items}>
          {!!basket?.length &&
            basket.map((order) => {
              return (
                <div className={styles.orders_list_item} key={order.id}>
                  <div className={styles.orders_list_item_desc}></div>
                  <div className={styles.orders_list_item_price}></div>
                  <div className={styles.orders_list_item_count}></div>
                  <div className={styles.orders_list_item_total_sum}></div>
                  <div></div>
                </div>
              );
            })}
        </div>

        <div className={styles.orders_total_sum_wrapper}>итого: </div>
      </div>
    </div>
  );
}

export default Basket;
