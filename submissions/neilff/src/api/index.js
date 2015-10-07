import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

function get(url) {
  return axios.get(url);
}

function fetchDarkJedi(id) {
  const url = `${BASE_URL}/dark-jedis/${id}`;
  return get(url);
}

function fetchDarkJedis() {
  const url = `${BASE_URL}/dark-jedis/3616`;
  return get(url);
}

export default {
  fetchDarkJedi,
  fetchDarkJedis,
};
