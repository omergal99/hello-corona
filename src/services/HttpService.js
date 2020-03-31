import ServiceConfig from '../ServiceConfig';
import Axios from 'axios';

const axios = Axios.create({ withCredentials: false });

function get(...args) {
  return _customAxios('get', ...args);
}
function post(...args) {
  return _customAxios('post', ...args);
}
function put(...args) {
  return _customAxios('put', ...args);
}
function remove(...args) {
  return _customAxios('delete', ...args);
}

export default {
  get,
  post,
  put,
  delete: remove,
}

async function _customAxios(method, entityName = '', data = null, extraMsg = '') {
  // console.log(method, entityName, data);
  const url = ServiceConfig.getUrl(entityName);
  try {
    const res = await axios({ method, url, ...data })
    // console.log(extraMsg, res);
    return res.data;
  } catch (err) {
    console.log('Error in Service ', extraMsg, '- By Entity Name:', entityName);
    if (err.response) console.log(err.response.data);
    else console.log(err);
  }
}