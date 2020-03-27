import countries from './data/countries.json';
import countriesMap from './data/countriesMap.json';

function getData() {
  const initState = _getEmpty();
  initState.countries = countries;
  initState.countriesMap = countriesMap;
  return Promise.resolve(initState);
}

export default {
  getData,
}

const _getEmpty = () => ({
  countries: [],
  countriesMap: [],
  selectedCountryIndex: null
})