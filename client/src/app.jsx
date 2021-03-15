import React from 'react';
import Customers from './components/customers';
import Nav from './components/nav';

function App() {
  return (
    <div className="App">
        <Nav />
          <header className="app-header">
            <h1 className="app-welcome">This is my app!</h1>
          </header>
          <Customers />
    </div>
  );
}

export default App;