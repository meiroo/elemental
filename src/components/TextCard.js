var React = require('react');
import E from '../constants';
var ResizableAndMovable = require('./ResizableAndMovable');

module.exports = React.createClass({
	displayName: 'TextCard',
	propTypes: {
		children: React.PropTypes.node.isRequired,
		style: React.PropTypes.object,
	},
	getInitialState: function () {
        return {hover: false};
    },

    mouseOver: function () {
        this.setState({hover: true});
    },

    mouseOut: function () {
        this.setState({hover: false});
    },
	render () {
		let style = {
			backgroundColor: this.state.hover?'rgba(250, 250, 250, 0.0745098)':'white',
			borderRadius: E.borderRadius.sm,
			boxShadow: '0 2px 3px rgba(0, 0, 0, 0.075), 0 0 0 1px rgba(0,0,0,0.1)',
			marginBottom: E.spacing.md,
			padding: E.spacing.md,
			wordBreak:'break-all',
			height:'100%',
			'overflow':'hidden',
		};
		return <ResizableAndMovable
         start={{x:20, y: 20, width: 200, height: 200}}
         customStyle={{background:"#fff", textAlign:"center", paddingTop: '20px'}}
         minWidth={200}
         minHeight={200}
         maxWidth={300}
         maxHeight={300}
         onResizeStart={() => console.log('resize start')}
         onResize={size => console.log(size)}
         onResizeStop={size => console.log(`resize stop width=${size.width}, height=${size.height}`)}
         onDragStart={() => console.log('drag start')}
         onDrag={(e, ui) => {
           console.dir(ui);
           console.log(e);
         }}
         onDragStop={() => console.log('drag stop')} >
        <div {...this.props} onMouseEnter={this.mouseOver} onMouseLeave={this.mouseOut} style={Object.assign(style, this.props.style)} />
      </ResizableAndMovable>
		 
	},
});
