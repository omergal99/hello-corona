import React, { useState } from 'react';

import Router from './Router';
import HudLayout from './cmps/HudLayout';
import FloatWindows from './cmps/FloatWindows';

function App() {
  const [isFloatWindowsShow, setIsFloatWindowsShow] = useState(false);
  return (
    <div className="App">
      <HudLayout />
      <Router onToggleFloatWindows={() => setIsFloatWindowsShow(!isFloatWindowsShow)} />
      {isFloatWindowsShow &&
        <FloatWindows onToggleFloatWindows={() => setIsFloatWindowsShow(!isFloatWindowsShow)} />
      }
    </div>
  );
}

export default App;
