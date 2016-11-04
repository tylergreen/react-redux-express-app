import React from 'react'
import reactCSS from 'reactcss'

const TimerButton = ({color, name, onClick}) => {
    console.log("color is")
    console.log(color)
    const styles = reactCSS({
    'default': {
        button: {
            background: color,  
            borderRadius: '2em',  
            border: '0  .5em solid',
            display:'inl     ine-block',
            cursor:'pointer', 
            color:'#ffffff',  
            fontFamily:'Arial'  ,
            fontSize:'2em',     
            padding:'1em 1em'   
        }   
    }})

    return <button style={styles.button}
                   onClick={ onClick }
                   type='button'>
    {name}
    </button>
}


export default TimerButton


