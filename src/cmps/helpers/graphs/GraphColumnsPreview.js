import React from 'react';
import UtilsService from '../../../services/UtilsService';

function GraphColumnsPreview({ arr, maxHeight, graphRef }) {

  const calcLine = (item, idx) => {
    const diff = (arr[idx + 1].value - item.value) / maxHeight * 100;
    const colWidth = 1 / arr.length * 100 * graphRef.current.clientWidth / graphRef.current.clientHeight;
    const calcSlant = Math.sqrt(diff * diff + colWidth * colWidth);
    const tanAngle = Math.atan(diff / colWidth) * 180 / Math.PI;
    return { angle: tanAngle, slant: calcSlant };
  }

  const list = arr.map((item, idx) => {
    const width = 1 / arr.length * 100 + '%';
    const height = item.value / maxHeight * 100 + '%';
    const line = arr[idx + 1] ? calcLine(item, idx) : 0;
    const style = {
      top: `-${line.slant * 2}px`,
      transform: `rotate(${line.angle * -1}deg)`
    }
    return <li className="column" key={item.date} style={{ width }}>
      <div className="column-percent" style={{ height }}>
        <div className="wrap-value">
          <span className="value">{UtilsService.numberWithCommas(item.value)}</span>
        </div>
        {arr[idx + 1] && <span className="line" style={style}></span>}
      </div>
    </li>
  })

  console.log('update - GraphColumns - Preview')

  return (
    <ul className="columns">
      {list}
    </ul>
  );
}

export default GraphColumnsPreview;
