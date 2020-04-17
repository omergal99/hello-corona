import React from "react";
import Button from '../../elements/Button';
import { CASES, DEATHS, RECOVERED, TOTAL_TESTS, getDataKeysByKeys } from '../../../constants/DataKeys';

function MapOptions({ isCirclesShow, isAutoFocus, circlesDataKey = CASES, isTooltipShow,
  onToggleIsCirclesShow, onToggleIsAutoFocus, onSetCirclesDataKey, onToggleIsTooltipShow }) {

  const circleClicked = key => {
    if (circlesDataKey !== key) onSetCirclesDataKey(key);
  }

  const circlesData = getDataKeysByKeys([CASES, DEATHS, RECOVERED, TOTAL_TESTS]);

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
        <Button text="Hide Circles" toggleText="Show Circles" textCondition={isCirclesShow}
          onClick={onToggleIsCirclesShow} />
        <Button text="Dissable Auto Focus" toggleText="Enable Auto Focus" textCondition={isAutoFocus}
          onClick={onToggleIsAutoFocus} />
        <Button text="Hide Tooltip" toggleText="Show Tooltip" textCondition={isTooltipShow}
          onClick={onToggleIsTooltipShow} />
      </div>

    </div>
  );
}

export default MapOptions;