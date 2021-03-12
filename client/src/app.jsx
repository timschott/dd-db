import React from 'react';
import Customers from './components/customers';
import Nav from './components/nav';
import "./styles.css";

function App() {
  return (
    <div className="App">
        <Nav />
        <div className="content-container">
        <div className="flex">
        <header className="App-header">
          <h1 className="App-welcome">This is my app!</h1>
        </header>
        <Customers />
        </div>
      </div>
    </div>
  );
}

export default App;