/* eslint no-script-url: 0 */

const React = require('react');
const ReactGridLayout = require('react-grid-layout');
var ResponsiveReactGridLayout = require('react-grid-layout').Responsive;

const { TextCard ,Alert, Card, Col, Container, FormField, FormInput, InputGroup, Pagination, Pill, Row, Table } = require('elemental');

var BasicLayout = React.createClass({


  getDefaultProps() {
    return {
      className: "layout",
      items: 5,
      rowHeight: 30,
      cols: 6,
      isDraggable: true,
      isResizable: true,
      autoResize:false,
      useCSSTransforms:false,
    };
  },

  generateDOM() {

    var rows = [];
    let page_style = {
  	};
    for (var i=0; i < this.props.items; i++) {
        rows.push(<TextCard  style={Object.assign(page_style, this.props.style)} key={i}><span>111111111111122222222222233333333333334444444445555555555566666666666677777777777777778888888888888</span></TextCard>);
    }
    return rows;
  },

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
          {this.generateDOM()}
      </div>
    );
  }
});

module.exports = BasicLayout;
