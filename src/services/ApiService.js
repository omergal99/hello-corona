import * as ApiUrls from '../constants/ApiUrls';
import Axios from 'axios';

const axios = Axios.create({ withCredentials: false });

async function getCoronaCountries() {
  return await _customGet(ApiUrls.GET_CORONA_COUNTRIES, 'getCoronaCountries');
}

async function getGlobalData() {
  return await _customGet(ApiUrls.GET_GLOBAL_DATA, 'getGlobalData');
}

export default {
  getCoronaCountries,
  getGlobalData
}

async function _customGet(url, extraMsg) {
  try {
    const res = await axios({ method: 'get', url })
    return res.data;
  } catch (err) {
    console.log('Error in Service ', extraMsg);
    if (err.response) console.log(err.response.data);
    else console.log(err);
  }
}