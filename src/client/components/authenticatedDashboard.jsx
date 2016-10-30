import React from 'react'
import reactCSS from 'reactcss'
import Timer from './timer.jsx'
import TopBar from './topBar.jsx'
import { Link } from 'react-router'
import { recordTimer } from '../actions/index'
import TimeChart from './timeChart.jsx'

const AuthenticatedDashboard = ({chartData}) => {
    return (
        <div>
            <TopBar/>
            <div> Welcome guy ! buddy
                <Link to="/profile">Edit profile</Link>
    
                <div style={styles.container}>
                        
                    </div>
            
                    <div style={styles.timer}>
                        <Timer handleSubmit={recordTimer} />
                    </div>
                    
                    <div style={styles.timeChart}>
                        <TimeChart
                            chartData={chartData}
                            />
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
            alignItems: 'center',
            alignContent: 'center'
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
            justifyContent: 'center',
            margin: '3em'
        }
    }
})

export default AuthenticatedDashboard
