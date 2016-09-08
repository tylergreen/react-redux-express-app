import React, { PropTypes, Component } from 'react'
import reactCSS from 'reactcss'
import Logo from './logo.jsx'

export default class extends Component{
    render(){
        const styles = reactCSS({
            'default': {
                container: {
                    background: 'green',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                },
                h1: {
                    color: '#FFF',
                    fontSize: '3em'
                }
            }
        })

       return <div style={styles.container}>
                    <Logo/>
                    <h1 style={styles.h1}> Habit Hookup! </h1>
                    <Logo/>
            </div>
    }
}
