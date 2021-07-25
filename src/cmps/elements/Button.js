import React from 'react';

function Button({ type = 'normal', style, isBoolean = false,
  text = '1', toggleText = '2', isBooleanActive = true,
  onClick }) {

  const textIn = isBoolean ? text : isBooleanActive ? text : toggleText;
  return (
    <button className={`custom-buttom ${type}`} style={style}
      onClick={onClick}>
      {isBoolean && <span className={`toggle-light ${isBooleanActive ? 'on' : 'off'}`}></span>}
      <span>{textIn}</span>
    </button>
  );
}

export default Button;
