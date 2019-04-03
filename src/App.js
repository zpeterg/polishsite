import React, { Component } from 'react'
import styled from 'styled-components'
import './App.css'
import Polish from './Polish'

const Title = styled.h4`
  margin: 3px;
`

const Desc = styled.p`
  font-size: 0.5em;
`

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Title>PolishGenomeJS</Title>
          <Desc>
            A prototype genome polisher written in JavaScript.
            This does only simple string-based matching and is not intended for lab use.
            This accomodates only 1 nucleotide error at a time.
          </Desc>
          <Polish />
        </header>
      </div>
    );
  }
}

export default App;
