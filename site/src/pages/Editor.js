/* eslint no-script-url: 0 */

const React = require('react');
var ReactQuill = require('react-quill');

const { TextCard ,ImageCard, Col, Container, FormField,FileUpload, Button,FormInput, InputGroup, Pagination, Pill, Row, Table } = require('elemental');


var MComp = function(key,type,data){
	this.key = key;
	this.type = type; 
	this.data = data;
	this.generateDOM = function(state){
		if(this.type === 'textcard'){
			if(!this.data.dom){
				this.data.dom = MComp.generateRandomID();
			}
			return <TextCard {...data} ref={'card'+this.key} onClick={data.clickHandler.bind(null,key)} preview={state.preview} id={this.key} key={this.key} type={this.type}></TextCard>;
		}else if(this.type === 'imagecard'){
			if(!this.data.dom){
				this.data.dom = './images/elemental-logo-paths.svg';
			}
			return <ImageCard {...data} ref={'card'+this.key} onClick={data.clickHandler.bind(null,key)} preview={state.preview} id={this.key} key={this.key} type={this.type}></ImageCard>;
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

  exportElements: null,

  getDefaultProps() {
  },

  bindEventHandler(){
  	var data = {};
  	data.cloneHandler = this.handleComponentClone;
  	data.deleteHandler = this.handleComponentDelete;
  	data.editHandler = this.handleComponentEdit;
  	data.clickHandler = this.onClickItem;
  	data.initPos = {x:20, y: 20, width: 400, height: 200};
  	return data;
  },


  getInitialState() {
    var items = [];
  	var counter = 0;
  	var data = this.bindEventHandler();
  	items.push(new MComp(counter,'textcard',data));
    return {
      //list property
      items: items,
      counter:counter,

      //text edit property
      showTextEdit:false,
      tobeEdit:'',
      editID:-1,

      //image edit
      showImageEdit:false,

      //preview
      preview:false,
    };
  },

  generateDOM() {

  	var rows = [];
    let page_style = {
  	};
    for (var i=0; i < this.state.items.length; i++) {
    	var comp = this.state.items[i];
    	var row = comp.generateDOM(this.state);
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
  		showTextEdit:false,
  		showImageEdit:false,
        items: items,
        counter:counter,
      });
  },
  handleComponentEdit: function(key,component,event) {
  	var state = {
        tobeEdit:component.props.dom,
        editID:key
     };
     if(component.props.type === 'textcard'){
     	state.showTextEdit = true;
     }else if(component.props.type === 'imagecard'){
     	state.showImageEdit = true;
     }
  	this.setState(state);

  },
  handleComponentClone: function(key,component,event) {
  	
  	var items = this.state.items;
  	var counter = this.state.counter + 1;

  	var comp = MComp.findCompFromArray(key,items);

  	items.push(new MComp(counter,comp.type,comp.data));

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

  onClickItem: function(value){
   	if(this.state.editID!==-1 && this.state.editID !== value){
  	  this.setState({
  		editID : -1,
        showTextEdit:false,
  		showImageEdit:false,
      });
  	}
  },

  onTextChange: function(value){
  	console.log('textchanged');
  	var items = this.state.items;
  	var index = MComp.findCompIndexFromArray(this.state.editID,items);
  	items[index].data.dom = value;

  	this.setState({
  		tobeEdit : value,
        items: items,
      });
  },
  onImageChange: function(evt,data){
  	console.log('imagechanged');
  	var items = this.state.items;
  	var index = MComp.findCompIndexFromArray(this.state.editID,items);
  	items[index].data.dom = data.dataURI;

  	this.setState({
        items: items,
      });
  },

  onPreview:function(){
  	var ifpreivew = !this.state.preview;
  	this.setState({
  		preview : ifpreivew,
    });
  },

  onClear:function(){
  	this.setState({
      //list property
      items: [],
      counter:0,

      //text edit property
      showTextEdit:false,
      tobeEdit:'',
      editID:-1,

      //image edit
      showImageEdit:false,

      //preview
      preview:false,
    });

  },

  onExport:function(){
  	this.exportElements = [];
  	var items = this.state.items;
  	//data.initPos = {x:20, y: 20, width: 400, height: 200};
  	for(var i in items){
  		var item = items[i];
  		var comp = this.refs['card'+item.key];

  		var initPos = {};
  		initPos.x = comp.state.position.left;
  		initPos.y = comp.state.position.top;
  		initPos.width = comp.state.size.width;
  		initPos.height = comp.state.size.height;


  		item.data.initPos = initPos;
  		this.exportElements.push(item);
  		console.log(item.data.initPos);
  		
  	}

  },


  onImport:function(){
  	console.log('import....');
  	var items = [];
  	var counter = 0;
  	this.setState({items: items,});

  	var data = this.bindEventHandler();
  	for(var i in this.exportElements){
  		var ele = this.exportElements[i];
  		var data = this.bindEventHandler();
  		data.initPos = ele.data.initPos;
  		data.dom = ele.data.dom;
  		items.push(new MComp(ele.key,ele.type,data));
  		if(counter <= ele.key)
  			counter = ele.key;
	}
    this.setState({
      //list property
      items: items,
      counter:counter,

      //text edit property
      showTextEdit:false,
      tobeEdit:'',
      editID:-1,

      //image edit
      showImageEdit:false,

      //preview
      preview:false,
    });

  },

  render() {
  	let left_edit = {
  		border: '1px solid rgba(0, 0, 0, .1)',
  		backgroundColor: this.state.preview?null:'rgba(210, 230, 159, 0.0945098)',
  		marginLeft:'50px',
  		height:'800px',
  		position:'relative'
  	};
  	let right_props = {
  		//backgroundColor: 'rgba(86, 91, 73, 0.0945098)',
  	};

    return (
    <div id="editor">
      <Row>
      	<Col sm="2/5" style={{marginLeft:'50px'}}>
      		<div className="code-example__example" style={Object.assign(right_props, this.props.style)}>
			    <h3 style={{marginTop:'0'}}>元素添加</h3>
			    <Pill label="创建文本" type="success-inverted" onClick={this.handleComponentAdd.bind(null,'textcard')} />
			    <Pill label="创建图像" type="success-inverted" onClick={this.handleComponentAdd.bind(null,'imagecard')} />
		    </div>
      	</Col>
      	<Col sm="1/4" ></Col>
      	<Col sm="1/4" >
      		<div className="code-example__example" style={Object.assign(right_props, this.props.style)}>
			    <h3 style={{marginTop:'0'}}>场景预览</h3>
			    <div className="code-example__example-element--inline">
			    { this.state.preview ? <Button onClick={this.onPreview} type="primary">预览场景(恢复编辑)</Button>
				 : <Button onClick={this.onPreview} type="primary">预览场景</Button> }
			    	
			    </div>
			    <div className="code-example__example-element--inline">
			    	<Button onClick={this.onExport} type="success">发布场景</Button>
			    </div>	

			    <div className="code-example__example-element--inline">
			    { this.state.items.length ?
			    	<Button onClick={this.onClear} type="success">清空场景</Button>
			    	:
			    	<Button onClick={this.onImport} type="success">导入场景</Button>
			    }
			    </div>		
		    </div>
      	</Col>

      </Row>
      <Row  style={{marginTop:'20px'}}>
        <Col sm="2/3">
	    <div id="content" className={ this.state.preview ? '':'grid'} {...this.props} style={Object.assign(left_edit, this.props.style)}>
	      {this.generateDOM()}
	    </div>
	    </Col>
	    <Col sm="1/3">
	    <div>
		    { this.state.showTextEdit ? 
		    	<div className="code-example__example">
		    	<h3 className="code-example__example__heading" style={{marginTop:'0'}}>文本编辑</h3>
			    <ReactQuill theme="snow" value={this.state.tobeEdit} onChange={this.onTextChange}/>
			    </div>
			 : null }

			{ this.state.showImageEdit ? 
		    	<div className="code-example__example">
		    	<h3 className="code-example__example__heading" style={{marginTop:'0'}}>图像编辑</h3>
			    <FormField label="Image">
					<FileUpload onChange={this.onImageChange} buttonLabelInitial="Upload Image" buttonLabelChange="Change Image" accept="image/jpg, image/gif, image/png" />
				</FormField>
			    </div>
			 : null }
	    </div>
	    </Col>
      </Row>
     </div>
    );
  }
});

module.exports = BasicLayout;
