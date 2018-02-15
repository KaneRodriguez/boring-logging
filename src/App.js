import React, { Component } from 'react';
import uuid from 'uuid';
import $ from 'jquery';
import Todos from './Components/Todos';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'; 
import Button from 'material-ui/Button'; 
import './App.css';
import MenuAppBar from './Components/MenuAppBar';

class App extends Component {
  constructor(){
    super();
    this.state = {
      borings: [],
      todos:[]
    }
  }

  getTodos(){
    $.ajax({
      url: 'https://jsonplaceholder.typicode.com/todos',
      dataType:'json',
      cache: false,
      success: function(data){
        this.setState({todos: data}, function(){
          console.log(this.state);
        });
      }.bind(this),
      error: function(xhr, status, err){
        console.log(err);
      }
    });
  }
  
  componentWillMount(){
    this.getTodos();
  }

  componentDidMount(){
    this.getTodos();
  }

  render() {
    return (
      <MuiThemeProvider>
      <div className="App">
        <MenuAppBar />
        <Todos todos={this.state.todos} />
      </div>
      </MuiThemeProvider>

    );
  }
}

export default App;
