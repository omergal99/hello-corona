import React, { useRef } from 'react';

import GraphColumnsPreview from './GraphColumnsPreview';

function GraphColumns({ selectedCountry }) {

  const graphRef = useRef({});

  const historyObj = selectedCountry.history ? selectedCountry.history.timeline.cases : {};
  const historyArr = Object.keys(historyObj).map(key => ({ date: key, value: historyObj[key] }));
  const maxHeight = historyArr.length ? historyArr[historyArr.length - 1].value * 1.05 : 0;

  console.log('update - GraphColumns', historyArr)
  return (
    <div className="graph-columns" ref={graphRef}>
      <GraphColumnsPreview arr={historyArr} maxHeight={maxHeight} graphRef={graphRef} />
    </div>
  );
}

// export default GraphColumns;
export default React.memo(GraphColumns);

