import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './store'

import { getWaterItems } from '../../api/api'
import { initialMockData } from '../../utils/mockData'

type SliderItemType = {
  original?: string
  thumbnail?: string
  descr?: string
  id?: string
}

type OrderType = {
  original?: string
  thumbnail?: string
  descr?: string
  id?: string
  count?: number
}

export interface CounterState {
  value: number
  status: 'idle' | 'loading' | 'failed'
  basket?: OrderType[] | []
  sliderItems?: any[]
  selectedSliderItem?:
    | SliderItemType
    | {
        original: ''
        thumbnail: ''
        descr: ''
        id: ''
      }
  isOpenModalSuccess?: boolean
}

const initialState: CounterState = {
  value: 1,
  status: 'idle',
  basket: [],
  sliderItems: [],
  selectedSliderItem: {},
  isOpenModalSuccess: false,
}

export const fetchSliderItems = createAsyncThunk('counter/sliderItems', async () => {
  const response = await getWaterItems()
  console.log('response', response.data)
  return response.data
})

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value = state.value > 1 ? (state.value -= 1) : state.value
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    },
    reset: (state) => {
      state.value = 1
    },
    setCount: (state, action) => {
      state.value = action.payload
    },
    setSelectedSliderItem: (state, action) => {
      state.selectedSliderItem = action.payload
    },
    setStateOpenModalSuccess: (state, action) => {
      state.isOpenModalSuccess = action.payload
    },
    // Добавление в корзину (на странице "Каталог")
    // Уменьшение/Увеличение количества товара одного типа (клик по -/+ у конкретного товара в Корзине)
    updateBasket: (state, action) => {
      state.basket = action.payload
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchSliderItems.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchSliderItems.fulfilled, (state, action) => {
        state.status = 'idle'
        state.sliderItems = action.payload
        state.selectedSliderItem = action.payload[0] || {}
      })
      .addCase(fetchSliderItems.rejected, (state) => {
        state.status = 'failed'
        state.sliderItems = initialMockData
        state.selectedSliderItem = initialMockData[0] || {}
      })
  },
})

export const {
  increment,
  decrement,
  reset,
  setCount,
  setSelectedSliderItem,
  setStateOpenModalSuccess,
  updateBasket,
  incrementByAmount,
} = counterSlice.actions

// Выбрать значение из стора
export const selectCount = (state: RootState) => state.counter.value
export const selectSliderItem = (state: RootState) => state.counter.selectedSliderItem
export const selectBasket = (state: RootState) => state.counter.basket

export const selectStatus = (state: RootState) => state.counter.status
export const selectSliderItems = (state: RootState) => state.counter.sliderItems

export default counterSlice.reducer
