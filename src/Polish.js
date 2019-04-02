import React, { Component } from 'react'
import defaultState from './defaultState'
import styled from 'styled-components'
import polish from 'polishgenomejs'

const TextBox = styled.textarea`
  width: 100%;
  min-height: 5em;
  font-family: monospace;
`
const SeqWrap = styled.div`
  width: 100%;
  border: 1px lightblue solid;
  border-radius: 3px;
  font-size: 0.8em;
`

const NuclWrap = styled.div`
  
`

const NuclItem = styled.div`
  min-width: 1.5em;
  min-height: 1.5em;
  ${props => props.children === null ? 'background-color: darkslategray;' : ''}
`

const Nucls = styled.div`
  display: inline-block;
  margin: 1em 0;
  vertical-align: top;
`

const Nucl = props => {
  const { data } = props
  return <NuclWrap >
    {props.data && props.data.map((x, i) => <NuclItem key={i}>{x}</NuclItem>)}
  </NuclWrap>
}

class Polish extends Component{
  constructor(props) {
    super()
    this.state = {
      data: defaultState,
    }
  }
  changeTextbox(i, e) {
    e.preventDefault()
    let { data } = this.state
    data[i] = e.target.value
    this.setState({
      data,
    })
  }
  render() {
    const { data } = this.state
    const polished = [polish(data, { minLength: 20, minQuality: 1 })]
    console.log(polished)
    return <section>
      <div>
        {[...new Array(5)].map((x,i) => <TextBox key={i} value={data[i]} onChange={e => this.changeTextbox(i, e)} />)}
      </div>
      <div>
        {polished && polished.map((dataSet, i) => (
          <SeqWrap key={i}>
            {dataSet && dataSet.map((nucls, nI) => (
              <Nucls key={nI} >
                <Nucl key={i} data={nucls} />
              </Nucls>
            ))}
          </SeqWrap>
        ))}
      </div>
    </section>
  }
}

export default Polish