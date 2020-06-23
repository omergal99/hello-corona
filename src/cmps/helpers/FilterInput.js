import React, { useState } from 'react';

function FilterInput({ list = [], filterKeys = [], placeholder = 'Search',
  onFilter }) {

  const [filterValue, setFilterValue] = useState('');

  const updateFilterValue = ev => {
    console.log('updateFilterValue');
    setFilterValue(ev.target.value);
    const value = ev.target.value.toLowerCase();
    if (!value) onFilter(null);
    else {
      const filteredList = list.filter(item => filterKeys.some(key => item[key].toLowerCase().includes(value)));
      onFilter(filteredList);
    }
  }

  return (
    <label className="text-filter">
      <input className="filter-input" type="text" placeholder={placeholder}
        value={filterValue} onChange={updateFilterValue} />
      {filterValue &&
        <div className="clear-button" onClick={() => updateFilterValue({ target: { value: '' } })}>
          <svg className="clear-button-svg" focusable="false" viewBox="0 0 24 24">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </svg>
        </div>
      }
    </label>
  );
}

export default FilterInput;
