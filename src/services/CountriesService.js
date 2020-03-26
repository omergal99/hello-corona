import countries from './data/countries.json';

function getData() {
  const initState = _getEmpty();
  initState.countries = countries;
  return Promise.resolve(initState);
}

export default {
  getData,
}

const _getEmpty = () => ({
  countries: [],
  selectedCountryIndex: null
})