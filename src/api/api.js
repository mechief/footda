import axios from "axios"

const FOOTDA_API_URL = 'http://localhost:3002';

const footdaApi = (endpoint, params = {}) => {
  return axios({
    method: 'get',
    url: endpoint,
    baseURL: FOOTDA_API_URL,
    params,
  });
}

export default footdaApi;