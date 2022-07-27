import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "./store";
import { fetchCount } from "../../features/counter/counterAPI";

import { getWaterItems } from "../../api/api";

type SliderItemType = {
  original?: string;
  thumbnail?: string;
  descr?: string;
  id?: string;
};

export interface CounterState {
  value: number;
  status: "idle" | "loading" | "failed";
  basket?: Number[] | [];
  sliderItems?: [];
  selectedSliderItem?:
    | SliderItemType
    | {
        original: "";
        thumbnail: "";
        descr: "";
        id: "";
      };
}

const initialState: CounterState = {
  value: 1,
  status: "idle",
  basket: [],
  sliderItems: [],
  selectedSliderItem: {},
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const incrementAsync = createAsyncThunk(
  "counter/fetchCount",
  async (amount: number) => {
    const response = await fetchCount(amount);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchSliderItems = createAsyncThunk(
  "counter/sliderItems",
  async () => {
    const response = await getWaterItems();
    console.log("response", response.data);
    return response.data;
  }
);

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value = state.value > 1 ? (state.value -= 1) : state.value;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
    reset: (state) => {
      state.value = 1;
    },
    setSelectedSliderItem: (state, action) => {
      state.selectedSliderItem = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      // .addCase(incrementAsync.pending, (state) => {
      //   state.status = "loading";
      // })
      // .addCase(incrementAsync.fulfilled, (state, action) => {
      //   state.status = "idle";
      //   state.value += action.payload;
      // })
      // .addCase(incrementAsync.rejected, (state) => {
      //   state.status = "failed";
      // })

      .addCase(fetchSliderItems.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSliderItems.fulfilled, (state, action) => {
        state.status = "idle";
        state.sliderItems = action.payload;
        state.selectedSliderItem = action.payload[0] || {};
      })
      .addCase(fetchSliderItems.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const {
  increment,
  decrement,
  reset,
  setSelectedSliderItem,
  incrementByAmount,
} = counterSlice.actions;

// Выбрать значение из стора
export const selectCount = (state: RootState) => state.counter.value;
export const selectSliderItems = (state: RootState) =>
  state.counter.sliderItems;
export const selectSliderItem = (state: RootState) =>
  state.counter.selectedSliderItem;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
export const incrementIfOdd =
  (amount: number): AppThunk =>
  (dispatch, getState) => {
    const currentValue = selectCount(getState());
    if (currentValue % 2 === 1) {
      dispatch(incrementByAmount(amount));
    }
  };

export default counterSlice.reducer;
