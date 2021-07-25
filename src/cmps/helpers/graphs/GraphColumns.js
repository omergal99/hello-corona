import React, { useEffect, useRef, useState, useMemo } from 'react';
import Button from '../../elements/Button';
import { CASES, DEATHS, RECOVERED, getDataKeysByKeys, getDataKeyByKey } from '../../../constants/DataKeys';
import { orderDate } from '../../../services/UtilsService';

import GraphColumnsPreview from './GraphColumnsPreview';

function GraphColumns({ selectedCountry }) {

  const graphRef = useRef();
  const [graphRatio, setGraphRatio] = useState();
  const [graphType, setGraphType] = useState(CASES);
  const [isCumulative, setIsCumulative] = useState(false);

  const typeClicked = key => {
    if (graphType !== key) setGraphType(key);
  }

  const graphDataTypes = getDataKeysByKeys([CASES, DEATHS, RECOVERED]);

  const graphTypesButtons = graphDataTypes.map(type => {
    const isActive = graphType === type.key;
    return <Button
      key={type.key}
      text={type.title}
      type={`${type.color} ${isActive && 'active'}`}
      style={{ fontSize: '0.8rem' }}
      onClick={() => typeClicked(type.key)}
    />
  })

  const graphDataType = graphType === CASES
    ? { ...getDataKeyByKey(graphType), color: 'teal', colorHEX: '#008080' }
    : getDataKeyByKey(graphType);

  const historyObj = selectedCountry.history ? selectedCountry.history.timeline[graphType] : {};

  const historyArr = useMemo(() => {
    const historyEntries = Object.entries(historyObj);
    if (isCumulative) {
      return historyEntries.map(([key, value]) => ({ date: key, value }))
    } else {
      return historyEntries.reduce((acc, [key, value], idx) => {
        if (idx === 0) {
          acc.push({ date: key, value: 0 })
        } else {
          acc.push({
            date: key,
            value: value - historyEntries[idx - 1][1]
          })
        }
        return acc;
      }, [])
    }
  }, [historyObj, isCumulative]);

  const maxColumnHeight = 1.05 * historyArr.reduce((acc, next) => {
    if (acc < next.value) {
      acc = next.value;
    }
    return acc;
  }, 0);

  useEffect(() => {
    if (graphRef.current && !graphRatio) {
      setGraphRatio(graphRef.current.clientWidth / graphRef.current.clientHeight);
    }
  }, [graphRef, graphRatio])

  return (
    <div className="graph-columns" ref={graphRef}>
      <div className="graph-options">
        <div className="graph-text">
          <p>
            <span className="text">{`From ${orderDate(historyArr[0].date)}`}</span>
            <span className="text">{`To ${orderDate(historyArr[historyArr.length - 1].date)}`}</span>
          </p>
        </div>
        <div className="buttons-options flex-center">
          <Button
            text='Cumulative'
            style={{ fontSize: '0.9rem' }}
            onClick={() => setIsCumulative(!isCumulative)}
            isBoolean
            isBooleanActive={!!isCumulative}
          />
          {graphTypesButtons}
        </div>
      </div>

      {graphRef && graphRef.current &&
        <GraphColumnsPreview arr={historyArr} maxColumnHeight={maxColumnHeight} graphRatio={graphRatio}
          graphDataType={graphDataType}
          showLine={!!isCumulative}
        />
      }
    </div>
  );
}

export default GraphColumns;
// export default React.memo(GraphColumns);

