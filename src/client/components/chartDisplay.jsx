import React, { PropTypes, Component } from 'react'
import reactCSS from 'reactcss'
import { Bar as BarChart } from 'react-chartjs'
import Registration from './registration.jsx'
import { Link } from 'react-router'

export default class extends Component{

    chartOptions(){
        return {
            scales:
                {yAxes: [
                    {type: 'logarithmic'}
                ]
                }
        }
    }

    render(){
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

        if(this.props.chartData != null){
            return <div style={styles.outerContainer}>
                
                <div style={styles.yAxisLabel}>
                 Duration (minutes)
                </div>

                <div style={styles.innerContainer}>

                <BarChart
            data={this.props.chartData}
            options={this.chartOptions()}
            width="300" height="250"
                />

            <div style={styles.xAxisLabel}>
                Date of Recording and Start Time
            </div>
                
            </div>
                </div>
        } else {
            return <div style={styles.container}>
                 </div>
        }
     }
}
