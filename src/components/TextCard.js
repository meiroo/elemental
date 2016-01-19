var React = require('react');
import E from '../constants';
var ResizableAndMovable = require('./ResizableAndMovable');
var Glyph = require('./Glyph');
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
    onEditClick:function(){
    	alert('edit');
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

		var renderEle;
		if(true || this.state.hover){
			renderEle = <div style={{backgroundColor:'rgba(250, 150, 50, 0.8)',position:'absolute',textAlign:'right',bottom:'0px',left:'0px',height:'25px',width:'100%'}}>
			<span onClick={ this.onEditClick  } style={{cursor:'default',marginRight:'10px'}}><Glyph icon="pencil"/></span>
			<span onClick={ this.props.cloneHandler } style={{cursor:'copy',marginRight:'10px'}}><Glyph icon="diff-added"/></span>
			</div>;
		}else{
			renderEle = null;
		}
		return <ResizableAndMovable
         start={{x:20, y: 20, width: 200, height: 200}}
         customStyle={{background:"#fff", textAlign:"center"}}
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
        <div {...this.props} onMouseEnter={this.mouseOver} onMouseLeave={this.mouseOut} style={Object.assign(style, this.props.style)}>
			{this.props.children}
        	{renderEle}
        </div>
        
      </ResizableAndMovable>
		 
	},
});
