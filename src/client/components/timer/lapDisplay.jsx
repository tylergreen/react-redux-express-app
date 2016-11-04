import React from 'react'
import reactCSS from 'reactcss'

import { time_display_string } from '../utils.js'


const LapDisplay = ({lapTimes}) => {
            
        if(lapTimes != null && lapTimes.length > 0){
            return <div style={styles.container}>
              Lap Times 
              <ol>
                  {lapTimes.map((lap) => {
                       return <li key={lap}> {time_display_string(lap)} </li>
                   })}
              </ol>
            </div>
        }
        else
            return <div></div>
}

const styles = reactCSS({
    'default': {
        container: {
            fontSize: '1.2em'
        }}
})

export default LapDisplay
