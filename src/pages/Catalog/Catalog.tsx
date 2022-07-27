import { useState, useEffect, useRef } from "react";
import ImageGallery from "react-image-gallery";
import { Link } from "react-router-dom";

import clean_water from "../../app/assets/icons/clean_water.svg";
import softy_water from "../../app/assets/icons/softy_water.svg";
import oxigen_water from "../../app/assets/icons/oxigen_water.svg";
import tasty_water from "../../app/assets/icons/tasty_water.svg";
import bottle from "../../app/assets/icons/bottle.svg";
import timer from "../../app/assets/icons/timer.svg";

import MiniCounter from "../../Components/MiniCounter/MiniCounter";
import ModalWindowQuickOrder from "../../Components/ModalWindowQuickOrder/ModalWindowQuickOrder";

import { useAppSelector, useAppDispatch } from "../../app/store/hooks";
import {
  selectCount,
  reset,
  fetchSliderItems,
} from "../../app/store/counterSlice";

import { getWaterItems } from "../../api/api";

import { getCommonCostBottles } from "../../utils/utilFunctions";

import "../../index.scss";
import styles from "./Catalog.module.scss";

function Catalog() {
  const count = useAppSelector(selectCount);
  const dispatch = useAppDispatch();

  const [isModal, setModal] = useState(false);
  const [images, setImages] = useState([]);

  const option = {
    infinite: false,
    lazyLoad: true,
    onThumbnailClick: function show(e: any) {
      dispatch(reset());
      // console.log("e", e.target.closest("button"));
    },
  };

  useEffect(() => {
    // getWaterItems().then((json) => {
    //   console.log("Данные, полученные с сервера", json);
    //   setImages(json.data);
    // });
    dispatch(fetchSliderItems());
  }, []);

  const onClose = () => setModal(false);

  return (
    <div className={`container + ${styles.catalog_page}`}>
      <h1 className="page_heading mb_44">Каталог</h1>

      <div className={styles.slider_desc_wrapper}>
        <div className={styles.slider_block}>
          <ImageGallery {...option} items={images} />
          <div className={styles.slider_controls}></div>
        </div>

        <div className={styles.desc_block}>
          <h2 className={styles.desc_block_heading}>
            Вода питьевая «Suyum» <br /> в 18,9 л бутылях
          </h2>
          <p className="paragraph mb_16">
            Подходит для ежедневного питья и приготовления пищи. Характеризуется{" "}
            <br />
            приятным естественным вкусом, свежестью и мягкостью дождевой воды.
          </p>

          <div className={styles.properties_block}>
            <figure className={styles.properties_item}>
              <img src={clean_water} alt="Кристально очищена" />
              <figcaption>Кристально очищенная</figcaption>
            </figure>

            <figure className={styles.properties_item}>
              <img src={softy_water} alt="Идеально мягкая" />
              <figcaption>Идеально мягкая</figcaption>
            </figure>

            <figure className={styles.properties_item}>
              <img src={oxigen_water} alt="Насыщенная кислородом" />
              <figcaption>Насыщенная кислородом</figcaption>
            </figure>

            <figure className={styles.properties_item}>
              <img src={tasty_water} alt="Отличный вкус" />
              <figcaption>Отличный вкус</figcaption>
            </figure>
          </div>

          <div className={styles.prices_block}>
            <div
              className={
                count === 2 || count === 3
                  ? styles.prices_item_active
                  : styles.prices_item
              }
            >
              <div className={styles.prices_item_icon_wrapper}>
                <img src={bottle} alt="2-3 бутыля" width={13} height={20} />
                <span>2-3</span>
              </div>
              <p className={styles.price}>
                220 <span>₽</span>
              </p>
            </div>

            <div
              className={
                count >= 4 && count <= 9
                  ? styles.prices_item_active
                  : styles.prices_item
              }
            >
              <div className={styles.prices_item_icon_wrapper}>
                <img src={bottle} alt="4-9 бутылей" width={13} height={20} />
                <span>4-9</span>
              </div>
              <p className={styles.price}>
                185 <span>₽</span>
              </p>
            </div>

            <div
              className={
                count > 10 && count <= 20
                  ? styles.prices_item_active
                  : styles.prices_item
              }
            >
              <div className={styles.prices_item_icon_wrapper}>
                <img src={bottle} alt="10 бутылей" width={13} height={20} />
                <span>&gt;10</span>
              </div>
              <p className={styles.price}>
                165 <span>₽</span>
              </p>
            </div>

            <div
              className={
                count > 20 ? styles.prices_item_active : styles.prices_item
              }
            >
              <div className={styles.prices_item_icon_wrapper}>
                <img src={bottle} alt="20 бутылей" width={13} height={20} />
                <span>&gt;20</span>
              </div>
              <p className={styles.price}>
                200 <span>₽</span>
              </p>
            </div>
          </div>

          <div className={styles.buttons_block}>
            <MiniCounter />
            <p className={styles.total_sum}>
              <span>{getCommonCostBottles(count)}</span>
              <span>₽</span>
            </p>
            <Link to="/basket" className={styles.link_to_basket}>
              в корзину
            </Link>
            <button
              className={styles.buy_one_click}
              onClick={() => setModal(true)}
            >
              <img src={timer} alt="купить в 1 клик" />
              <span>купить в 1 клик</span>
            </button>
          </div>

          <p className={styles.annotation_block}>
            Минимальный заказ от 2 до 3 шт.
            <br /> Цена одного бутыля зависит от их количества в заказе. При
            заказе более 10 бутылей цена товара
            <br /> договорная. Заказывайте чистую питьевую воду в
            интернет-магазине!
          </p>
        </div>
      </div>

      <ModalWindowQuickOrder
        visible={isModal}
        title="Быстрый заказ"
        onClose={onClose}
      />
    </div>
  );
}

export default Catalog;
