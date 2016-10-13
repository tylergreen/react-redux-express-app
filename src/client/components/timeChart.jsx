import React, { PropTypes, Component } from 'react'
import reactCSS from 'reactcss'
import ChartDisplay from './chartDisplay.jsx'
import { updateSearchLabel,
         searchTimings
       } from '../actions/index'
import ButtonStyles from './styles/buttonStyles'

export default class extends Component{
    constructor(){
        super()
        this.handleChange  =  this.handleChange.bind(this)
        this.search  =  this.search.bind(this)
    }
      handleChange(event){
          console.log("updating search label")
 this.props.store.dispatch(updateSearchLabel(event.target.value))
    }

    search(){
        var label = this.props.store.getState().timer.searchLabel
        var jwt  = this.props.store.getState().login.jwt
        this.props.store.dispatch(searchTimings(label, jwt))
    }

       render(){
               const styles = reactCSS({
            'default': {
                container: {
                    display: 'flex',
                    justifyContent: 'space-around',
                    margin: '1em'
                    
                },
                chart: {
                    display: 'flex',
                    justifyContent: 'center',
                },
                textInput: {
                    height: '2em',
                    width: '15em'
                }
            }
        })

           return <div>
               <div style={styles.container}>
               Search times by Label: <input type="text" style={styles.textInput } onChange={this.handleChange} ></input>

               <button style={ButtonStyles.button} onClick={this.search}>
               Search Timings Database
           </button>
               
               </div>

               <div style={styles.chart}>
               <ChartDisplay chartData={this.props.chartData}/>
               </div>

           </div>
       }
}
