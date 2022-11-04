import axios from "axios"

const FOOTBALL_API_HOST = 'v3.football.api-sports.io';
const FOOTBALL_API_KEY = 'f4df44c38155f4f74c1cf423b0fa2971';
const FOOTBALL_API_URL = 'https://v3.football.api-sports.io';

export const FOOTBALL_API_TIMEZONE = 'Asia/Seoul';

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