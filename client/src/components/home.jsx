import React from 'react';

import TestWords from '../components/testwords';
 
const Home = () => {
    return (
       <div>
        <header className="app-header">
            <h1 className="app-welcome">This is my app!</h1>
        </header>
        <TestWords />
       </div>
    );
}

export default Home;