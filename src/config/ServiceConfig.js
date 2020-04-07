

const isProduction = process.env.NODE_ENV === 'production';

const isServerCountriesConnected = isProduction;

!isProduction && console.log(process.env.NODE_ENV === 'production');
!isProduction && console.log(process.env);

function getUrl(entityName) {
  return `${process.env.REACT_APP_SERVER_URL}/${entityName}`
}


export default {
  isServerCountriesConnected,
  getUrl
}