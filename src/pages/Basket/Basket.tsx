import React from "react";
import { Routes, Route, Link } from "react-router-dom";

import MiniImagePreview from "../../Components/MiniImagePreview/MiniImagePreview";
import MiniCounter from "../../Components/MiniCounter/MiniCounter";

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

import {
  getCostOneBottle,
  getCommonCostBottles,
} from "../../utils/utilFunctions";

import "../../index.scss";
import styles from "./Basket.module.scss";

function Basket() {
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
                  <div className={styles.orders_list_item_desc}>
                    <MiniImagePreview thumbnail={order?.thumbnail || ""} />{" "}
                    <p>{order.descr}</p>
                  </div>
                  <div className={styles.orders_list_item_price}>
                    {getCostOneBottle(order.count)}₽
                  </div>
                  <div className={styles.orders_list_item_count}>
                    <MiniCounter orderCount={order.count} orderId={order.id} />
                  </div>
                  <div className={styles.orders_list_item_total_sum}>
                    {getCommonCostBottles(order.count)}₽
                  </div>
                </div>
              );
            })}
        </div>

        <div className={styles.orders_total_sum_wrapper}>
          итого: {/* @ts-ignore */}
          {basket.reduce((acc, curr) => {
            return acc + getCommonCostBottles(curr.count);
          }, 0)}
        </div>
      </div>
    </div>
  );
}

export default Basket;
