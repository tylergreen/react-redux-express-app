import React from 'react'
import { connect } from 'react-redux'
import TimerButton from './timerButton.jsx'
import { lapTimerAction } from '../../actions/index.js'

const LapButtonF = ({onLapClick}) => {
    return (
        <TimerButton
            color="yellow "
            onClick={ () => onLapClick() }
            name="Lap" />
    )
}

const LapButton = connect(
      (start) => new Object(),
      {onLapClick: lapTimerAction}
)(LapButtonF)

export default LapButton

