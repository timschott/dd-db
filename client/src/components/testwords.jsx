import React, { Component } from 'react';

class TestWords extends Component {
  constructor() {
    super();
    this.state = {
      words: []
    };
  }

componentDidMount() {
    fetch('/api/test-words')
      .then(res => res.json())
      .then(words => this.setState({words}, () => console.log('Words fetched...', words)));
  }

render() {
    return (
      <div>
        <h2 className="test-words-banner">Lads</h2>
        <ul>
        {this.state.words.map(word => 
          <li key={word.id}>{word.text} {word.book}</li>
        )}
        </ul>
        <p> those are all the words I have for you.</p>
      </div>
    );
  }
}

export default TestWords;