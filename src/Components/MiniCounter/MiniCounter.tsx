import React from "react";

import { useAppSelector, useAppDispatch } from "../../app/store/hooks";
import {
  decrement,
  increment,
  selectCount,
} from "../../app/store/counterSlice";

import minus_icon from "../../app/assets/icons/minus_icon.svg";
import plus_icon from "../../app/assets/icons/plus_icon.svg";

import styles from "./MiniCounter.module.scss";

interface MiniCounterProps {
  orderCount?: number | null | undefined;
}

const MiniCounter = ({ orderCount = null }: MiniCounterProps) => {
  const count = useAppSelector(selectCount);
  const dispatch = useAppDispatch();

  return (
    <div className={styles.mini_counter}>
      <div
        className={styles.mini_counter_decrement_button}
        onClick={() => dispatch(decrement())}
      >
        {" "}
        <img src={minus_icon} alt="Уменьшить количество" />
      </div>

      <div className={styles.count_value}>{orderCount || count}</div>

      <div
        className={styles.mini_counter_increment_button}
        onClick={() => dispatch(increment())}
      >
        {" "}
        <img src={plus_icon} alt="Увеличить количество" />
      </div>
    </div>
  );
};

export default MiniCounter;
