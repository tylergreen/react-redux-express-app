import React from 'react'
import { connect } from 'react-redux'
import TimerButton from './timerButton.jsx'
import { resumeTimer } from '../../actions/index.js'

const ResumeButtonF = ({onResumeClick}) => {
        return <TimerButton
        color='chartreuse'
        name="Resume"
        onClick={ () => onResumeClick() }/>
}   


const ResumeButton = connect(
    (state) => new Object(),
    {onResumeClick: resumeTimer}
)(ResumeButtonF)

export default ResumeButton



