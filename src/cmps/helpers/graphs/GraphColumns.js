import React, { useEffect, useRef, useState } from 'react';
import Button from '../../elements/Button';
import { CASES, DEATHS, RECOVERED, getDataKeysByKeys, getDataKeyByKey } from '../../../constants/DataKeys';

import GraphColumnsPreview from './GraphColumnsPreview';

function GraphColumns({ selectedCountry }) {

  const graphRef = useRef();
  const [graphRatio, setGraphRatio] = useState();
  const [graphType, setGraphType] = useState(CASES);

  const typeClicked = key => {
    if (graphType !== key) setGraphType(key);
  }

  const graphDataTypes = getDataKeysByKeys([CASES, DEATHS, RECOVERED]);
  const graphDataType = graphType === CASES
    ? { ...getDataKeyByKey(graphType), color: 'teal', colorHEX: '#008080' }
    : getDataKeyByKey(graphType);

  const graphTypesButtons = graphDataTypes.map(type => {
    const isActive = graphType === type.key;
    return <Button key={type.key} text={type.title} type={`${type.color} ${isActive && 'active'}`}
      style={{ fontSize: '0.8rem' }} onClick={() => typeClicked(type.key)} />
  })

  const historyObj = selectedCountry.history ? selectedCountry.history.timeline[graphType] : {};
  const historyArr = Object.keys(historyObj).map(key => ({ date: key, value: historyObj[key] }));

  const maxHeight = historyArr.length ? historyArr[historyArr.length - 1].value * 1.05 : 0;

  useEffect(() => {
    if (graphRef.current && !graphRatio) {
      setGraphRatio(graphRef.current.clientWidth / graphRef.current.clientHeight);
    }
  }, [graphRef, graphRatio])

  return (
    <div className="graph-columns" ref={graphRef}>
      {graphRef && graphRef.current &&
        <GraphColumnsPreview arr={historyArr} maxHeight={maxHeight} graphRatio={graphRatio}
          graphDataType={graphDataType} />
      }
      <div className="graph-options">
        <div className="graph-text">
          <p>
            <span className="text">{`From ${historyArr[0].date} To ${historyArr[historyArr.length - 1].date}`}</span>
          </p>
        </div>
        <div className="buttons-options flex-center">
          {graphTypesButtons}
        </div>
      </div>
    </div>
  );
}

export default GraphColumns;
// export default React.memo(GraphColumns);

