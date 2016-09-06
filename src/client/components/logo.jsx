import React from 'react'
import reactCSS from 'reactcss'

export default class Logo extends React.Component {
    render(){
        const styles = reactCSS({
            'default': {
                logo: {
                    fill: "rgb(100, 0, 0)"
                }
            }
        })
        
        return <svg width="70" height="70">
            <circle cx="35" cy="35" r="30" style={styles.logo}/>
            </svg>
    }
}
