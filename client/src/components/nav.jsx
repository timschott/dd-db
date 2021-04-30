import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Nav extends Component {

// initial load
componentDidMount() {
    const btn = document.getElementById("dark-mode-button");
    const currentTheme = localStorage.getItem("theme");
    const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)");
    var theme = null;
    if (currentTheme === null) { // no theme is in storage on initial load
        if (prefersDarkMode.matches) {
            document.body.classList.toggle("dark-mode");
            theme = "dark";
        } else {
            document.body.classList.toggle("light-mode");
            theme = "light";
        }
        btn.textContent = theme === "dark" ? "☀️" : "🌙";
        localStorage.setItem("theme", theme);
    } else { // we have found a theme
        if (currentTheme === "dark") {
            document.body.classList.toggle("dark-mode");
        } else {
            document.body.classList.toggle("light-mode");
        }
        btn.textContent = currentTheme === "dark" ? "☀️" : "🌙";
    }
};

darkMode() {
    const btn = document.getElementById("dark-mode-button");
    var currentTheme = localStorage.getItem("theme");
    var newTheme = null;

    // propagate to doc body so css changes
    if (currentTheme === "dark") {
        document.body.classList.remove("dark-mode");
        document.body.classList.toggle("light-mode");
        btn.textContent = "🌙";
        newTheme = "light";
    } else if (currentTheme === "light") {
        document.body.classList.remove("light-mode");
        document.body.classList.toggle("dark-mode");
        btn.textContent = "☀️";
        newTheme = "dark";
    }

    // persist the theme to local storage
    localStorage.setItem("theme", newTheme);
};

render() {
    return (
        <nav className="navbar">
            <div className="flex-container">
                <NavLink to="/" className="flex-item">Home</NavLink>
                <NavLink to="/about" className="flex-item">About</NavLink>
                <button id="dark-mode-button" className="flex-item" onClick={this.darkMode}>🌙</button>
            </div>
        </nav>
    );
  }
}

export default Nav;