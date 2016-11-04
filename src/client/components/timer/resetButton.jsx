import React from 'react'
import reactCSS from 'reactcss'
import { connect } from 'react-redux'
import TimerButton from './timerButton.jsx'
import { resetTimer } from '../../actions/index.js'

const ResetButtonF = ({onResetClick}) => {
        return <TimerButton
        color='orange'
        name='Reset'
        onClick={() => onResetClick()}/>
}

const ResetButton = connect(
    (start) => new Object(),
    {onResetClick: resetTimer}
)(ResetButtonF)

export default ResetButton
