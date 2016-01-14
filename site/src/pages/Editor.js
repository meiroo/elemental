/* eslint no-script-url: 0 */

const React = require('react');
const ReactGridLayout = require('react-grid-layout');
const _ = require('lodash');

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
      autoResize:true
    };
  },

  getInitialState() {
    var layout = this.generateLayout();
    return {
      layout: layout
    };
  },

  generateDOM() {
    return _.map(_.range(this.props.items), function(i) {
      return (<TextCard key={i}><span className="text">{i}:111111111111122222222222233333333333334444444445555555555566666666666677777777777777778888888888888</span></TextCard>);
    });
  },

  generateLayout() {
    var p = this.props;
    return _.map(new Array(p.items), function(item, i) {
      var y = _.result(p, 'y') || Math.ceil(Math.random() * 4) + 1;
      return {x: i * 2 % 12, y: Math.floor(i / 6) * y, w: 2, h: y, i: i};
    });
  },

  //onLayoutChange: function(layout) {
    //this.props.onLayoutChange(layout);
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
      <div {...this.props} style={Object.assign(page_style, this.props.style)}>
      	<ReactGridLayout layout={this.state.layout} onLayoutChange={this.onLayoutChange}
          {...this.props}>
          {this.generateDOM()}
        </ReactGridLayout>
      </div>
    );
  }
});

module.exports = BasicLayout;
