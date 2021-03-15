import React, { Component } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';

class Nav extends Component {

componentDidMount() {
    const cssUrl = "styles.css";
    this.addStyle(cssUrl);
}

// only add the default if it's not there
// to preserve dark mode across page refresh
// syntax note - url is a parameter that flows into the function from line 8
addStyle = url => {
    const dark = document.getElementById("dark-mode");
    if (dark === undefined || dark === null) {
        const style = document.createElement("link");
        style.href = url;
        style.rel = "stylesheet";
        style.async = true;
        style.id = "light-mode";
        style.className ="stylesheet"
        document.head.appendChild(style);
    }
};

// check if dark mode is already set.
// and update accordingly
darkMode() {
    const styleSheet = document.head.getElementsByClassName("stylesheet")[0];
    const button = document.getElementById("dark-mode-button");
    if (styleSheet === undefined) {
        console.log('something weird in #darkMode');
        return;
    }
    const href = styleSheet.href;
    // light mode -> dark mode 
    if (href.includes('styles.css')) {
        console.log('shifting to dark mode!');
        button.textContent = "☀️";
        const head = document.getElementsByTagName("head")[0];
        // remove the current style sheet
        styleSheet.disabled = true;
        styleSheet.parentNode.removeChild(styleSheet);
        // inject dark mode
        const link = document.createElement("link");
        link.href = "dark.css";
        link.rel = "stylesheet";
        link.id = "dark-mode";
        link.async = true;
        link.className = "stylesheet";
        head.appendChild(link)
        return;
    // dark mode --> light mode    
    } else {
        console.log('shifting to light mode!');
        // remove dark mode
        styleSheet.disabled = true;
        styleSheet.parentNode.removeChild(styleSheet);
        // inject light mode
        const link = document.querySelectorAll('#dark-mode');
        if (link) {
            link.forEach((el) => el.remove());
            button.textContent = '🌙';
        }
        const style = document.createElement("link");
        style.href = "styles.css";
        style.rel = "stylesheet";
        style.async = true;
        style.id = "light-mode";
        style.className ="stylesheet"
        document.head.appendChild(style);
        return;
    }
}



render() {
    return (
        <Router>
        <nav className="navbar">
            <div className="flex-container">
                <Link to="/" className="flex-item">Home</Link>
                <Link to="/" className="flex-item">About</Link>
                <button id="dark-mode-button" className="flex-item" onClick={this.darkMode}>🌙</button>
            </div>
        </nav>
        </Router>
    );
  }
}

export default Nav;