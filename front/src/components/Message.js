import React from 'react'
import {connect} from 'react-redux';

const mapStateToProps = state => {  
  return {
    message: state.infoMessage
  }
}

function Message(props) {
  return <div id="message">{props.message}</div>
}

export default connect(mapStateToProps, {})(Message);