import React, { useState } from 'react';

import Router from './Router';
import HudLayout from './cmps/HudLayout';
import FloatWindows from './cmps/FloatWindows';
import AppNotifications from './cmps/AppNotifications';

function App() {

  // TODO: Move to Redux
  const [isFloatWindowsShow, setIsFloatWindowsShow] = useState(false);

  return (
    <div className="App">
      <AppNotifications />
      <HudLayout />
      <Router onToggleFloatWindows={() => setIsFloatWindowsShow(!isFloatWindowsShow)} />
      {isFloatWindowsShow &&
        <FloatWindows onToggleFloatWindows={() => setIsFloatWindowsShow(!isFloatWindowsShow)} />
      }
    </div>
  );
}

export default App;
