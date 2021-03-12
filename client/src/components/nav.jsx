import React, { Component } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';

class Nav extends Component {

render() {
    return (
        <Router>
        <nav className="navbar">
            <div className="container">
                <div className="nav-container">
                    <div className="flex">
                    <Link to="/" class="nav-item">Home</Link>
                    <Link to="/" class="nav-item">About</Link>
                    <button id="dark-mode-button">🌙</button>
                    </div>
                    </div>
            </div>
        </nav>
        </Router>
    );
  }
}

export default Nav;