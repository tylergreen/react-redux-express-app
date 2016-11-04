import React from 'react'
import reactCSS from 'reactcss'
import { connect } from 'react-redux'
import { updateLabel } from '../../actions/index'

const TimerLabel = ({updateLabelEvent}) => {
    return <div style={styles.container}>
    Timer Label:  <input style={styles.input}
                         type="text"
                         onChange={(event) => updateLabelEvent(event.target.value)} />
        </div>
}

const mapStateToProps = (state) => {
    return {}
}

const ActiveTimerLabel = connect(
    (state) => new Object(),
    {updateLabelEvent: updateLabel }
)(TimerLabel)

export default ActiveTimerLabel

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



