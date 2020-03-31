

let isServerCountriesConnected;


isServerCountriesConnected = true;


function getUrl(entityName) {
  return `https://coronavirus-19-api.herokuapp.com/${entityName}`
}


export default {
  isServerCountriesConnected,
  getUrl
}