import React from "react";
import Button from '../../elements/Button';
import { CASES, DEATHS, RECOVERED, TESTS, ACTIVE, getDataKeysByKeys } from '../../../constants/DataKeys';

function MapOptions({ settings: { isCirclesShow, isAutoFocus, circlesDataKey, isTooltipShow, isGraphShow, isGradient },
  onToggleIsCirclesShow, onToggleIsAutoFocus, onSetCirclesDataKey, onToggleIsTooltipShow, onToggleIsGraphShow,
  onToggleGradient, zoomMap }) {

  const circleClicked = key => {
    if (circlesDataKey !== key) onSetCirclesDataKey(key);
  }

  const circlesData = getDataKeysByKeys([ACTIVE, CASES, DEATHS, RECOVERED, TESTS]);

  const circlesDataButtons = circlesData.map(circle => {
    const isActive = circlesDataKey === circle.key;
    return <Button key={circle.key} text={circle.title} type={`${circle.color} ${isActive && 'active'}`}
      style={{ fontSize: '0.8rem' }}
      onClick={() => circleClicked(circle.key)} />
  })

  return (
    <div className="map-options">

      <div className="main-options">
        <Button text="Count" isBooleanActive={isCirclesShow} isBoolean={true}
          onClick={onToggleIsCirclesShow} />
        <Button text="Focus" isBooleanActive={isAutoFocus} isBoolean={true}
          onClick={onToggleIsAutoFocus} />
        <Button text="Hint" isBooleanActive={isTooltipShow} isBoolean={true}
          onClick={onToggleIsTooltipShow} />
        <Button text="Graph" isBooleanActive={isGraphShow} isBoolean={true}
          onClick={onToggleIsGraphShow} />
        <Button text="Shine" isBooleanActive={isGradient} isBoolean={true}
          onClick={onToggleGradient} />
        <div className="zoom-controls">
          <Button text="-" type="zoom-control" onClick={() => zoomMap(-1)} />
          <Button text="+" type="zoom-control" onClick={() => zoomMap(1)} />
        </div>
      </div>

      {isCirclesShow &&
        <div className="circles-options">
          {circlesDataButtons}
        </div>
      }

    </div>
  );
}

export default MapOptions;