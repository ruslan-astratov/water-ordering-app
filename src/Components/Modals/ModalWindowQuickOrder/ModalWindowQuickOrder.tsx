import React, { useEffect, useState } from 'react'
import MiniCounter from '../../../Components/MiniCounter/MiniCounter'
import MiniImagePreview from '../../../Components/MiniImagePreview/MiniImagePreview'

import InputMask from 'react-input-mask'

import { useAppSelector } from '../../../app/store/hooks'
import { selectSliderItem, selectCount } from '../../../app/store/counterSlice'
import { getCommonCostBottles } from '../../../utils/utilFunctions'

import { sendQuickOrder } from '../../../api/api'

import { phoneRegex, emailRegex } from '../../../utils/regexp'

import '../../../index.scss'
import styles from '../Modals.module.scss'

interface ModalWindowProps {
  visible: boolean
  title: string
  onClose: () => void
  successSubmit: () => void
}

const ModalWindowQuickOrder = ({
  visible = false,
  title = '',
  onClose = () => {},
  successSubmit = () => {},
}: ModalWindowProps) => {
  const [isSending, setIsSending] = useState(false)

  const [haveСontainer, setHaveСontainer] = useState(false)
  const [isDisabledSendButton, toggleDisabledSendButton] = useState(true)

  const [nameCompany, setNameCompany] = useState('')
  const [isValidNameCompany, toggleValidNameCompany] = useState(false)

  const [phone, setPhone] = useState('')
  const [isValidPhone, toggleValidPhone] = useState(false)

  const [email, setEmail] = useState('')
  const [isValidEmail, toggleValidEmail] = useState(false)

  // Управление позицией лейбла - в маске для ввода телефона
  const [isHideLabel, toggleHideLabel] = useState(false)
  const hideLabel = () => {
    toggleHideLabel(true)
  }

  const selectedItem = useAppSelector(selectSliderItem)
  const count = useAppSelector(selectCount)

  // Метод блокировки/разблокировки кнопки. Смотрим - заполнены ли все три обязательных поля + если заполнены, все они должны быть валидны
  // Будет срабатывать как при блюре/выходе из каждого инпута, так и при вводе символов в каждый инпут
  const checkFieldsOnValid = () => {
    if (nameCompany && phone && email && isValidNameCompany && isValidPhone && isValidEmail) {
      toggleDisabledSendButton(false)
    } else toggleDisabledSendButton(true)
  }

  useEffect(() => {
    // Метод блокировки, разблокировки будет срабатывать каждый раз - при вводе в любой из инпутов
    checkFieldsOnValid()
  }, [nameCompany, phone, email, isDisabledSendButton])

  // создаем обработчик нажатия клавиши Esc
  //   Поправить event: any
  const onKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      onClose()
    }
  }

  const checkValidInputCompanyName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setNameCompany(val)
    // Сначала валидируем сам инпут, затем запускаем метод блокировки/разблокировки кнопки
    if (val && val.length >= 3 && val.length <= 256) {
      toggleValidNameCompany(true)
      setTimeout(() => checkFieldsOnValid(), 0)
    } else {
      toggleValidNameCompany(false)
    }
  }

  const checkValidInputPhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    if (val === '') toggleHideLabel(false)
    setPhone(val)

    // Сначала валидируем сам инпут, затем запускаем метод блокировки/разблокировки кнопки
    if (val.length > 0 && phoneRegex.test(val)) {
      toggleValidPhone(true)
      setTimeout(() => checkFieldsOnValid(), 0)
    } else {
      toggleValidPhone(false)
    }
  }

  const checkValidInputEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setEmail(val)
    // Сначала валидируем сам инпут, затем запускаем метод блокировки/разблокировки кнопки
    if (val && emailRegex.test(val)) {
      toggleValidEmail(true)
      setTimeout(() => checkFieldsOnValid(), 0)
    } else {
      toggleValidEmail(false)
    }
  }

  const handleSubmit = async () => {
    setIsSending(true)

    const payload = {
      count,
      total_sum: getCommonCostBottles(count),
      have_container: haveСontainer,
      company_name: nameCompany,
      phone,
      email,
    }
    await sendQuickOrder(payload)
      .then((data) => {
        console.log('Данные, полученные с POST запроса', data)
        successSubmit()
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setIsSending(false)
      })
  }

  const showInvalidDescForNameCompany = nameCompany && !isValidNameCompany
  const showInvalidDescForPhone = phone !== '' && phone !== '+7 (___) ___-__-__' && !isValidPhone
  const showInvalidDescForEmail = email && !isValidEmail

  useEffect(() => {
    document.addEventListener('keydown', onKeydown)
    return () => document.removeEventListener('keydown', onKeydown)
  })

  // если компонент невидим, то не отображаем его
  if (!visible) return null

  // или возвращаем верстку модального окна
  return (
    <div className={styles.modal} onClick={onClose} aria-hidden='true'>
      <div className={styles.modal_dialog} onClick={(e) => e.stopPropagation()} aria-hidden='true'>
        <div className={styles.modal_header}>
          <h3>{title}</h3>
          <span className={styles.modal_close} onClick={onClose} aria-hidden='true'>
            {/* <img alt="Facebook" src={close_icon} /> */}
          </span>
        </div>

        <div className={styles.modal_body}>
          <div className={styles.order_item_block}>
            <figure className={styles.order_item_img_desc_wrapp}>
              <MiniImagePreview thumbnail={selectedItem?.thumbnail || ''} />{' '}
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
                    haveСontainer ? styles.switch_toggle_desc_active : styles.switch_toggle_desc
                  }
                >
                  Без тары
                </span>
                <label className='checkbox-ios'>
                  <input type='checkbox' onChange={() => setHaveСontainer(!haveСontainer)} />
                  <span className='checkbox-ios-switch'></span>
                </label>
                <span
                  className={
                    !haveСontainer ? styles.switch_toggle_desc_active : styles.switch_toggle_desc
                  }
                >
                  Тара есть
                </span>
              </div>
            </div>
          </div>

          <form className={styles.form}>
            <div className={styles.form_item}>
              <input
                type='text'
                maxLength={256}
                className={
                  showInvalidDescForNameCompany ? styles.form_input_invalid : styles.form_input
                }
                required
                value={nameCompany}
                onChange={(e) => checkValidInputCompanyName(e)}
                onBlur={(e) => checkValidInputCompanyName(e)}
              />
              <label className={styles.form_label}>Ваше имя или название компании</label>
              {showInvalidDescForNameCompany && (
                <span className={styles.form_input_invalid_decr}>
                  допускается строка длиной от трёх символов
                </span>
              )}
            </div>

            <div className={styles.form_item}>
              <InputMask
                mask='+7 (999) 999-99-99'
                value={phone}
                onChange={(e) => checkValidInputPhone(e)}
                onBlur={(e) => checkValidInputPhone(e)}
                onFocus={hideLabel}
                className={showInvalidDescForPhone ? styles.form_input_invalid : styles.form_input}
              />
              <label className={isHideLabel ? styles.form_label : styles.form_label_active}>
                Телефон{' '}
              </label>
            </div>

            <div className={styles.form_item}>
              <input
                type='text'
                className={showInvalidDescForEmail ? styles.form_input_invalid : styles.form_input}
                required
                value={email}
                onChange={(e) => checkValidInputEmail(e)}
                onBlur={(e) => checkValidInputEmail(e)}
              />
              <label className={styles.form_label}>E-mail</label>
            </div>

            <button
              disabled={isDisabledSendButton || isSending}
              className={
                !isSending && !isDisabledSendButton
                  ? styles.form_submit_button
                  : styles.form_submit_button_disabled
              }
              onClick={handleSubmit}
            >
              Отправить
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ModalWindowQuickOrder
