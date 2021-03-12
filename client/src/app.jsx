import React from 'react';
import Customers from './components/customers';
import "./styles.css";

function App() {
  return (
    <div className="App">
        <header className="App-header">
          <h1 className="App-welcome">This is my app!</h1>
        </header>
        <Customers />
    </div>
  );
}

export default App;