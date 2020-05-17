import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Button from '../cmps/elements/Button';

function AppNotifications() {

  const [SWOpen, setSWOpen] = useState(true);

  const serviceWorkerStore = useSelector(state => state.serviceWorkerStore);

  const updateServiceWorker = () => {
    const regWaiting = serviceWorkerStore.registration && serviceWorkerStore.registration.waiting;
    if (!regWaiting) return;
    regWaiting.postMessage({ type: 'SKIP_WAITING' });
    regWaiting.addEventListener('statechange', ev => {
      if (ev.target.state === 'activated') {
        window.location.reload();
      }
    });
  };

  const btnStyle = { padding: '4px 10px 2px', fontSize: '1.2rem', borderWidth: '2px' };
  return (
    <div className="app-notifications">
      {serviceWorkerStore.isUpdated && SWOpen &&
      <div className="service-worker-msg" >
        <p className="text">New version of this app is available.</p>
        <div className="flex-evenly">
          <Button text={'Not Now'} style={btnStyle} type={'firebrick'}
            onClick={() => setSWOpen(false)} />
          <Button text={'Update'} style={btnStyle} type={'mediumseagreen'}
            onClick={updateServiceWorker} />
        </div>
      </div>
      }
    </div>
  );
}

export default AppNotifications;
