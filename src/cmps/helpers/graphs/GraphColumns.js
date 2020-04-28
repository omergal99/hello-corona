import React, { useRef } from 'react';

import GraphColumnsPreview from './GraphColumnsPreview';

function GraphColumns({ selectedCountry }) {

  const graphRef = useRef({});

  const historyObj = selectedCountry.history ? selectedCountry.history.timeline.cases : {};
  const arr = Object.keys(historyObj).map(key => ({ date: key, value: historyObj[key] }));

  const maxHeight = arr.length ? arr[arr.length - 1].value * 1.05 : 0;

  return (
    <div className="graph-columns" ref={graphRef}>
      <GraphColumnsPreview arr={arr} maxHeight={maxHeight} graphRef={graphRef} />
    </div>
  );
}

export default GraphColumns;
