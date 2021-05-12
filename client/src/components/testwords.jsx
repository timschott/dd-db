import React, { Component } from 'react';

class TestWords extends Component {
  constructor() {
    super();
    this.state = {
      res_data: {words:[], books:[]}
    };
  }

componentDidMount() {
  fetch('/api/words')
  .then(res => res.json())
  .then(res_data => {
    console.log(JSON.stringify(res_data.words));
    this.setState({res_data});
  });
  }

render() {
    return (
      <div>
        <h2 className="test-words-banner">Lads</h2>
        <ul>
        {this.state.res_data.words.map(word => 
          <li>{word}</li>
        )}
        </ul>
        <p> those are all the words I have for you.</p>
      </div>
    );
  }
}

export default TestWords;