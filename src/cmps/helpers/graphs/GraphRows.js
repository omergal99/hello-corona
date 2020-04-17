import React, { useState } from 'react';
import UtilsService from '../../../services/UtilsService';
import * as DataKeys from '../../../constants/DataKeys';
import ReplaceSVG from '../svg-icons/ReplaceSVG';
import Button from '../../elements/Button';

function GraphRows({ countries }) {

  const [rowsAmount, setRowsAmount] = useState(10);
  const [graphBy, setGraphBy] = useState(DataKeys.TODAY_DEATHS);
  const graphDataKey = DataKeys.getDataKeyByKey(graphBy);

  const top10 = [...countries].sort((b, a) => (a[graphBy] > b[graphBy]) ? 1 : ((b[graphBy] > a[graphBy]) ? -1 : 0))
    .filter((item, idx) => idx < rowsAmount);

  const list = top10.map(country => {
    const width = country[graphBy] / top10[0][graphBy] * 100 + '%';
    const backgroundColor = graphDataKey.colorHEX + '80';
    return <li className="row" key={country.alpha2} style={{ width, backgroundColor }}>
      <span className="name">{country.name}</span>
      <span className="amount">&nbsp;{UtilsService.numberWithCommas(country[graphBy])}</span>
    </li>
  })

  const toggleGraph = () => {
    if (graphBy === DataKeys.TODAY_DEATHS) setGraphBy(DataKeys.DEATHS_PER_ONE_MILLION);
    if (graphBy === DataKeys.DEATHS_PER_ONE_MILLION) setGraphBy(DataKeys.TODAY_CASES);
    if (graphBy === DataKeys.TODAY_CASES) setGraphBy(DataKeys.CASES_PER_ONE_MILLION);
    if (graphBy === DataKeys.CASES_PER_ONE_MILLION) setGraphBy(DataKeys.TESTS_PER_ONE_MILLION);
    if (graphBy === DataKeys.TESTS_PER_ONE_MILLION) setGraphBy(DataKeys.CRITICAL);
    if (graphBy === DataKeys.CRITICAL) setGraphBy(DataKeys.TODAY_DEATHS);
  }

  const diff = 5;
  return (
    <div className="graph-rows">
      <h3 className="title" onClick={toggleGraph}>
        <div className="wrap-icon-svg"><ReplaceSVG /></div>
        <span>{graphDataKey.title}</span>
      </h3>
      <ul className="rows">
        {list}
        <li className="flex-evenly">
          {rowsAmount > diff &&
            <Button text={`- ${diff}`} style={{ fontWeight: 'bold' }} onClick={() => setRowsAmount(rowsAmount - diff)} />
          }
          {rowsAmount < diff * 10 &&
            <Button text={`+ ${diff}`} style={{ fontWeight: 'bold' }} onClick={() => setRowsAmount(rowsAmount + diff)} />
          }
        </li>
      </ul>
    </div>
  );
}

export default GraphRows;
