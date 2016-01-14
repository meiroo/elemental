/* eslint no-script-url: 0 */

const React = require('react');
const ReactGridLayout = require('react-grid-layout');
var ResponsiveReactGridLayout = require('react-grid-layout').Responsive;

const { TextCard ,Alert, Card, Col, Container, FormField, FormInput, InputGroup, Pagination, Pill, Row, Table } = require('elemental');

var BasicLayout = React.createClass({

  propTypes: {
    //onLayoutChange: React.PropTypes.func.isRequired
  },

  getDefaultProps() {
    return {
      className: "layout",
      items: 3,
      rowHeight: 30,
      cols: 6,
      isDraggable: true,
      isResizable: true,
      autoResize:false,
      useCSSTransforms:false,
    };
  },

  getInitialState() {
    var layout = this.generateLayout();
    return {
      layout: layout
    };
  },

  generateDOM() {

    var rows = [];
    for (var i=0; i < this.props.items; i++) {
        rows.push(<TextCard key={i}><span>111111111111122222222222233333333333334444444445555555555566666666666677777777777777778888888888888</span></TextCard>);
    }
    return rows;
  },

  generateLayout() {
    var rows = [];
    for (var i=0; i < this.props.items; i++) {
        var y = 4;
        rows.push({x: i * 2 % 12, y: Math.floor(i / 6) * y, w: 2, h: y, i: i});
    }
    return rows;
  },

  //onLayoutChange: function(layout) {
  //  this.props.onLayoutChange(layout);
  //},

  render() {
  	let page_style = {
  		backgroundColor: 'rgba(210, 230, 159, 0.0745098)',
  		marginLeft:'50px',
  		marginRight:'auto',
  		paddingLeft:'20px',
  		paddingRight:'20px',
  		maxWidth:'800px'
  	};

    return (
      <div id="content" {...this.props} style={Object.assign(page_style, this.props.style)}>
      	<ReactGridLayout layout={this.state.layout} onLayoutChange={this.onLayoutChange}
          {...this.props}>
          {this.generateDOM()}
        </ReactGridLayout>
      </div>
    );
  }
});

module.exports = BasicLayout;
