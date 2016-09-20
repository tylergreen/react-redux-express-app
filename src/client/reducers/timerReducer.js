import moment from 'moment'
import _ from 'lodash'

let initialState = {
    timer_state: "Ready",
    originalTimeStamp: null,
    startTime: null,
    label: "",
    elapsed: 0,
    total_elapsed: 0,
    lapTimes: [],
    chartData: null
}

const timerReducer = (state=initialState, action) => {
    switch(action.type){
    case 'RECEIVED_CHART_DATA':
        return Object.assign({}, state, {
            chartData: action.chartData
        })
    case 'UPDATE_SEARCH_LABEL':
        return Object.assign({}, state, {
            searchLabel: action.label
        })
    case 'UPDATE_LABEL':
        return Object.assign({}, state, {
            label: action.label
        })
    case 'START_TIMER':
        return Object.assign({}, state, {
            timer_state: 'Running',
            originalTimeStamp: Date.now(),
            startTime: Date.now(),
            interval: action.interval
        })
    case 'STOP_TIMER':
        return Object.assign({}, state, {
            timer_state: 'Stopped',
            interval: null,
            total_elapsed: state.elapsed
        })
    case 'RESET_TIMER':
        var newState = Object.assign({}, initialState, {label:
                                                        state.label})
        return Object.assign({}, state, newState)
    case 'RESUME_TIMER':
        return Object.assign({}, state, {
            timer_state: 'Running',
            startTime: Date.now(),
            interval: action.interval
        })
    case 'RECORD_TIMER':
        return Object.assign({}, state,{
            timer_state: 'Ready'
        })
    case 'LAP_TIMER':
        return Object.assign({}, state, {
            lapTimes: _.concat(state.lapTimes, action.lapTime - state.startTime + state.total_elapsed),
        })
    case 'TICK':
        return Object.assign({}, state, {
            elapsed: (action.currentTime - state.startTime) + state.total_elapsed,
        })
    default:
        return state
    }
}

export default timerReducer
