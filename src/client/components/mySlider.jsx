import React from 'react'
import sliderStyle from '../css/slider.css'
import Slider from 'react-rangeslider'
import CSSModules from 'react-css-modules'
import reactCSS from 'reactcss'

class MySliderBase extends React.Component {
    constructor() {
        super()
        this.state = {
            value: 10
        }
    }

    handleChange(value) {
        this.setState({
            value: value
        })
    }

    render() {
        const styles = reactCSS({
            'default': {
                container: {
                    margin: '20px auto 0',
                    padding: '40px',
                    position: 'relative'
                }
            }
        })
        
        return <div style={styles.container}>
            <Slider
        value={this.state.value}
        orientation="horizontal"
        onChange={this.handleChange} />
            </div>
    }
}

export const MySlider = CSSModules(MySliderBase, sliderStyle)




