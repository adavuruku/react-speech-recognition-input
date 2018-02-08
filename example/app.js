import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Input from '../src';
import axios from 'axios'


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: false,
      init: false,
      data: [],
    };

  }

  result(value){
	console.log(value)
	axios.get('http://dpd.oiwip.com.br/api/v1/city/search', {
    params: {
      limit: 10
      , page: 1
      , term: value
    }
  })
  .then( (response) => {
    this.setState({data:response.data.rows,result:true,init:true});
  })
  .catch(function (error) {
    console.log(error);
  });
}

 pesquisando(value){
	this.setState({data:[],result:false,init:true}); 
}

shouldComponentUpdate(nextProps, nextState) {
	return nextState.result
}

  render() {
  	console.log('render')
    return (
     <div>
	    <div>Teste</div><br/>
	    <Input 
	    	className="test"
	    	lang={'pt-BR'}
	    	onChange={this.pesquisando.bind(this)} 
	    	onEnd={this.result.bind(this)} />

	    	{this.state.data.map((ret,index) => {
	    		return <p key={index}>{ret.code} => ({ret.ddd}) {ret.name} / {ret.state}</p>
	    		}) }
	  </div>
    );
  }
}

ReactDOM.render((
  <App />
), document.getElementById('chart'));
