import React from 'react'
import reactCSS from 'reactcss'
import { connect } from 'react-redux'

import StartButton from './startButton.jsx'
import StopButton from './stopButton.jsx'
import LapButton from './lapButton.jsx'
import ResetButton from './resetButton.jsx'
import RecordButton from './recordButton.jsx'
import ResumeButton from './resumeButton.jsx'

const TimerControl = ({timer_state}) => {
    if(isReady(timer_state)){
            return <div style={styles.container}>
                        <StartButton/>
                    </div>
        } else if (isRunning(timer_state)){
            return <div style={styles.container}>
                        <StopButton/>
                        <LapButton/>
            </div>          
        } else if (isStopped(timer_state)) {
            return <div style={styles.container}>
                    <ResumeButton />
                    <RecordButton />
                    <ResetButton />
            </div>
        }
        
        else {
            return <StartButton />
        }
}

const styles = reactCSS({
    'default': {
        container: {
            display: 'flex',
            justifyContent: 'center'
        }
    }
})

//  use es6 symbols instead
function isReady(timer_state){
    return timer_state == 'Ready'
}

function isRunning (timer_state){
    return (timer_state == 'Running')
}

function isStopped(timer_state){
    return (timer_state == 'Stopped')
}

const mapStateToProps = (state) => {
    return {
        timer_state: state.timer.timer_state
    }
}

const ActiveTimerControl = connect(mapStateToProps)(TimerControl)


export default ActiveTimerControl




