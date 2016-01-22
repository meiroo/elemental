var React = require('react');
import E from '../constants';
var ResizableAndMovable = require('./ResizableAndMovable');
var Glyph = require('./Glyph');
module.exports = React.createClass({
	displayName: 'TextCard',
	propTypes: {
		style: React.PropTypes.object,
	},
	getInitialState: function () {
        return {
        	hover: false,
        	position:{left:this.props.initPos.x,top:this.props.initPos.y},
        	size:{width:this.props.initPos.width,height:this.props.initPos.height},
        };
    },

    mouseOver: function () {
        this.setState({hover: true});
    },

    mouseOut: function () {
        this.setState({hover: false});
    },
	render () {
		let style = {
			backgroundColor: this.state.hover?'rgba(250, 250, 250, 0.845098)':'rgba(250, 250, 250, 0.00745098)',
			borderRadius: E.borderRadius.sm,
			boxShadow: !this.props.preview ? '0 2px 3px rgba(0, 0, 0, 0.075), 0 0 0 1px rgba(0,0,0,0.1)':null,
			marginBottom: E.spacing.md,
			padding: '1px',
			wordBreak:'break-all',
			height:'100%',
			'overflow':'hidden',
		};
			
		var renderEle;
		if(true || this.state.hover){
			renderEle = <div style={{backgroundColor:'rgba(250, 150, 50, 0.8)',position:'absolute',textAlign:'right',bottom:'0px',left:'0px',height:'25px',width:'100%'}}>
			<span title="编辑" onClick={ this.props.editHandler.bind(null,this.props.id,this)   } style={{cursor:'default',marginRight:'10px'}}><Glyph icon="pencil"/></span>
			<span title="复制" onClick={ this.props.cloneHandler.bind(null,this.props.id,this) } style={{cursor:'copy',marginRight:'10px'}}><Glyph icon="diff-added"/></span>
			<span title="删除" onClick={ this.props.deleteHandler.bind(null,this.props.id,this) } style={{cursor:'default',marginRight:'10px'}}><Glyph icon="trashcan"/></span>
			</div>;
		}else{
			renderEle = null;
		}
		return <ResizableAndMovable
		 preview={this.props.preview}
         start={this.props.initPos}
         customStyle={{}}
         minWidth={50}
         minHeight={50}
         maxWidth={800}
         maxHeight={800}
         //onResizeStart={() => console.log('resize start')}
         //onResize={size => console.log(size)}
         onResizeStop={
         	size => this.setState({size:size})
         }
         //onDragStart={() => console.log('drag start')}
         //onDrag={(e, ui) => {
         //  this.setState({
         //  	position:ui.position
         //  });
         //}}
         onDragStop={(e, ui) => {
           //console.log(ui.position);
           this.setState({
           	position:ui.position
           });
       	 }} 
         >
        <div {...this.props} onMouseEnter={this.mouseOver} onMouseLeave={this.mouseOut} style={Object.assign(style, this.props.style)}>
			 <img draggable='false' style={{width:'100%',height:'100%'}} src={this.props.dom} />
			{!this.props.preview ? 
        	renderEle
        	: null}
        </div>
        
      </ResizableAndMovable>
		 
	},
});
