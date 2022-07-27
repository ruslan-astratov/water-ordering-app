import http from "../utils/axiosConfig";

export const getWaterItems = () =>
  http.get(process.env.REACT_APP_MOCK_API_WATER_ITEMS);

export const sendQuickOrder = (data) =>
  http.post(process.env.REACT_APP_MOCK_API_SEND_QUICK_ORDER, data);

export const sendOrder = (data) =>
  http.post(process.env.REACT_APP_MOCK_API_SEND_ORDER, data);
