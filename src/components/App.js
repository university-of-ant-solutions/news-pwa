import React, { Component } from 'react';
import { Item } from './list';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Item entity={{
          url: 'https://insect.sh/',
          title: 'Show HN: Insect – a high-precision scientific calculator with physical units',
          score: '42',
          by: 'sharkdp',
        }} />
      </div>
    );
  }
}

export default App;
