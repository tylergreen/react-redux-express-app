import React from 'react'
import reactCSS from 'reactcss'
import { connect } from 'react-redux'
import TimerButton from './timerButton.jsx'
import { startTimer } from '../../actions/index.js'

const StartButtonF = ({onStartClick}) => {
    return (
        <TimerButton
            color='chartreuse'
            onClick={() => onStartClick()}
            name='Start' />
        )
}

const StartButton = connect(
      (start) => new Object(),
      {onStartClick: startTimer}
)(StartButtonF)

export default StartButton

