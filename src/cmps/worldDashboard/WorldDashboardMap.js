import React from "react";

import SvgCountriesMap from './mapUtils/SvgCountriesMap';
import MapOptions from './mapUtils/MapOptions';
import GraphColumns from '../helpers/graphs/GraphColumns';

function WorldDashboardMap({ settings, countriesStore: { countries, selectedCountryIndex, worldData },
  onSelectCountry, mapOptionsFunction }) {

  const selectedCountry = selectedCountryIndex || selectedCountryIndex === 0
    ? countries[selectedCountryIndex] : worldData;

  const { isGraphShow } = settings;
  return (
    <div className="world-dashboard-map">
      <SvgCountriesMap countries={countries} settings={settings} selectedCountry={selectedCountry}
        onSelectCountry={onSelectCountry} />
      <MapOptions settings={settings} {...mapOptionsFunction} />
      {isGraphShow && selectedCountry.history &&
        <div className="wrap-graph-columns">
          <GraphColumns selectedCountry={selectedCountry} />
        </div>
      }
    </div>
  );
}

export default WorldDashboardMap;