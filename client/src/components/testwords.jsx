import React, { Component } from 'react';

class TestWords extends Component {
  constructor() {
    super();
    this.state = {
      words: []
    };
  }

componentDidMount() {
    fetch('/api/words')
      .then(res => res.json())
      .then(words => this.setState({words}));
  }

render() {
    return (
      <div>
        <h2 className="test-words-banner">Lads</h2>
        <ul>
        {this.state.words.map(word => 
          <li>{word}</li>
        )}
        </ul>
        <p> those are all the words I have for you.</p>
      </div>
    );
  }
}

export default TestWords;