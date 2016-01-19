/* eslint no-script-url: 0 */

const React = require('react');

const { TextCard ,Alert, Card, Col, Container, FormField, FormInput, InputGroup, Pagination, Pill, Row, Table } = require('elemental');

var BasicLayout = React.createClass({


  getDefaultProps() {
  	var items = [];
  	var keyIndex = 0;
  	items.push('textcard');
    return {
      items: items,
    };
  },

  generateDOM() {

    var rows = [];
    let page_style = {
  	};
  	console.log(this.props.items.length);
    for (var i=0; i < this.props.items.length; i++) {
    	if(this.props.items[i] === 'textcard'){
    		rows.push(<TextCard cloneHandler={this.handleComponentClone} style={Object.assign(page_style, this.props.style)} key={i}>1111111111111222222222222333333333333344444444455555555555666666666666777777777777777788888888888889999999999999999999999999999900000000000000000000000000000000111111111111111112222222222222223333333333</TextCard>);
    	}
    }
    return rows;
  },
  handleComponentClone: function() {
  	alert('aaa');
  	this.props.items.push('textcard');
  	console.log(this.props.items);
	//React.cloneElement(this);
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
