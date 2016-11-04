import React, { PropTypes, Component } from 'react'
import reactCSS from 'reactcss'
import { connect } from 'react-redux'

import ChartDisplay from './chartDisplay.jsx'
import { updateSearchLabel,
         searchTimings
       } from '../actions/index'
import ButtonStyles from './styles/buttonStyles'

const TimeChart = ({chartData,
                    updateInput,
                    search }) => {
                        return (
                            <div>
                                <div style={styles.container}>
                                    Search times by Label:
            
                                    <input
                                        type="text"
                                        style={styles.textInput }
                                        onChange={ (event) => updateInput(event.target.value) } />
                                    
                                    <button
                                        style={ButtonStyles.buttonNoMargin}
                                        onClick={() => search()}>
                                        Search
                                    </button>
                                </div>
            
                                <div style={styles.chart}>
                                    <ChartDisplay chartData={chartData}/>
                                </div>
                            </div>
                        )
                    }

const styles = reactCSS({
    'default': {
        container: {
            display: 'flex',
            justifyContent: 'space-around',
            fontSize: '1.2em'
        },
        chart: {
            display: 'flex',
            justifyContent: 'center',
        },
        textInput: {
            height: '2em',
            width: '15em',
            marginLeft: '1em'
        },
        button: {
            
        }
    }
})

const mapStateToProps = (state) => {
    return {
        timer_state: state.timer,
        chartData: state.timer.chartData
    }
}

const ActiveTimeChart = connect(
    mapStateToProps,
    {updateInput: updateSearchLabel,
     search: searchTimings 
    }    
)(TimeChart)

export default ActiveTimeChart

