import React from 'react';
import './App.css';
import {Home} from './components/home/Home';

const App = () => {
  return (
    <div className="App">
      <header>
        <h1>Pokedex</h1>
      </header>
      <main>
        <Home />
      </main>
      <footer>
        <span className="me-2">Copyright ©</span>
        NTT DATA
      </footer>
    </div>
  );
};

export default App;
