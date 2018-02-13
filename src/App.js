import React, { Component } from 'react';
import uuid from 'uuid';
import $ from 'jquery';
import Projects from './Components/Projects';
import Skills from './Components/Skills';
import AddProject from './Components/AddProject';
import Todos from './Components/Todos';
import './App.css';

class App extends Component {
  constructor(){
    super();
    this.state = {
      projects: [],
      skills: [],
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

  getProjects(){
    this.setState({projects: [
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

  getSkills(){
    this.setState({skills: [
      {
        id:uuid.v4(),
        title: 'gay'
      },
      {
        id:uuid.v4(),
        title: 'casanova'
      },
      {
        id:uuid.v4(),
        title: "hater be hatin'"
      },
      {
        id:uuid.v4(),
        title: 'slick'
      },
      {
        id:uuid.v4(),
        title: 'bbc'
      },
      {
        id:uuid.v4(),
        title: "loop hole'"
      }
    ]});
  }
  componentWillMount(){
    this.getProjects();
    this.getSkills();
    this.getTodos();
  }

  componentDidMount(){
    this.getTodos();
  }

  handleAddProject(project){
    let projects = this.state.projects;
    projects.push(project);
    this.setState({projects:projects});
  }

  handleDeleteProject(id){
    let projects = this.state.projects;
    let index = projects.findIndex(x => x.id === id);
    projects.splice(index, 1);
    this.setState({projects:projects});
  }  
  
  handleDeleteSkill(id){
    let skills = this.state.skills;
    let index = skills.findIndex(x => x.id === id);
    skills.splice(index, 1);
    this.setState({skills:skills});
  }

  render() {
    return (
      <div className="App">
        <AddProject addProject={this.handleAddProject.bind(this)} />
        <Projects projects={this.state.projects} onDelete={this.handleDeleteProject.bind(this)} />
        <Skills skills={this.state.skills} onDelete={this.handleDeleteSkill.bind(this)} />
        <hr />
        <Todos todos={this.state.todos} />
      </div>
    );
  }
}

export default App;
