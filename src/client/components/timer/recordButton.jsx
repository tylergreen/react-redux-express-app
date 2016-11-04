import React from 'react'
import { connect } from 'react-redux'
import TimerButton from './timerButton.jsx'
import { recordTimer } from '../../actions/index.js'

const RecordButtonF = ({onRecordClick}) => {
        return <TimerButton
        type="submit"
        name="Record"
        color="red"
        onClick={ () => onRecordClick() }
            />
}

const RecordButton = connect(
    (state) => new Object(),
    {onRecordClick: recordTimer}
)(RecordButtonF)

export default RecordButton
