

let isServerCountriesConnected;


isServerCountriesConnected = process.env.NODE_ENV === 'production';
console.log(process.env.NODE_ENV === 'production');
console.log(process.env);

function getUrl(entityName) {
  return `${process.env.REACT_APP_SERVER_URL}/${entityName}`
}


export default {
  isServerCountriesConnected,
  getUrl
}