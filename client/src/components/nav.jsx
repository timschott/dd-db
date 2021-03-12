import React, { Component } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';

class Nav extends Component {

render() {
    return (
        <Router>
        <nav className="navbar">
            <div className="flex-container">
                <Link to="/" class="flex-item">Home</Link>
                <Link to="/" class="flex-item">About</Link>
                <button id="dark-mode-button" class="flex-item">🌙</button>
            </div>
        </nav>
        </Router>
    );
  }
}

export default Nav;