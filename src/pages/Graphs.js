import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';

import UtilsService from '../services/UtilsService';
function Graphs() {

  const obj = {
    "3/27/20": 110,
    "3/28/20": 110,
    "3/29/20": 120,
    "3/30/20": 170,
    "3/31/20": 174,
    "4/1/20": 237,
    "4/2/20": 273,
    "4/3/20": 281,
    "4/4/20": 299,
    "4/5/20": 349,
    "4/6/20": 367,
    "4/7/20": 423,
    "4/8/20": 444,
    "4/9/20": 484,
    "4/10/20": 521,
    "4/11/20": 555,
    "4/12/20": 607,
    "4/13/20": 665,
    "4/14/20": 714,
    "4/15/20": 784,
    "4/16/20": 840,
    "4/17/20": 906,
    "4/18/20": 933,
    "4/19/20": 996,
    "4/20/20": 1026,
    "4/21/20": 1092,
    "4/22/20": 1176,
    "4/23/20": 1279,
    "4/24/20": 1351,
    "4/25/20": 1463
  }

  const graphRef = useRef();
  const countriesStore = useSelector(state => state.countriesStore);

  const selectedCountryIndex = countriesStore && countriesStore.selectedCountryIndex;
  const selectedCountry = selectedCountryIndex || selectedCountryIndex === 0
    ? countriesStore.countries[selectedCountryIndex]
    : countriesStore ? countriesStore.worldData : {};

  const historyObj = selectedCountry.history ? selectedCountry.history.timeline.cases : obj;
  const arr = Object.keys(historyObj).map(key => ({ date: key, value: historyObj[key] }));

  const maxHeight = arr[arr.length - 1].value * 1.05;

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

  const [list, setList] = useState(null);

  useEffect(() => {
    if (!list) setList(createList());
  }, [list, createList])

  return (
    <div className="graphs">
      <div className="wrap-graph-columns">
        <div className="graph-columns" ref={graphRef}>
          <ul className="columns">{list}</ul>
        </div>
      </div>
    </div>
  );
}

export default Graphs;
