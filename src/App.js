import { useState } from 'react';
import './App.css';
import Calculator from './components/Calculator';

function App() {

  const [selectMode, setMode] = useState('light');
  const [isScientific, setISScientific] = useState(false);
  const toggleTheme = (e) => {
    console.log(e.target.innerText);
    e.target.innerText === 'Light Theme' ? setMode('light') : setMode('dark');
  }
  const toggleScientific = (e) => {
    setISScientific(!isScientific)
  }
  return (
    <div className={'App' + selectMode}>
    <header className="App-header">
      <button className={'btn ' + 'App' + selectMode} onClick={toggleTheme}>Light Theme</button>
      <button className={'btn ' + 'App' + selectMode} onClick={toggleTheme}>Dark Theme</button>
      <button className={'btn ' + 'App' + selectMode} onClick={toggleScientific}>{isScientific? 'Scientific OFF': 'Scientific ON'}</button>
    </header>
    <Calculator isScien={isScientific}/>
  </div>
  );
}

export default App;
