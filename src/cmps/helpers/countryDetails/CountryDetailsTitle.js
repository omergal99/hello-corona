import React, { useEffect } from 'react';
import UtilsService from '../../../services/UtilsService';

function CountryDetailsTitle({ country, sounds }) {

  const isWorld = country.name === 'World';
  const { isCountryVoice } = sounds;

  const countryIcon = (() => {
    return isWorld
      // ? <img className="country-flag" src={UtilsService.getSrc(`earth.gif`)} alt="Earth" />
      ? <video className="country-earth" autoPlay loop muted playsInline loading="lazy">
        <source src={UtilsService.getSrc(`earth.mp4`)} type="video/mp4" />
      </video>
      : <img className="country-flag" alt="Flag" title={country.name}
        src={UtilsService.getImgSrc(`flags/${country.alpha2.toLowerCase()}.png`)} />
  })()

  
  useEffect(() => {
    if (isCountryVoice && !isWorld) {
      const msg = new SpeechSynthesisUtterance();
      msg.text = country.name;
      // const voices = window.speechSynthesis.getVoices();
      // msg.voice = voices[1];
      msg.voice = window.speechSynthesis.getVoices()[1];
      msg.voiceURI = "native";
      msg.volume = 1;
      msg.rate = 1;
      msg.pitch = 0.8;
      msg.lang = 'en-US';
      speechSynthesis.speak(msg);
    }
  }, [country, isCountryVoice, isWorld])

  return (
    <div className="country-details-title">
      <div className={`wrap-country-icon ${isWorld ? 'earth' : 'flag'}`}>
        {countryIcon}
      </div>
      <div className="wrap-country-title">
        <h2>{country.name}</h2>
        <span className="continent">{country.continent}</span>
      </div>
    </div>
  );
}

export default CountryDetailsTitle;
