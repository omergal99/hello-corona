import React from 'react';
import GraphRows from '../helpers/graphs/GraphRows';
import CountryDetails from '../helpers/countryDetails';

function WorldDashboardDetails({ countriesStore: { countries, selectedCountryIndex, worldData },
  onSelectCountry }) {
  const selectedCountry = selectedCountryIndex || selectedCountryIndex === 0 ? countries[selectedCountryIndex] : worldData;

  return (
    <div className="world-dashboard-details flex-col">
      <CountryDetails country={selectedCountry}/>
      <GraphRows countries={countries} onSelectCountry={onSelectCountry} />
    </div>
  );
}

export default WorldDashboardDetails;
