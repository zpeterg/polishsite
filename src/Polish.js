import React, { Component } from 'react'
import defaultState from './defaultState'
import styled from 'styled-components'
import polish from 'polishgenomejs'

const Section = styled.section`
  width: 100%;
`

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

const Input = styled.input`
  width: 4em;
  background-color: darkslategray;
  font-size: 0.6em;
  border: none;
  padding: 0.3em;
  margin: 0 1em;
  color: white;
  border-bottom: 0.5px solid white;
`

const InputText = styled.span`
  font-size: 0.6em;
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
      maxErrorRate: 0.2,
      minLength: 20,
      minQuality: 1,
      searchLength: 6,
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
  changeOption(e, which) {
    e.preventDefault()
    const newVal = e.target.value
    if (which === 'minLength') this.setState({ minLength: newVal })
    else if (which === 'minQuality') this.setState({ minQuality: newVal })
    else if (which === 'maxErrorRate') this.setState({ maxErrorRate: newVal })
    else if (which === 'searchLength' && newVal > 0) this.setState({ searchLength: newVal })
  }
  render() {
    const { data, step, minLength, minQuality, maxErrorRate, searchLength } = this.state
    const polished = polish(data, { minLength, minQuality, maxErrorRate, searchLength }, step)
    return <Section>
      <div>
        {[...new Array(4)].map((x,i) => <TextBox key={i} value={data[i]} onChange={e => this.changeTextbox(i, e)} />)}
      </div>
      <div>
        <InputText>Min. Length</InputText>
        <Input type='number' onChange={e => this.changeOption(e, 'minLength')} value={minLength} />
        <InputText>Min. Seq. Quality</InputText>
        <Input type='number' onChange={e => this.changeOption(e, 'minQuality')} value={minQuality} />
        <InputText>Max Error Rate</InputText>
        <Input type='number' onChange={e => this.changeOption(e, 'maxErrorRate')} value={maxErrorRate} />
        <InputText>Search Length</InputText>
        <Input type='number' onChange={e => this.changeOption(e, 'searchLength')} value={searchLength} />
      </div>
      <div>
        <Button selected={step === 0} onClick={e => this.changeStep(e, 0)}>1.Clean By Length</Button>
        <Button selected={step === 1} onClick={e => this.changeStep(e, 1)}>2.Clean By Quality</Button>
        <Button selected={step === 2} onClick={e => this.changeStep(e, 2)}>3.Align</Button>
        <Button selected={step === 100} onClick={e => this.changeStep(e, 100)}>4.Consensus</Button>
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
    </Section>
  }
}

export default Polish