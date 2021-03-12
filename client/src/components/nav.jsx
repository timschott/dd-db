import React, { Component } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';

class Nav extends Component {

render() {
    return (
        <Router>
        <nav className="navbar">
            <div className="container">
                <div className="flex">
                    <div className="flex">
                    <Link to="/">Home</Link>
                    <Link to="/">Customer Test</Link>
                    </div>
                    </div>
            </div>
        </nav>
        </Router>
    );
  }
}

export default Nav;