import { time_display_string } from './utils.js'

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
