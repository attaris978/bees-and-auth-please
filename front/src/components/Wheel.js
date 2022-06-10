import React from 'react'
import {connect} from 'react-redux';
import {moveClockwise, moveCounterClockwise} from '../state/action-creators';

const mapStateToProps = state => {
  return {
    wheel: state.wheel
  }
}

function Wheel(props) {
  return (
    <div id="wrapper">
      <div id="wheel">
        <div className={`cog ${props.wheel === 0 ? "active" : ""}`} style={{ "--i": 0 }}>{`${props.wheel === 0 ? "B" : ""}`}</div>
        <div className={`cog ${props.wheel === 1 ? "active" : ""}`} style={{ "--i": 1 }}>{`${props.wheel === 1 ? "B" : ""}`}</div>
        <div className={`cog ${props.wheel === 2 ? "active" : ""}`} style={{ "--i": 2 }}>{`${props.wheel === 2 ? "B" : ""}`}</div>
        <div className={`cog ${props.wheel === 3 ? "active" : ""}`} style={{ "--i": 3 }}>{`${props.wheel === 3 ? "B" : ""}`}</div>
        <div className={`cog ${props.wheel === 4 ? "active" : ""}`} style={{ "--i": 4 }}>{`${props.wheel === 4 ? "B" : ""}`}</div>
        <div className={`cog ${props.wheel === 5 ? "active" : ""}`} style={{ "--i": 5 }}>{`${props.wheel === 5 ? "B" : ""}`}</div>{/* --i is a custom CSS property, no need to touch that nor the style object */}
      </div>
      <div id="keypad">
        <button id="counterClockwiseBtn" onClick={props.moveCounterClockwise} >Counter clockwise</button>
        <button id="clockwiseBtn" onClick={props.moveClockwise}>Clockwise</button>
      </div>
    </div>
  )
}

export default connect(mapStateToProps, {moveClockwise, moveCounterClockwise})(Wheel);