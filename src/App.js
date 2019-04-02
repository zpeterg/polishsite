import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import Polish from './Polish'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h4>PolishGenomeJS</h4>
          <Polish />
        </header>
      </div>
    );
  }
}

export default App;
