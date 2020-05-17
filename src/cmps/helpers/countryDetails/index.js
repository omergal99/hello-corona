import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import actions from '../../../store/actions';

import CountryDetailsTitle from './CountryDetailsTitle';
import CountryDetailsList from './CountryDetailsList';

function CountryDetails({ country }) {
  const dispatch = useDispatch();
  const settingsStore = useSelector(state => state.settingsStore);

  const onToggleCOUntryVoice = () => dispatch(actions.toggleIsCountryVoice());

  return (
    <div className="country-details flex-col">
      <CountryDetailsTitle country={country} sounds={settingsStore.sounds} />
      <CountryDetailsList country={country} />
    </div>
  );
}

export default CountryDetails;
