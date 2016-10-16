import React from 'react'
import reactCSS from 'reactcss'
import LogoImage from '../images/octa-dragon-logo.png'

export default class extends React.Component {
    render(){
        const styles = reactCSS({
            'default': {
                logo: {
                    width: '50px',
                    height: '50px',
                    margin: '10px'
                }
            }
        })
        
        return <img style={styles.logo} src={LogoImage}/>

    }
}
