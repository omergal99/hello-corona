import React, { useState } from 'react';
import UtilsService from '../../../services/UtilsService';
import { TODAY_CASES, TODAY_DEATHS, getDataKeyByKey } from '../../../constants/DataKeys';
import ReplaceSVG from '../svg-icons/ReplaceSVG';

function GraphRows({ countries }) {

  const [graphBy, setGraphBy] = useState(TODAY_DEATHS);
  const graphDataKey = getDataKeyByKey(graphBy);

  const top10 = countries.filter((item, idx) => idx < 12)
    .sort((b, a) => (a[graphBy] > b[graphBy]) ? 1 : ((b[graphBy] > a[graphBy]) ? -1 : 0));

  const backgroundColor = graphDataKey.colorHEX + '80';
  const list = top10.map(country => {
    const width = country[graphBy] / top10[0][graphBy] * 100 + '%';
    return <li className="row" key={country.alpha2} style={{ width, backgroundColor }}>
      <span className="name">{country.name}</span>
      <span className="amount">&nbsp;{UtilsService.numberWithCommas(country[graphBy])}</span>
    </li>
  })

  const toggleGraph = () => {
    if (graphBy === TODAY_DEATHS) setGraphBy(TODAY_CASES);
    if (graphBy === TODAY_CASES) setGraphBy(TODAY_DEATHS);
  }

  return (
    <div className="graph-lines">
      <h3 className="title" onClick={toggleGraph}>
        <div className="wrap-icon-svg"><ReplaceSVG /></div>
        <span>{graphDataKey.title}</span>
      </h3>
      <ul className="rows">
        {list}
      </ul>
    </div>
  );
}

export default GraphRows;
