import React, { useEffect, useState } from "react";
import MiniCounter from "../../Components/MiniCounter/MiniCounter";

import { useAppSelector, useAppDispatch } from "../../app/store/hooks";
import { selectSliderItem, selectCount } from "../../app/store/counterSlice";
import { getCommonCostBottles } from "../../utils/utilFunctions";

import { sendQuickOrder } from "../../api/api";

import "../../index.scss";
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
  const [haveСontainer, setHaveСontainer] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [nameCompany, setNameCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const selectedItem = useAppSelector(selectSliderItem);
  const count = useAppSelector(selectCount);

  // создаем обработчик нажатия клавиши Esc
  //   Поправить event: any
  const onKeydown = (event: any) => {
    if (event.key === "Escape") {
      onClose();
    }
  };

  const handleSubmit = async () => {
    const payload = {
      count: 5,
      total_sum: 5,
      have_container: false,
      company_name: "ООО Кодеры",
      phone: "+79186765060",
      email: "ruslan.astratov@yandex.ru",
    };
    await sendQuickOrder(payload).then((data) => {
      console.log("Данные, полученные с POST запроса", data);
    });
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

            <div className={styles.counter_and_value_wrapp}>
              <div className={styles.counter_wrapp}>
                <MiniCounter />
              </div>

              <p className={styles.total_sum}>
                <span>{getCommonCostBottles(count)}</span>
                <span>₽</span>
              </p>

              <div className={styles.switch_toggle_desc_wrapp}>
                <span
                  className={
                    haveСontainer
                      ? styles.switch_toggle_desc_active
                      : styles.switch_toggle_desc
                  }
                >
                  Без тары
                </span>
                <label className="checkbox-ios">
                  <input
                    type="checkbox"
                    onChange={() => setHaveСontainer(!haveСontainer)}
                  />
                  <span className="checkbox-ios-switch"></span>
                </label>
                <span
                  className={
                    !haveСontainer
                      ? styles.switch_toggle_desc_active
                      : styles.switch_toggle_desc
                  }
                >
                  Тара есть
                </span>
              </div>
            </div>
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

            <button
              className={styles.form_submit_button}
              onClick={handleSubmit}
            >
              Отправить
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalWindowQuickOrder;
