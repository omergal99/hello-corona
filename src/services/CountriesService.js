import countriesCorona from './data/countriesCorona.json';
import countries from './data/countries.json';

const defaultValue = 0;

function getData() {
  const initState = _getEmpty();
  initState.countries = _agregationWithCoronaData();
  initState.allCountriesData = { cases: 721412, deaths: 33956, recovered: 151004 };
  return Promise.resolve(initState);
}

export default {
  getData,
}

const _getEmpty = () => ({
  countries: [],
  selectedCountryIndex: null,
})

const _agregationWithCoronaData = () => (
  countries.map(country => {
    const coronaData = countriesCorona.find(corona => corona.country === country.name
      || (corona.country === 'UK' && country.name === 'United Kingdom')
      || (corona.country === 'S. Korea' && country.name === 'South Korea')
      || (corona.country === 'USA' && country.name === 'United States'));
    return {
      ...country,
      cases: coronaData ? coronaData.cases : defaultValue,
      todayCases: coronaData ? coronaData.todayCases : defaultValue,
      deaths: coronaData ? coronaData.deaths : defaultValue,
      todayDeaths: coronaData ? coronaData.todayDeaths : defaultValue,
      recovered: coronaData ? coronaData.recovered : defaultValue,
      active: coronaData ? coronaData.active : defaultValue,
      critical: coronaData ? coronaData.critical : defaultValue,
      casesPerOneMillion: coronaData ? coronaData.casesPerOneMillion : defaultValue,
      deathsPerOneMillion: coronaData ? coronaData.deathsPerOneMillion : defaultValue
    }
  })
)
