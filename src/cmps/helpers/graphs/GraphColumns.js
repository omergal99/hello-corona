import React, { useState, useRef, useEffect, useCallback } from 'react';
import UtilsService from '../../../services/UtilsService';

function GraphColumns({ selectedCountry }) {

  const graphRef = useRef({});

  const historyObj = selectedCountry.history ? selectedCountry.history.timeline.cases : {};
  const arr = Object.keys(historyObj).map(key => ({ date: key, value: historyObj[key] }));

  const maxHeight = arr.length ? arr[arr.length - 1].value * 1.05 : 0;

  const calcLine = useCallback((item, idx) => {
    const diff = (arr[idx + 1].value - item.value) / maxHeight * 100;
    const colWidth = 1 / arr.length * 100 * graphRef.current.clientWidth / graphRef.current.clientHeight;
    const calcSlant = Math.sqrt(diff * diff + colWidth * colWidth);
    const tanAngle = Math.atan(diff / colWidth) * 180 / Math.PI;
    return { angle: tanAngle, slant: calcSlant };
  }, [arr, maxHeight])

  const createList = useCallback(() => arr.map((item, idx) => {
    const width = 1 / arr.length * 100 + '%';
    const height = item.value / maxHeight * 100 + '%';
    const line = arr[idx + 1] ? calcLine(item, idx) : 0;
    const style = {
      top: `-${line.slant * 4}px`, width: `${line.slant * line.slant + 100}%`,
      transform: `rotate(-${line.angle}deg)`
    }
    return <li className="column" key={item.date} style={{ width }}>
      <div className="column-percent" style={{ height }}>
        <div className="wrap-value">
          <span className="value">{UtilsService.numberWithCommas(item.value)}</span>
        </div>
        {arr[idx + 1] && <span className="line" style={style}></span>}
      </div>
    </li>
  }), [arr, calcLine, maxHeight])

  const [list, setList] = useState(createList());

  useEffect(() => {
    setList(createList());
  }, [selectedCountry])

  return (
    <div className="graph-columns" ref={graphRef}>
      <ul className="columns">
        {list}
      </ul>
    </div>
  );
}

export default GraphColumns;
