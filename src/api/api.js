import axios from "axios"
import { FOOTDA_API_URL } from "../constants";

const footdaApi = (endpoint, params = {}) => {
  return axios({
    method: 'get',
    url: endpoint,
    baseURL: FOOTDA_API_URL,
    params,
  });
}

export default footdaApi;