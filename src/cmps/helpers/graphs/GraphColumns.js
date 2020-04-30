import React, { useEffect, useRef, useState } from 'react';

import GraphColumnsPreview from './GraphColumnsPreview';

function GraphColumns({ selectedCountry }) {

  const graphRef = useRef();
  const [graphRatio, setGraphRatio] = useState();

  const historyObj = selectedCountry.history ? selectedCountry.history.timeline.cases : {};
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
        <GraphColumnsPreview arr={historyArr} maxHeight={maxHeight} graphRatio={graphRatio} />
      }
    </div>
  );
}

// export default GraphColumns;
export default React.memo(GraphColumns);

