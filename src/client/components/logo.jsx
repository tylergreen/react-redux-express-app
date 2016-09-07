import React from 'react'
import reactCSS from 'reactcss'
import LogoImage from '../images/dragon-logo.png'

export default class extends React.Component {
    render(){
        const styles = reactCSS({
            'default': {
                logo: {
                    width: '100px',
                    height: '100px',
                    margin: '10px'
                }
            }
        })
        
        return <img style={styles.logo} src={LogoImage}/>

    }
}
