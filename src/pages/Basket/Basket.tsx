import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import MiniImagePreview from '../../Components/MiniImagePreview/MiniImagePreview'
import MiniCounter from '../../Components/MiniCounter/MiniCounter'

import { useAppSelector, useAppDispatch } from '../../app/store/hooks'
import { selectBasket, updateBasket } from '../../app/store/counterSlice'

import { getCostOneBottle, getCommonCostBottles } from '../../utils/utilFunctions'

import { sendOrder } from '../../api/api'

import '../../index.scss'
import styles from './Basket.module.scss'

function Basket() {
  const [isSending, setIsSending] = useState(false)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const basket = useAppSelector(selectBasket)

  useEffect(() => {
    if (basket?.length === 0) navigate('/water-ordering-app')
  }, [])

  const handleSubmit = async () => {
    setIsSending(true)

    const payload = basket?.map((order) => {
      return { order_id: order.id, order_count: order.count }
    })

    await sendOrder(payload)
      .then((data) => {
        console.log('Данные, полученные с POST запроса', data)
        // Очищаем корзину
        dispatch(updateBasket([]))
        localStorage.setItem('order_status', JSON.stringify('Оформили заказ'))
        navigate('/water-ordering-app')
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => setIsSending(false))
  }

  return (
    <div className='container basket-page'>
      <Link className={styles.link_to_catalog} to='/water-ordering-app'>
        Главная
      </Link>
      <h1 className='page_heading'>Корзина</h1>
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
                    <MiniImagePreview thumbnail={order?.thumbnail || ''} /> <p>{order.descr}</p>
                  </div>
                  <div className={styles.orders_list_item_price}>
                    <p>{getCostOneBottle(order.count)}</p>
                    <span>₽</span>
                  </div>
                  <div className={styles.orders_list_item_count}>
                    <MiniCounter orderCount={order.count} orderId={order.id} />
                  </div>
                  <div className={styles.orders_list_item_total_sum}>
                    <p>{getCommonCostBottles(order.count)}</p>
                    <span>₽</span>
                  </div>
                </div>
              )
            })}
        </div>

        <div className={styles.orders_total_sum_wrapper}>
          итого:
          {(basket as any[]).reduce((acc, curr) => {
            return acc + getCommonCostBottles(curr.count)
          }, 0)}
          ₽
        </div>

        <button disabled={isSending} onClick={handleSubmit} className={styles.form_submit_button}>
          Отправить
        </button>
      </div>
    </div>
  )
}

export default Basket
