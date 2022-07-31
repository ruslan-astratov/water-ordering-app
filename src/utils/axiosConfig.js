import axios from 'axios'
// import { toast } from 'react-toastify';

const http = axios.create({
  baseURL: `${process.env.REACT_APP_MOCK_API_BASE_URL}`,
  headers: {},
})

http.init = () => {}

http.interceptors.response.use(
  (response) => {
    return response
  },
  (err) => {
    console.log('err', err)
    return Promise.reject(err)
  },
)

export default http
