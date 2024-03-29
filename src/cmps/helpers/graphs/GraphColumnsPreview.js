import React from 'react';
import { numberWithCommas, orderDate } from '../../../services/UtilsService';

function GraphColumnsPreview({ arr, maxColumnHeight, graphRatio, graphDataType, showLine = true }) {

  const calcLine = (item, idx) => {
    const diff = (arr[idx + 1].value - item.value) / maxColumnHeight * 100;
    const colWidth = 1 / arr.length * 100 * graphRatio;
    const calcSlant = Math.sqrt(diff * diff + colWidth * colWidth);
    const tanAngle = Math.atan(diff / colWidth) * 180 / Math.PI;
    return { angle: tanAngle, slant: calcSlant };
  }

  const list = arr.map((item, idx) => {
    const width = 1 / arr.length * 100 + '%';
    const height = item.value / maxColumnHeight * 100 + '%';
    const backgroundColor = graphDataType.colorHEX;
    const line = arr[idx + 1] ? calcLine(item, idx) : 0;
    const lineStyle = {
      top: `-${line.slant * 2}px`,
      transform: `rotate(${line.angle * -1}deg)`
    }

    return <li className="column" key={item.date} style={{ width }}>
      <div className="column-percent" style={{ height, backgroundColor }}>
        {item.value > 0 &&
          <div className="wrap-value">
            <span className="value">{numberWithCommas(item.value)}</span>
          </div>
        }

        <div className="hover-value">
          <span className="value">{numberWithCommas(item.value)}</span>
          <span className="date">{orderDate(item.date)}</span>
        </div>
        {arr[idx + 1] && showLine && <span className="line" style={lineStyle}></span>}
      </div>
    </li>
  })

  return (
    <ul className="columns">
      {list}
    </ul>
  );
}

export default GraphColumnsPreview;
