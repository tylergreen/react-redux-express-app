import reactCSS from 'reactcss'

export default reactCSS({
    'default': {
        button: {
            background: 'green',
            borderRadius: '28px',
            border: '0.25em solid #18ab29',
            display:'inline-block',
            cursor:'pointer',
            color:'#ffffff',
            fontFamily:'Arial',
            fontSize:'17px',
            padding:'0.5em',
            textDecoration:'none',
            textShadow:'0px 1px 0px #2f6627',
            margin: '0.5em'
        },
        
        buttonNoMargin: {
            background: 'green',
            borderRadius: '28px',
            border: '0.25em solid #18ab29',
            display:'inline-block',
            cursor:'pointer',
            color:'#ffffff',
            fontFamily:'Arial',
            padding:'0.5em',
            textDecoration:'none',
            textShadow:'0px 1px 0px #2f6627',
            marginLeft: '2em',
            fontSize:'17px',
        }
    }

})


