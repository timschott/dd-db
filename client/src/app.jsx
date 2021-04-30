import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import About from './components/about';
import Error from './components/error';
import Home from './components/home';
import Nav from './components/nav';

function App() {

  return (
    <BrowserRouter>
    <div className="App">
      <Nav />
        <Switch>
         <Route path="/" component={Home} exact/>
         <Route path="/about" component={About}/>
        <Route component={Error}/>
       </Switch>
    </div> 
  </BrowserRouter>
  );
}

export default App;