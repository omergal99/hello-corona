import * as ApiUrls from '../constants/ApiUrls';
import Axios from 'axios';

const axios = Axios.create({ withCredentials: false });

async function getCoronaCountries() {
  return await _customGet(ApiUrls.GET_CORONA_COUNTRIES, 'getCoronaCountries');
}

async function getCoronaWorld() {
  return await _customGet(ApiUrls.GET_WORLD_DATA, 'getCoronaWorld');
}

async function getWorldHistory() {
  return await _customGet(ApiUrls.GET_WORLD_HISTORY, 'getWorldHistory');
}

async function getCountryHistory(id) {
  return await _customGet(`${ApiUrls.GET_COUNTRY_HISTORY}${id}`, 'getCountryHistory');
}

export default {
  getCoronaCountries,
  getCoronaWorld,
  getWorldHistory,
  getCountryHistory,
}

async function _customGet(url, extraMsg) {
  try {
    const res = await axios({ method: 'get', url })
    return res.data;
  } catch (err) {
    console.log('Error in Service', extraMsg);
    if (err.response) console.log(err.response.data);
    else console.log(err);
  }
}