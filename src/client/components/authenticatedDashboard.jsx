import React from 'react'
import reactCSS from 'reactcss'
import Timer from './timer/timer.jsx'
import TopBar from './topBar.jsx'
import { Link } from 'react-router'
import { recordTimer } from '../actions/index'
import TimeChart from './timeChart.jsx'

const AuthenticatedDashboard = ({}) => {
    return (
        <div>
            <TopBar/>
            
            <div style={styles.container}>
                <div style={styles.timer}>
                    <Timer
                        handleSubmit={recordTimer} />
                </div>
                    
                <div style={styles.timeChart}>
                    <TimeChart />
                </div>
            </div>
        </div>
    )
}

const styles = reactCSS({
    'default': {
        container: {
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'flex-start',
            alignContent: 'center',
            margin: '3em'
        },
        h1: {
            color: '#FFF',
            fontSize: '3em'
        },
        links: {
            display: 'flex',
            justifyContent: 'space-around',
            margin: '1em'
        },
        timer: {
            display: 'flex',
            justifyContent: 'center'
        }
    }
})

export default AuthenticatedDashboard
