import React from 'react'
import reactCSS from 'reactcss'

import { connect } from 'react-redux'
import {time_display_string } from '../utils.js'

import TimerDisplay from './timerDisplay.jsx'
import LapDisplay from './lapDisplay.jsx'
import TimerLabel from './timerLabel.jsx'
import TimerControl from './timerControl.jsx'

const Timer = ({originalTimeStamp,
                elapsed,
                timer_state,
                label,
                lapTimes }) => {
                    return (
                        <div style={styles.container}>
                            <div
                                style={styles.timerInfo}>
                                <TimerLabel/>
                                <div style={styles.timeStamp}>
                                    { startTimeStamp(originalTimeStamp) }
                                </div>
                                <TimerDisplay elapsed={time_display_string(elapsed)}/>
                            </div>
            
                            <TimerControl
                                label ={ label }/>
                            
                            <LapDisplay lapTimes={lapTimes}/>
                        </div>
    )
                }

function startTimeStamp(originalTimeStamp){
    if(originalTimeStamp){
        var date = new Date(originalTimeStamp)
        return `Start Time: ${date.toDateString()} ${date.toTimeString().slice(0,8)}`
    }
    else
        return ""
}


const styles = reactCSS({
    'default': {
        container: {
            display: 'flex',
            flexFlow: 'column',
            alignItems: 'center',
            width: '100%'
        },
        timerInfo: {
            display: 'flex',
            flexFlow: 'column',
            alignItems: 'left',
        },
        title: {
            marginBottom: '1em',
            fontSize: '2em'
        },
        timeStamp: {
            height: '1.5em',
            fontSize: '1.2em'
        }
    }
})

const mapStateToProps = (state) => {
    console.log("map stat to props is")
    console.log(state)
    return state.timer
}

const ActiveTimer = connect(mapStateToProps)(Timer)

export default ActiveTimer
