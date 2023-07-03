import axios from "axios"
import {
  FOOTBALL_API_HOST,
  FOOTBALL_API_KEY,
  FOOTBALL_API_URL,
} from "../constants/api";

const footballApi = (endpoint, params = {}) => {
  return axios({
    method: 'get',
    url: endpoint,
    baseURL: FOOTBALL_API_URL,
    headers: {
      "x-rapidapi-host": FOOTBALL_API_HOST,
      "x-rapidapi-key": FOOTBALL_API_KEY
    },
    params,
  });
}

export default footballApi;