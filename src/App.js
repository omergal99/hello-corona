import React from 'react';
import './assets/css/App.scss';

import Router from './Router';

import NavBar from './cmps/NavBar';
import Footer from './cmps/Footer';

function App() {
  return (
    <div className="App">
      <header>
        <NavBar/>
      </header>
      <main>
        <Router/>
      </main>
      <footer>
        <Footer/>
      </footer>
    </div>
  );
}

export default App;
