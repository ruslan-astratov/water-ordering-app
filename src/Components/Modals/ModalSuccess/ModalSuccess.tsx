import { useEffect } from "react";

import "../../../index.scss";
import styles from "../Modals.module.scss";

interface ModalWindowProps {
  visible: boolean;
  onClose: () => void;
}

const ModalSuccess = ({
  visible = false,
  onClose = () => {},
}: ModalWindowProps) => {
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
          <h3>Ваш заказ находится в обработке. Ждите…</h3>

          <span
            className={styles.modal_close}
            onClick={onClose}
            aria-hidden="true"
          ></span>
        </div>
      </div>
    </div>
  );
};

export default ModalSuccess;
