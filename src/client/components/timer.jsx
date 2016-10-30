import React from 'react'
import reactCSS from 'reactcss'
import { connect } from 'react-redux'

class Timer extends React.Component {

    startTimeStamp(){
        if(this.props.originalTimeStamp){
            var date = new Date(this.props.originalTimeStamp)
            return `Start Time: ${date.toDateString()} ${date.toTimeString().slice(0,8)}`
        }
        else
            return ""
    }
    
    render() {
        const styles = reactCSS({
            'default': {
                outerContainer: {
                    display: 'flex',
                    flexFlow: 'column',
                    alignItems: 'center',
                    width: '100%'
                },
                container: {
                    display: 'flex',
                    flexFlow: 'column',
                    alignItems: 'center',
                    width: '100%'
                },
                timerInfo: {
                    display: 'flex',
                    flexFlow: 'column',
                    alignItems: 'left',
                },
                h1: {
                    marginBottom: '1em'
                },
                timeStamp: {
                    height: '1.5em',
                    fontSize: '1.2em'
                }
            }
        })

        return (
            <div style={styles.outerContainer}>
                <div style={styles.container}>
                    <h1 style={styles.h1}>Timer</h1>
                    
                    <div style={styles.timerInfo}>
                        <TimerLabel/>
                        <div style={styles.timeStamp}>
                            { this.startTimeStamp() }
                        </div>
                        <TimerDisplay elapsed={time_display_string(this.props.elapsed)}/>
                    </div>
                </div>
            
                <TimerControl timer_state={this.props.timer_state} label ={ this.props.label }/>
                    
                <LapDisplay lapTimes={this.props.lapTimes}/>
            </div>
        )
    }
}

const mapTimerStateToProps = (state) => {
    console.log("map stat to props is")
    console.log(state)
    return state.timer
}


class TimerLabel extends React.Component {
    handleChange(event){
        store.dispatch(updateLabel(event.target.value))
    }
    
    render(){
        const styles = reactCSS({
            'default': {
                container: {
                    display: 'flex',
                    flexFlow: 'row',
                    fontSize: '1.2em'
                },
                input: {
                    marginLeft: '1em',
                    width: '60%'
                }
            }
        })
        
        return <div style={styles.container}>
                Timer Label:  <input style={styles.input}
                                     type="text" onChange={this.handleChange} />
        </div>
    }
}

class TimerDisplay extends React.Component {
    render() {
        const styles = reactCSS({
            'default': {
                display: {
                    fontSize: '5em',
                        marginTop: '40px',
                    marginBottom: '20px'

                }}})

        return <div style={styles.display}>
            {this.props.elapsed}
        </div>
    }
}

class TimerControl extends React.Component {
    render(){
        return this.updateButtons()
    }

    updateButtons(){
        const styles = reactCSS({
            'default': {
                container: {
                    display: 'flex',
                    justifyContent: 'center',
                    width: '100%',
                    margin: '2em'
                }}})
        
        if(this.isReady()){
            return <div style={styles.container}> <StartButton/></div>
        } else if (this.isRunning()){
            return <div style={styles.container}>
                <StopButton/>
                <LapButton/>
                </div>
        } else if (this.isStopped()) {
            return <div style={styles.container}>
                    <ResumeButton/>
                    <RecordButton/>
                    <ResetButton/>
            </div>
        }
        
        else {
            return <StartButton></StartButton>
        }
    }

    isReady() {
        return this.props.timer_state == 'Ready'
    }

    isRunning (){
        return (this.props.timer_state == 'Running')
    }

    isStopped(){
        return (this.props.timer_state == 'Stopped')
    }
}

class TimerButton extends React.Component {
    render() {
        const styles = reactCSS({
            'default': {
                button: {
                    background: this.props.color,
                    borderRadius: '2em',
                    border: '0.5em solid',
                    display:'inline-block',
                    cursor:'pointer',
                    color:'#ffffff',
                    fontFamily:'Arial',
                    fontSize:'2em',
                    padding:'1em 1em'
                }
            }})
        
        return <button style={styles.button}
        onClick={this.props.onClick}
        type={this.props.type}>
            {this.props.name}
        </button>
    }
}

TimerButton.defaultProps = {type: 'button'}

class StartButton extends React.Component {
    startTimer(){
        store.dispatch(startTimer())
    }

    render(){
        return <TimerButton color='chartreuse' onClick={this.startTimer} name='Start' />
    }
}

class StopButton extends React.Component {
    render(){
        return <TimerButton color="red" onClick={this.stopTimer} name="Stop"/>
    }

    stopTimer(){
        store.dispatch(stopTimer(store.getState().timer.interval))
    }
}

class LapButton extends React.Component {
    lapTimer() {
        store.dispatch(lapTimerAction(Date.now()))
    }
    
    render(){
        return <TimerButton
        color="yellow"
        onClick={ this.lapTimer}
        name="Lap" /> 
    }
}

class ResumeButton extends React.Component {
    render(){
        return <TimerButton
        color='chartreuse'
        name="Resume"
        onClick={this.resumeTimer}/>
    }

    resumeTimer() {
        console.log("Resuming Timer")
        store.dispatch(resumeTimer())
    }
}

class ResetButton extends React.Component {
    render() {
        return <TimerButton
        color='orange'
        name='Reset'
        onClick={this.resetTimer}/>
    }

    resetTimer() {
        console.log("Reset Timer")
        store.dispatch(resetTimer())
    }
}


class RecordButton extends React.Component {
    render(){
        // subtle dependency hack here between type=submit and the parent form for use with redux-form so we can get at input field values
        return <TimerButton
        type="submit"
        name="Record"
        color="red"
        onClick={this.recordTimer}
            />
    }

    recordTimer(){
        var state = store.getState()
        store.dispatch(recordTimer(state.timer, state.login.jwt)) // is it necessary to supply this arg ?  is timer available from within the store?
    }
}

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

class LapDisplay extends React.Component {
    render(){
        const styles = reactCSS({
            'default': {
                container: {
                    fontSize: '1.2em'
                }}
            })
            
        if(this.props.lapTimes.length > 0){
            return <div style={styles.container}>
              Lap Times 
              <ol>
                  {this.props.lapTimes.map((lap) => {
                       return <li key={lap}> {time_display_string(lap)} </li>
                   })}
              </ol>
            </div>
        }
        else
            return <div></div>
    }
}

function time_display_string(milliseconds){
    var count = milliseconds
    var seconds = Math.floor(count / 1000.0) % 60
    var minutes = Math.floor(count / 60000.0) % 60
    var hours = Math.floor(count / 3600000.0) % 60
    
    hours = ("0" + hours).slice(-2)
    minutes = ("0" + minutes).slice(-2)
    seconds = ("0" + seconds).slice(-2)
    
    return `${hours}:${minutes}:${seconds}`
}

const ActiveTimer = connect(mapTimerStateToProps)(Timer)

export default ActiveTimer