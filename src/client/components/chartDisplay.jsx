import React, { PropTypes, Component } from 'react'
import reactCSS from 'reactcss'
import { Bar as BarChart } from 'react-chartjs'
import Registration from './registration.jsx'
import { Link } from 'react-router'

const chartOptions = {
    scales:
           {yAxes: [
               {type: 'logarithmic'}    ]
           }
}

const ChartDisplay = ({chartData}) => {
    if(chartData != null){
        console.log("GOT DA DATA")
        return (
            <div style={styles.outerContainer}>
                
                <div style={styles.yAxisLabel}>
                    Duration (minutes)
                </div>
            
                <div style={styles.innerContainer}>

                    <BarChart
                        data={chartData}
                        options={chartOptions}
                        width="300" height="250"
                    />

                    <div style={styles.xAxisLabel}>
                        Date of Recording and Start Time
                    </div>
                
                </div>
            </div>
        )
        } else {
            return <div style={styles.container}>
                 </div>
        }
}

const styles = reactCSS({
    'default': {
        outerContainer: {
            display: 'flex',
            flexFlow: 'row'
            
        },
        innerContainer: {
            display: 'flex',
            flexFlow: 'column',
            alignContent: 'center',
            alignItems: 'center'
        },
        yAxisLabel: {
            
        },
        xAxisLabel: {
                    
        },
    }
})

export default ChartDisplay
