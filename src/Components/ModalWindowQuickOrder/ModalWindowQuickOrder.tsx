import React, { useEffect, useState } from "react";
import mini_image_preview from "../../app/assets/images/mini_image_preview.png";
import cn from "classnames";

import { useAppSelector, useAppDispatch } from "../../app/store/hooks";
import {
  selectSliderItems,
  selectSliderItemID,
} from "../../app/store/counterSlice";

import styles from "./ModalWindowQuickOrder.module.scss";

interface ModalWindowProps {
  visible: boolean;
  title: string;
  onClose: () => void;
}

const ModalWindowQuickOrder = ({
  visible = false,
  title = "",
  onClose = () => {},
}: ModalWindowProps) => {
  const idSelectedItem = useAppSelector(selectSliderItemID);
  const sliderItems = useAppSelector(selectSliderItems);

  // создаем обработчик нажатия клавиши Esc
  //   Поправить event: any
  const onKeydown = (event: any) => {
    if (event.key === "Escape") {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", onKeydown);
    return () => document.removeEventListener("keydown", onKeydown);
  });

  // если компонент невидим, то не отображаем его
  if (!visible) return null;

  // или возвращаем верстку модального окна
  return (
    <div className={styles.modal} onClick={onClose} aria-hidden="true">
      <div
        className={styles.modal_dialog}
        onClick={(e) => e.stopPropagation()}
        aria-hidden="true"
      >
        <div className={styles.modal_header}>
          <h3>{title}</h3>
          <span
            className={styles.modal_close}
            onClick={onClose}
            aria-hidden="true"
          >
            {/* <img alt="Facebook" src={close_icon} /> */}
          </span>
        </div>

        <div className={styles.modal_body}>
          <div className={styles.order_item_block}>
            <figure className={styles.order_item_img_desc_wrapp}>
              <img src={mini_image_preview} alt="Мини превью" />
              <figcaption>Вода питьевая "Suyum" в 18,9 л бутылях</figcaption>
            </figure>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalWindowQuickOrder;
