// not sure if this is still useful to keep around 

class RecordsDisplay extends React.Component {

    getTimings(){
        var state = store.getState()
        store.dispatch(getTimings(state.timer, state.login.jwt))
    }
    render(){
        return <button
        onClick={this.getTimings}> GET TIMINGS </button>
    }
}
