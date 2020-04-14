import React from 'react';

function Button({ type = 'normal', style,
  text = '1', toggleText = '2', textCondition = true,
  onClick }) {

  return (
    <button className={`custom-buttom ${type}`} style={style}
      onClick={onClick}>
      {textCondition ? text : toggleText}
    </button>
  );
}

export default Button;
