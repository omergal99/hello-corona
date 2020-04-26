import React from "react";
import Button from '../../elements/Button';
import { CASES, DEATHS, RECOVERED, TESTS, getDataKeysByKeys } from '../../../constants/DataKeys';

function MapOptions({ isCirclesShow, isAutoFocus, circlesDataKey = CASES, isTooltipShow,
  onToggleIsCirclesShow, onToggleIsAutoFocus, onSetCirclesDataKey, onToggleIsTooltipShow }) {

  const circleClicked = key => {
    if (circlesDataKey !== key) onSetCirclesDataKey(key);
  }

  const circlesData = getDataKeysByKeys([CASES, DEATHS, RECOVERED, TESTS]);

  const circlesDataButtons = circlesData.map(circle => {
    const isActive = circlesDataKey === circle.key;
    return <Button key={circle.key} text={circle.title} type={`${circle.color} ${isActive && 'active'}`}
      style={{ fontSize: '0.8rem' }}
      onClick={() => circleClicked(circle.key)} />
  })

  return (
    <div className="map-options">

      {isCirclesShow &&
        <div className="circles-options">
          {circlesDataButtons}
        </div>
      }

      <div className="main-options">
        <Button text="Circles" textCondition={isCirclesShow} isBoolean={true}
          onClick={onToggleIsCirclesShow} />
        <Button text="Auto Focus" textCondition={isAutoFocus} isBoolean={true}
          onClick={onToggleIsAutoFocus} />
        <Button text="Tooltip" textCondition={isTooltipShow} isBoolean={true}
          onClick={onToggleIsTooltipShow} />
      </div>

    </div>
  );
}

export default MapOptions;