

const isProduction = process.env.NODE_ENV === 'production';
// const isProduction = true;

const isServerCountriesConnected = isProduction;

function getUrl(entityName) {
  return `${process.env.REACT_APP_SERVER_URL}/${entityName}`
}

export default {
  isServerCountriesConnected,
  getUrl
}