import Axios from 'axios';
const axios = Axios.create({ withCredentials: false });

function get(...args) {
  return axios.get(...args)
}
function post(...args) {
  return axios.post(...args)
}
function put(...args) {
  return axios.put(...args)
}
function remove(...args) {
  return axios.delete(...args)
}

function getUrl(entityName) {
  return (process.env.NODE_ENV !== 'development')
    ? `/${entityName}`
    : `//localhost:9090/${entityName}`
}

function getNoCredAxios() {
  return Axios
}

export default {
  get,
  post,
  put,
  delete: remove,
  getUrl,
  getNoCredAxios
}