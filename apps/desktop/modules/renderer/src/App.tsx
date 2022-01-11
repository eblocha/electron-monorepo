import { useEffect } from 'react';
import logo from '../assets/logo.svg';
import './App.css';

const App = () => {
  useEffect(() => {
    window.main.title.maximize();
  }, []);

  return (
    <div className="App" id="app">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
      </header>
    </div>
  );
};

export default App;
