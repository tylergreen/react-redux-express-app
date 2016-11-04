import React from 'react'
import reactCSS from 'reactcss'
import { connect } from 'react-redux'
       
const TimerDisplay = ({elapsed}) => {
        return <div style={styles.display}>
            {elapsed}
        </div>
}

const styles = reactCSS({
    'default': {
        display: {
            fontSize: '5em',
            marginTop: '40px',
            marginBottom: '20px'
        }}})

export default TimerDisplay
