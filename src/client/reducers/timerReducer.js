import moment from 'moment'

let initialState = {
    timer_state: "Ready",
    originalStartTime: null,
    startTime: null,
    label: "",
    elapsed: 0,
    total_elapsed: 0
}

const timerReducer = (state=initialState, action) => {
    switch(action.type){
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
        return Object.assign({}, state, {
            timer_state: 'Ready',
            startTime: null,
            originalTimeStamp: null,
            elapsed: 0,
        })
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
    case 'TICK':
        return Object.assign({}, state, {
            elapsed: (action.currentTime - state.startTime) + state.total_elapsed,
        })
    default:
        return state
    }
}

export default timerReducer
