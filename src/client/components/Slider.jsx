import React, { PropTypes, Component } from 'react'
import { findDOMNode } from 'react-dom'
import reactCSS from 'reactcss'


function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.substr(1)
}

function maxmin(pos, min, max) {
    if (pos < min) { return min; }
    if (pos > max) { return max; }
    return pos;
}

class Slider extends Component {
    constructor(){
        super()
        this.handleDrag = this.handleDrag.bind(this)
        this.handleNoop = this.handleNoop.bind(this)
        
        this.orientation = {
            horizontal: {
                dimension: 'width',
                direction: 'left',
                coordinate: 'x',
            },
            
            vertical: {
                dimension: 'height',
                direction: 'top',
                coordinate: 'y',
            }
        }

        this.min =  0
        this.max = 100
        this.step = 1
        this.value = 0
        this.orientation = 'horizontal'
        this.state = {
            limit: 0,
            grab: 0,
        }
    }

  // Add window resize event listener here
    componentDidMount() {
        window.addEventListener('resize', this.handleUpdate);
        this.handleUpdate();
    }

  // remove window resize event listener here
    componentWillUnmount() {
        window.removeEventListener('resize', this.handleUpdate);
    }

    handleUpdate() {
        let { orientation } = this.props;
        let dimension = 'width'
        const sliderPos = findDOMNode(this.refs.slider)['offset' + dimension];
        const handlePos = findDOMNode(this.refs.handle)['offset' + dimension]
        this.setState({
            limit: sliderPos - handlePos,
            grab: handlePos / 2,
        })
    }

    handleStart() {
        document.addEventListener('mousemove', this.handleDrag);
        document.addEventListener('mouseup', this.handleEnd);
        
    }
    
    handleDrag(e) {
        this.handleNoop(e);
        let value, { onChange } = this.props;
        if (!onChange) return;
        
        value = this.position(e);
        onChange && onChange(value);
    }
    
    handleEnd (){
        document.removeEventListener('mousemove', this.handleDrag);
        document.removeEventListener('mouseup', this.handleEnd);
        
    }

     handleNoop (e){
         e.stopPropagation();
         e.preventDefault();
     }

    getPositionFromValue(value) {
        let percentage, pos;
        let { limit } = this.state;
        let { min, max } = this.props;
        percentage = (value - min) / (max - min);
        pos = Math.round(percentage * limit);

        return pos;
        
    }

    getValueFromPosition(pos) {
        let percentage, value;
        let { limit } = this.state;
        let { orientation, min, max, step } = this.props;
        percentage = (maxmin(pos, 0, limit) / (limit || 1));

        if (orientation === 'horizontal') {
            value = step * Math.round(percentage * (max - min) / step) + min;
            
        } else {
            value = max - (step * Math.round(percentage * (max - min) / step) + min);
            
        }

        return value;
        
    }

    position(e){
        let pos, value, { grab } = this.state;
        let { orientation } = this.props;
        const node = findDOMNode(this.refs.slider);
        const coordinateStyle = 'x' 
        const directionStyle = 'left'
        const coordinate = !e.touches
              ? e['client' + capitalize(coordinateStyle)]
              : e.touches[0]['client' + capitalize(coordinateStyle)];
        const direction = node.getBoundingClientRect()[directionStyle];

        pos = coordinate - direction - grab;
        value = this.getValueFromPosition(pos);

        return value;
        
    }

    coordinates(pos) {
        let value, fillPos, handlePos;
        let { limit, grab } = this.state;
        let { orientation } = this.props;

        value = this.getValueFromPosition(pos);
        handlePos = this.getPositionFromValue(value);

        if (orientation === 'horizontal') {
            fillPos = handlePos + grab;
            
        } else {
            fillPos = limit - handlePos + grab;
            
        }

        return {
            fill: fillPos,
            handle: handlePos,
            
        };
        
    }

    render() {
        
       
        let { value, orientation, className } = this.props;

        let dimension = 'width'
        let direction = 'left'
        let position = this.getPositionFromValue(this.value)
        let coords = this.coordinates(this.position)
        
        const styles = reactCSS({
            'default': {
                slider: {
                    display: 'block',
                    boxShadow: 'inset 0px 1px 3px rgba(0, 0, 0, 0.3)',
                    height: '20px',
                    borderRadius: '10px'
                },
                fill: {
                    height: '100%',
                    background: '#27ae60',
                    borderRadius: '10px',
                    top: 0
                },
                    handle: {
                        width: '30px',
                        height: '10px',
                        left: '-10px'
                    }
                }
            })
        return( <div
                ref="slider"
                style={styles.slider}
                onMouseDown={this.handleDrag}
                onClick={this.handleNoop} >
                <div
                ref="fill"
                style={styles.fill} />
                <div
            ref="handle"
            className="rangeslider__handle"
            onMouseDown={this.handleStart}
            onTouchMove={this.handleDrag}
                onClick={this.handleNoop}
            style={styles.handle} />
                </div>
        );
    }
}

export default Slider;
