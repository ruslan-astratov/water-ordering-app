import { useState, useEffect } from "react";

import ImageGallery from "react-image-gallery";
import { useNavigate } from "react-router-dom";

import clean_water from "../../app/assets/icons/clean_water.svg";
import softy_water from "../../app/assets/icons/softy_water.svg";
import oxigen_water from "../../app/assets/icons/oxigen_water.svg";
import tasty_water from "../../app/assets/icons/tasty_water.svg";
import bottle from "../../app/assets/icons/bottle.svg";
import timer from "../../app/assets/icons/timer.svg";

import MiniCounter from "../../Components/MiniCounter/MiniCounter";
import ModalWindowQuickOrder from "../../Components/Modals/ModalWindowQuickOrder/ModalWindowQuickOrder";
import ModalSuccess from "../../Components/Modals/ModalSuccess/ModalSuccess";

import Loader from "../../Components/Loader/Loader";

import { useAppSelector, useAppDispatch } from "../../app/store/hooks";
import {
  selectCount,
  selectStatus,
  selectBasket,
  selectSliderItem,
  selectSliderItems,
  reset,
  setCount,
  updateBasket,
  fetchSliderItems,
  setSelectedSliderItem,
} from "../../app/store/counterSlice";

import { getCommonCostBottles } from "../../utils/utilFunctions";

import "../../index.scss";
import styles from "./Catalog.module.scss";

function Catalog() {
  const navigate = useNavigate();
  const [isOpenModalQuickOder, setOpenModalQuickOder] = useState(false);
  const onCloseModalQuickOder = () => setOpenModalQuickOder(false);

  const [isOpenModalSuccess, setOpenModalSuccess] = useState(false);
  const onCloseModalSuccess = () => setOpenModalSuccess(false);

  const order_status = JSON.parse(localStorage.getItem("order_status"));

  if (order_status === "Оформили заказ" && !isOpenModalSuccess) {
    setOpenModalSuccess(true);
    localStorage.removeItem("order_status");
  }

  const count = useAppSelector(selectCount);
  const selectedItem = useAppSelector(selectSliderItem);
  const basket = useAppSelector(selectBasket);

  const status = useAppSelector(selectStatus);
  const images = useAppSelector(selectSliderItems);

  const dispatch = useAppDispatch();

  const option = {
    infinite: false,
    lazyLoad: true,
    onSlide: function show(e: number) {
      console.log("Номер выбранного слайда", e + 1);
      const selectedSlideID = e + 1;

      const selectedItem = (images as any[])?.find(
        (i) => Number(i.id) === selectedSlideID
      );
      // Здесь диспатчим в стор выбранный слайд
      dispatch(setSelectedSliderItem(selectedItem));
      dispatch(reset());
    },
    onThumbnailClick: function show(e: any) {
      dispatch(reset());
    },
  };

  useEffect(() => {
    if (images?.length === 0) {
      dispatch(fetchSliderItems());
    }
  }, []);

  const successSubmit = () => {
    setOpenModalQuickOder(false);
    setTimeout(() => setOpenModalSuccess(true), 200);
  };

  const hanleClickAddToBasket = () => {
    // Здесь будет логика: если у нас в корзине уже присутствует данный тип воды,
    // то просто прибавим к уже имеющейся воде этого типа - выбранное количество бутылей
    // Если в корзине этого типа ещё нет, значит, создаём

    let findedItem = basket?.find((i) => i.id === selectedItem?.id);

    if (findedItem) {
      let newBasket = basket?.map((order) => {
        if (order.id === findedItem?.id) {
          return { ...order, count: count + order?.count };
        } else return order;
      });
      dispatch(updateBasket(newBasket));
    } else {
      const newOrder = { ...selectedItem, count: count };

      const newBasketWithAddedOrder = (basket as any[]).concat(newOrder);
      dispatch(updateBasket(newBasketWithAddedOrder));
    }

    navigate("/basket");
  };

  if (status === "loading") return <Loader />;

  return (
    <div className={`container + ${styles.catalog_page}`}>
      <h1 className="page_heading mb_44">Каталог</h1>

      <div className={styles.slider_desc_wrapper}>
        <div className={styles.slider_block}>
          <ImageGallery {...option} items={images || []} />
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
              onClick={() => dispatch(setCount(2))}
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
              onClick={() => dispatch(setCount(4))}
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
              onClick={() => dispatch(setCount(11))}
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
              onClick={() => dispatch(setCount(21))}
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

            <div
              onClick={hanleClickAddToBasket}
              className={styles.link_to_basket}
            >
              в корзину
            </div>
            <button
              className={styles.buy_one_click}
              onClick={() => setOpenModalQuickOder(true)}
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

      {isOpenModalQuickOder && (
        <ModalWindowQuickOrder
          visible={isOpenModalQuickOder}
          title="Быстрый заказ"
          onClose={onCloseModalQuickOder}
          successSubmit={successSubmit}
        />
      )}
      {isOpenModalSuccess && (
        <ModalSuccess
          visible={isOpenModalSuccess}
          onClose={onCloseModalSuccess}
        />
      )}
    </div>
  );
}

export default Catalog;
