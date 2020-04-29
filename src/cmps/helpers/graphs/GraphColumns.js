import React, { useRef } from 'react';

import GraphColumnsPreview from './GraphColumnsPreview';

function GraphColumns({ arr }) {

  const graphRef = useRef({});

  const maxHeight = arr.length ? arr[arr.length - 1].value * 1.05 : 0;

  return (
    <div className="graph-columns" ref={graphRef}>
      <GraphColumnsPreview arr={arr} maxHeight={maxHeight} graphRef={graphRef} />
    </div>
  );
}

export default GraphColumns;
