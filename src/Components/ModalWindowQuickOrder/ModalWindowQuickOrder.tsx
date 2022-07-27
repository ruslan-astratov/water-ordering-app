import React, { useEffect, useState } from "react";
import mini_image_preview from "../../app/assets/images/mini_image_preview.png";
import cn from "classnames";

import { useAppSelector, useAppDispatch } from "../../app/store/hooks";
import { selectSliderItem } from "../../app/store/counterSlice";

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
  const selectedItem = useAppSelector(selectSliderItem);

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
              <img src={selectedItem?.thumbnail} alt="Мини превью" />
              <figcaption>{selectedItem?.descr}</figcaption>
            </figure>
          </div>

          <form className={styles.form}>
            <div className={styles.form_item}>
              <input type="text" className={styles.form_input} required />
              <label className={styles.form_label}>
                Ваше имя или название компании
              </label>
            </div>

            <div className={styles.form_item}>
              <input type="text" className={styles.form_input} required />
              <label className={styles.form_label}>Телефон </label>
            </div>

            <div className={styles.form_item}>
              <input type="text" className={styles.form_input} required />
              <label className={styles.form_label}>E-mail</label>
            </div>

            {/* <button type="submit">Submit</button> */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalWindowQuickOrder;
