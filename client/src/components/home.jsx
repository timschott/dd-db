import React from 'react';

import Customers from '../components/customers';
 
const Home = () => {
    return (
       <div>
        <header className="app-header">
            <h1 className="app-welcome">This is my app!</h1>
        </header>
        <Customers />
       </div>
    );
}

export default Home;