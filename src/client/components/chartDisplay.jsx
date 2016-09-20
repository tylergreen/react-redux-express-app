import React, { PropTypes, Component } from 'react'
import reactCSS from 'reactcss'
import { Bar as BarChart } from 'react-chartjs'
import Registration from './registration.jsx'
import LoginForm from './loginForm.jsx'
import { Link } from 'react-router'


export default class extends Component{

    chartOptions(){
        return {}
    }

       render(){
               const styles = reactCSS({
            'default': {
                container: {
                    margin: '1em'
                }
            }
        })

        if(this.props.chartData != null){
            return <div style={styles.container}>
                <BarChart data={this.props.chartData} options={this.chartOptions} width="300" height="250" />
                </div>
        } else {
          return <div style={styles.container}>
                 WAITING FOR CHART DATA
                 </div>
        }
     }
}  
