import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Router from './Router';
import HudLayout from './cmps/HudLayout';
import FloatWindows from './cmps/FloatWindows';
import { APP_VERSION } from './constants/Version';

function App() {
  const [isFloatWindowsShow, setIsFloatWindowsShow] = useState(false);

  const [SWOpen, setSWOpen] = useState(true);



  const serviceWorkerStore = useSelector(state => state.serviceWorkerStore);
  console.log('************************', APP_VERSION);

  if (serviceWorkerStore.isServiceWorkerInitialized) {
    console.log('isServiceWorkerInitialized -- True');
  }

  const updateServiceWorker = () => {
    console.log('serviceWorkerStore', serviceWorkerStore);
    const registrationWaiting = serviceWorkerStore.serviceWorkerRegistration.waiting;
    console.log('registrationWaiting', registrationWaiting);

    if (registrationWaiting) {
      registrationWaiting.postMessage({ type: 'SKIP_WAITING' });

      registrationWaiting.addEventListener('statechange', ev => {
        if (ev.target.state === 'activated') {
          window.location.reload();
        }
      });
    }
  };

  return (
    <div className="App">
      <div style={{ display: 'none' }}>{APP_VERSION}</div>
      {serviceWorkerStore.isServiceWorkerUpdated && SWOpen &&
        <div style={{
          backgroundColor: '#8a5c5c',
          zIndex: 50000,
          position: 'absolute',
          right: '48px',
          padding: '10px',
        }}>
          <p>There is a new version available.</p>
          <button onClick={updateServiceWorker}>updateServiceWorker</button>
          <button onClick={() => setSWOpen(false)}>X</button>
        </div>
      }
      <HudLayout />
      <Router onToggleFloatWindows={() => setIsFloatWindowsShow(!isFloatWindowsShow)} />
      {isFloatWindowsShow &&
        <FloatWindows onToggleFloatWindows={() => setIsFloatWindowsShow(!isFloatWindowsShow)} />
      }
    </div>
  );
}

export default App;
