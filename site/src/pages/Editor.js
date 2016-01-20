/* eslint no-script-url: 0 */

const React = require('react');
var ReactQuill = require('react-quill');

const { TextCard ,Alert, Card, Col, Container, FormField, FormInput, InputGroup, Pagination, Pill, Row, Table } = require('elemental');


var MComp = function(key,type,data,cloneHander,deleteHandler){
	this.key = key;
	this.type = type; 
	this.data = data;
	this.generateDOM = function(){
		if(this.type === 'textcard'){
			if(!this.data.dom){
				this.data.dom = MComp.generateRandomID();
			}
			return <TextCard {...data} id={this.key} key={this.key}></TextCard>;
		}else{
			return <div></div>;
		}
	}
	MComp.generateRandomID = function(){
	    var text = "";
	    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	    for( var i=0; i < 20; i++ )
	        text += possible.charAt(Math.floor(Math.random() * possible.length));

	    return text;
	}

	MComp.findCompFromArray = function(key,arr){
		for(var i = 0; i < arr.length; i++){
			if(key === arr[i].key){
				return arr[i];
			}
		}
		return null;
	}

	MComp.findCompIndexFromArray = function(key,arr){
		for(var i = 0; i < arr.length; i++){
			if(key === arr[i].key){
				return i;
			}
		}
		return -1;
	}

	MComp.deleteCompFromArray = function(key,arr){
		for(var i = 0; i < arr.length; i++){
			if(key === arr[i].key){
				arr.splice(i, 1);  
			}
		}
		return arr;
	}
}


//react component

var BasicLayout = React.createClass({


  getDefaultProps() {
  },

  bindEventHandler(){
  	var data = {};
  	data.cloneHandler = this.handleComponentClone;
  	data.deleteHandler = this.handleComponentDelete;
  	data.editHandler = this.handleComponentEdit;
  	return data;
  },


  getInitialState() {
    var items = [];
  	var counter = 0;
  	var data = this.bindEventHandler();
  	items.push(new MComp(counter,'textcard',data,this.handleComponentClone,this.handleComponentDelete));
    return {
      //list property
      items: items,
      counter:counter,

      //text edit property
      showTextEdit:false,
      tobeEdit:'',
      editID:-1,
    };
  },

  generateDOM() {

  	var rows = [];
    let page_style = {
  	};
    for (var i=0; i < this.state.items.length; i++) {
    	var comp = this.state.items[i];
    	var row = comp.generateDOM();
    	rows.push(row);
    }
    return rows;
  },
  handleClear:function(){

  },
  handleComponentDelete: function(key,component,event) {
  	
  	var items = this.state.items;
  	var counter = this.state.counter + 1;

  	items = MComp.deleteCompFromArray(key,items);

  	this.setState({
        items: items,
        counter:counter,
      });
  },
  handleComponentEdit: function(key,component,event) {
  	console.log('edit');
  	this.setState({
        showTextEdit:true,
        tobeEdit:component.props.dom,
        editID:key
     });

  },
  handleComponentClone: function(key,component,event) {
  	
  	var items = this.state.items;
  	var counter = this.state.counter + 1;

  	var comp = MComp.findCompFromArray(key,items);

  	items.push(new MComp(counter,comp.type,comp.data,this.handleComponentClone,this.handleComponentDelete));

  	this.setState({
        items: items,
        counter:counter,
      });
  },
  handleComponentAdd: function(type,event) {
  	
  	var items = this.state.items;
  	var counter = this.state.counter + 1;
  	var data = this.bindEventHandler();
  	
  	items.push(new MComp(counter,type,data,this.handleComponentClone,this.handleComponentDelete));

  	this.setState({
        items: items,
        counter:counter,
      });
  },

  onTextChange: function(value){
  	console.log('textchanged');
  	var items = this.state.items;
  	var index = MComp.findCompIndexFromArray(this.state.editID,items);
  	items[index].data.dom = value;

  	this.setState({
        items: items
      });
  },

  render() {
  	let left_edit = {
  		backgroundColor: 'rgba(210, 230, 159, 0.0945098)',
  		marginLeft:'50px',
  		paddingLeft:'20px',
  		paddingRight:'20px',
  		height:'800px',
  	};
  	let right_props = {
  		//backgroundColor: 'rgba(86, 91, 73, 0.0945098)',
  	};

    return (
      <Row>
        <Col sm="2/3">
	    <div id="content" {...this.props} style={Object.assign(left_edit, this.props.style)}>
	      {this.generateDOM()}
	    </div>
	    </Col>
	    <Col sm="1/3">
	    <div>
		    <div className="code-example__example" style={Object.assign(right_props, this.props.style)}>
			    <Pill label="Create TextCard" type="success-inverted" onClick={this.handleComponentAdd.bind(null,'textcard')} />
				<Pill label="First Pill" type="primary" onClear={this.handleClear} />
				<Pill label="Second Pill" type="primary" onClear={this.handleClear} />
				<Pill label="Third Pill" type="primary" onClear={this.handleClear} />
				<Pill label="Clear All" />
		    </div>

		    { this.state.showTextEdit ? 
		    	<div className="code-example__example" style={{marginTop:'20px'}}>
			    <ReactQuill theme="snow" onChange={this.onTextChange}/>
			    </div>
			 : null }

		    
	    </div>
	    </Col>
      </Row>
    );
  }
});

module.exports = BasicLayout;
