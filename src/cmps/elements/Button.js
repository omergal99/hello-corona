import React from 'react';

function Button({ type = 'normal', style, isBoolean = false,
  text = '1', toggleText = '2', textCondition = true,
  onClick }) {

  const textIn = isBoolean ? text : textCondition ? text : toggleText;
  return (
    <button className={`custom-buttom ${type}`} style={style}
      onClick={onClick}>
      {isBoolean && <span className={`light ${textCondition ? 'on' : 'off'}`}></span>}
      <span>{textIn}</span>
    </button>
  );
}

export default Button;
