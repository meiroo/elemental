/* eslint no-script-url: 0 */

const React = require('react');

const { TextCard ,Alert, Card, Col, Container, FormField, FormInput, InputGroup, Pagination, Pill, Row, Table } = require('elemental');


var MComp = function(key,type,cloneHander){
	this.key = key;
	this.type = type; 
	this.generateDOM = function(){
		if(this.type === 'textcard'){
			return <TextCard cloneHandler={cloneHander} key={i}>1111111111111222222222222333333333333344444444455555555555666666666666777777777777777788888888888889999999999999999999999999999900000000000000000000000000000000111111111111111112222222222222223333333333</TextCard>;
		}else{
			return <div></div>;
		}
	}
}

var BasicLayout = React.createClass({


  getDefaultProps() {
  	var doms = [];
  	return{
  		doms:doms,
  	};
  },

  getInitialState() {
    var items = [];
  	var counter = 0;
  	items.push(new MComp(counter,'textcard',this.handleComponentClone));
    return {
      items: items,
      counter:counter,
    };
  },

  generateDOM() {

  	var rows = [];
    let page_style = {
  	};
  	console.log(this.state.items.length);
    for (var i=0; i < this.state.items.length; i++) {
    	rows.push(<TextCard cloneHandler={this.handleComponentClone} style={Object.assign(page_style, this.props.style)} key={i}>1111111111111222222222222333333333333344444444455555555555666666666666777777777777777788888888888889999999999999999999999999999900000000000000000000000000000000111111111111111112222222222222223333333333</TextCard>);
    }
    return rows;
  },
  handleComponentClone: function() {
  	var items = this.state.items;
  	var counter = this.state.counter + 1;
  	items.push(new MComp(counter,'textcard',this.handleComponentClone));

  	this.setState({
        items: items,
        counter:counter,
      });
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
