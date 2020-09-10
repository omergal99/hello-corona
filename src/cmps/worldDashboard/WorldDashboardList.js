import React from 'react';
import FilterInput from '../helpers/FilterInput';
import WorldDashboardListItem from './WorldDashboardListItem';

function WorldDashboardList({ countriesStore: { countries, selectedCountryIndex },
  onSelectCountry }) {
  // console.log('WorldDashboardList');
  const selectedCountry = selectedCountryIndex || selectedCountryIndex === 0 ? countries[selectedCountryIndex] : {};

  const [filteredCountries, setFilteredCountries] = React.useState(countries.filter((item, idx) => idx < 40));
  const [isFiltered, setIsFiltered] = React.useState(false);
  const [isScroll, setIsScroll] = React.useState(false);

  const selectedCountryRef = React.useRef(null);

  const list = filteredCountries.map((country, idx) => {
    const countryRef = selectedCountry.alpha2 === country.alpha2 ? selectedCountryRef : null;
    return (isScroll || isFiltered || idx < 10)
      ? <WorldDashboardListItem key={country.id} countryRef={countryRef}
        country={country} selectedCountry={selectedCountry}
        onSelectCountry={onSelectCountry} />
      : <li key={idx} ref={countryRef} style={{ height: '6.5rem' }}></li>
  })

  const handleScroll = ev => {
    setIsScroll(true);
    if (isFiltered) return;
    const scrollEnd = ev.target.scrollTop + 100 >= ev.target.scrollHeight - ev.target.clientHeight;
    if (scrollEnd) setFilteredCountries(countries);
  }

  const filterCountries = filteredList => {
    if (filteredList) {
      setFilteredCountries(filteredList);
      setIsFiltered(true);
    } else {
      setFilteredCountries(countries.filter((item, idx) => idx < 40));
    }
  }

  const handleUserKeyPress = React.useCallback((ev) => {
    ev.preventDefault();
    const arrowUpOrDown = ev.code === 'ArrowDown' ? 1 : ev.code === 'ArrowUp' ? -1 : 0;
    if (!arrowUpOrDown) return;
    let nextIndex = selectedCountryIndex + arrowUpOrDown;
    if (nextIndex < 0) nextIndex = filteredCountries.length - 1;
    if (nextIndex > countries.length - 1) nextIndex = 0;
    if (filteredCountries[nextIndex]) {
      onSelectCountry(filteredCountries[nextIndex]);
    } else {
      setFilteredCountries(countries);
    }
    selectedCountryRef.current.scrollIntoView({ block: 'center' });
  }, [filteredCountries, selectedCountryIndex, onSelectCountry, countries])

  React.useEffect(() => {
    window.addEventListener('keyup', handleUserKeyPress);
    return (() => window.removeEventListener('keyup', handleUserKeyPress));
  }, [handleUserKeyPress])

  React.useEffect(() => {
    setTimeout(() => {
      if (selectedCountryRef.current) selectedCountryRef.current.scrollIntoView({ block: 'center' });
    }, 0)
  }, [selectedCountryRef])

  return (
    <div className="world-dashboard-list flex-col">
      <div className="custom-filter-input">
        <FilterInput list={countries} filterKeys={['name']} placeholder="Search Country"
          onFilter={filterCountries} />
      </div>
      <ul className="countries" onScroll={handleScroll}>
        {list}
      </ul>
    </div>
  );
}

export default WorldDashboardList;
