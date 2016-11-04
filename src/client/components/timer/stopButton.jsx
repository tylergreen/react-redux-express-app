import React from 'react'
import reactCSS from 'reactcss'
import { connect } from 'react-redux'
import TimerButton from './timerButton.jsx'
import { stopTimer } from '../../actions/index.js'

const StopButtonF = ({onStopClick}) => {
        return (
               <TimerButton color="red"
                            onClick={() => onStopClick()}
                            name="Stop"/>
    )
}

function mapStateToProps(state){
    return {
    }
}

const StopButton = connect(
    mapStateToProps,
    {onStopClick: stopTimer}
)(StopButtonF)

export default StopButton



