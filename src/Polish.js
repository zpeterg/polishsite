import React, { Component } from 'react'
import defaultState from './defaultState'
import styled from 'styled-components'
import polish from 'polishgenomejs'

const Button = styled.button`
  background-color: darkslategray;
  color: white;
  border: 0.5px solid rgba(255, 255, 255, ${props => props.selected ? 1 : 0});
  font-size: 0.8em;
  margin: 15px;
  padding: 0.3em;
  &:hover {
    border-color: rgba(255, 255, 255, 1);
  }
`

const TextBox = styled.textarea`
  width: 100%;
  min-height: 4em;
  font-family: monospace;
`
const SeqWrap = styled.div`
  width: 100%;
  border: 1px gray solid;
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
  &:hover {
    background-color: gray;
  }
`

const Nucl = props => {
  const { data } = props
  return <NuclWrap >
    {data && data.map((x, i) => <NuclItem key={i}>{x}</NuclItem>)}
  </NuclWrap>
}

class Polish extends Component{
  constructor(props) {
    super()
    this.state = {
      data: defaultState,
      step: 100,
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
  changeStep(e, step) {
    this.setState({
      step: step,
    })
  }
  render() {
    const { data, step } = this.state
    const polished = polish(data, { minLength: 20, minQuality: 1 }, step)
    return <section>
      <div>
        {[...new Array(4)].map((x,i) => <TextBox key={i} value={data[i]} onChange={e => this.changeTextbox(i, e)} />)}
      </div>
      <div>
        <Button selected={step === 0} onClick={e => this.changeStep(e, 0)}>Clean By Length</Button>
        <Button selected={step === 1} onClick={e => this.changeStep(e, 1)}>Clean By Quality</Button>
        <Button selected={step === 2} onClick={e => this.changeStep(e, 2)}>Align</Button>
        <Button selected={step === 100} onClick={e => this.changeStep(e, 100)}>Consensus</Button>
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