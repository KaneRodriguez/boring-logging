import React, { Component } from 'react';
import uuid from 'uuid';
import $ from 'jquery';
import Borings from './Components/Borings';
import AddBoring from './Components/AddBoring';
import Todos from './Components/Todos';
import './App.css';

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

  getBorings(){
    this.setState({borings: [
      {
        id:uuid.v4(),
        title: 'Business Website',
        category: 'Web Deisgn'
      },
      {
        id:uuid.v4(),
        title: 'Social App',
        category: 'Mobile Development'
      },
      {
        id:uuid.v4(),
        title: 'Ecommerce Shopping Cart',
        category: 'Web Development'
      }
    ]});
  }

  
  
  componentWillMount(){
    this.getBorings();
    this.getTodos();
  }

  componentDidMount(){
    this.getTodos();
  }

  handleAddBoring(boring){
    let borings = this.state.borings;
    borings.push(boring);
    this.setState({borings:borings});
  }

  handleDeleteBoring(id){
    let borings = this.state.borings;
    let index = borings.findIndex(x => x.id === id);
    borings.splice(index, 1);
    this.setState({borings:borings});
  }  
  
 

  render() {
    return (
      <div className="App">
        <AddBoring addBoring={this.handleAddBoring.bind(this)} />
        <Borings borings={this.state.borings} onDelete={this.handleDeleteBoring.bind(this)} />
        <hr />
        <Todos todos={this.state.todos} />
      </div>
    );
  }
}

export default App;
