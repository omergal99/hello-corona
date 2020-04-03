import React, { useState } from 'react';

function FilterInput({ list = [], filterKeys = [], placeholder = 'Search',
  onFilter }) {

  const [filterValue, setFilterValue] = useState('');

  const updateFilterValue = ev => {
    setFilterValue(ev.target.value);
    const value = ev.target.value.toLowerCase();
    if (!value) onFilter(list);
    else {
      const filteredList = list.filter(item => filterKeys.some(key => item[key].toLowerCase().includes(value)));
      onFilter(filteredList);
    }
  }

  return (
    <input className="filter-input" type="text" placeholder={placeholder}
      value={filterValue} onChange={updateFilterValue} />
  );
}

export default FilterInput;
