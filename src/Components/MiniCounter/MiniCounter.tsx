import React from "react";

import { useAppSelector, useAppDispatch } from "../../app/store/hooks";
import {
  decrement,
  increment,
  selectCount,
  updateBasket,
  selectBasket,
} from "../../app/store/counterSlice";

import minus_icon from "../../app/assets/icons/minus_icon.svg";
import plus_icon from "../../app/assets/icons/plus_icon.svg";

import styles from "./MiniCounter.module.scss";

interface MiniCounterProps {
  orderCount?: number | null | undefined;
  orderId?: string | null | undefined;
}

const MiniCounter = ({
  orderCount = null,
  orderId = null,
}: MiniCounterProps) => {
  const count = useAppSelector(selectCount);
  const basket = useAppSelector(selectBasket);

  const dispatch = useAppDispatch();

  const calculateCountOneEl = (action: string) => {
    if (action === "-") {
      if (orderCount === 1) {
        // Удаляем этот тип товара из корзины
        const filteredBasket = basket?.filter((order) => order.id !== orderId);
        dispatch(updateBasket(filteredBasket));
      } else {
        // Уменьшаем количество  товара данного типа на 1
        const newBasket = basket?.map((order) => {
          if (order.id === orderId) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignores
            return { ...order, count: order?.count - 1 };
          } else return order;
        });
        dispatch(updateBasket(newBasket));
      }
    } else {
      // Увеличиваем количество  товара данного типа на 1
      const newBasket = basket?.map((order) => {
        if (order.id === orderId) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignores
          return { ...order, count: order?.count + 1 };
        } else return order;
      });
      dispatch(updateBasket(newBasket));
    }
  };

  return (
    <div className={styles.mini_counter}>
      <div
        className={styles.mini_counter_decrement_button}
        onClick={() =>
          orderCount ? calculateCountOneEl("-") : dispatch(decrement())
        }
      >
        {" "}
        <img src={minus_icon} alt="Уменьшить количество" />
      </div>

      <div className={styles.count_value}>{orderCount || count}</div>

      <div
        className={styles.mini_counter_increment_button}
        onClick={() =>
          orderCount ? calculateCountOneEl("+") : dispatch(increment())
        }
      >
        {" "}
        <img src={plus_icon} alt="Увеличить количество" />
      </div>
    </div>
  );
};

export default MiniCounter;
