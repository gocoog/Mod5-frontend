import React, { Component } from 'react';
import './App.css';

import Login from './Components/auth/Login'
import Signup from './Components/auth/Signup'
import Header from './Components/Header'
import ProfileContainer from './Containers/ProfileContainer'
import AddTask from './Components/AddTask'
import CreateChildForm from './Components/CreateChildForm'
import Wallet from './Components/Wallet'
import GoalForm from './Components/GoalForm'


import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';


class App extends Component {
  state ={
    isLoggedIn: false,
    user_id: 0,
    first_name: '',
    last_name: '',
    email_address: '',
    isAdult: false,
    tasks: []
  }

  componentDidMount(){
    this.getTasks()
  }

  getTasks = () => {
    if(localStorage.getItem('auth_key')){
      const id = localStorage.getItem('user_id')

      Promise.all([fetch(`http://localhost:3001/users/${id}`), fetch('http://localhost:3001/tasks')])

      .then(([res1, res2]) => { 
         return Promise.all([res1.json(), res2.json()]) 
      })
      .then(([res1, res2]) => {
          this.handleRes1(res1)
          this.handleRes2(res2)
      });
    }
}

handleRes1 = (res1) => {
  this.setState({
    ...this.state,
    user_id: parseInt(localStorage.getItem('user_id')),
    first_name: res1.first_name,
    last_name: res1.last_name,
    email_address: res1.email_address,
    isAdult: res1.adult,
    isLoggedIn: true
})
}

handleRes2 = (res2) => {
  for(const task of res2){
    if (task.parent_id === parseInt(localStorage.getItem('user_id'))
    || task.user_id === parseInt(localStorage.getItem('user_id'))
    ) {
        this.setState({
          ...this.state,
            tasks: [...this.state.tasks, task]
        })
    }
}
}

  handleLogIn = () =>{
    if(localStorage.getItem('auth_key')){
      this.getTasks()
      this.setState({
        isLoggedIn: true
      })
    }
  }
  
  failedLogIn = () =>{
    localStorage.clear()
    this.setState({
      isLoggedIn: false
    }, () =>{
      return <Redirect push to="/login" />
    })
  }
  
  handleDelete = (e, id) => {
      e.preventDefault();
      console.log(id)
      console.log(e)
      fetch(`http://localhost:3001/tasks/${id}`,{
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json'
          }
      })
      .then(res => res.json())
      .then(_ => {
      const filteredTasks= [...this.state.tasks].filter(task => task.id !== id)
      this.setState({ ...this.state, tasks: filteredTasks })
      })
  }

  handleAddTaskSubmit = (newTask) => {
    console.log(newTask)
    this.setState({ tasks: [...this.state.tasks, newTask]})
  }

  render(){
    return (
    <div className="parent" >
      <h1>Money and Sense</h1>
        <BrowserRouter>
        <Header isLoggedIn={this.state.isLoggedIn} isAdult={this.state.isAdult}/>
          <Switch>
            <Route exact path="/" component={() => {
              if(localStorage.getItem('auth_key')){
                return <ProfileContainer 
                user_id={this.state.user_id}
              first_name={this.state.first_name}
              last_name={this.state.last_name}
              email_address={this.state.email_address}
              isAdult={this.state.isAdult}
              tasks={this.state.tasks}
              completed={this.state.completed}
              submitted={this.state.submitted}
              isLoggedIn={this.state.isLoggedIn}
              handleDelete={this.handleDelete}
              />
              }else{
                return <Redirect to="/login" />
              }
            }} />

            <Route exact path="/login" component={() =>{
              return <Login handleLogIn={this.handleLogIn} failedLogIn={this.failedLogIn}/> 
            }}/>

            <Route exact path="/signup" component={()=>{
              return <Signup handleLogIn={this.handleLogIn} /> 
            }} />
            <Route exact path="/wallet">
              <Wallet />
            </Route>

            <Route exact path="/addgoal">
              <GoalForm />
            </Route>

            <Route path="/logout" component={() => {
              localStorage.clear()

              this.setState({
                isLoggedIn: false,
                email_address: '',
                user_id: 0,
                first_name: '',
                last_name: '',
                email_address: '',
                isAdult: false,
                tasks: []
              })
              return <Redirect to="/login" />
            }} />
            <Route exact path="/create_child_account">
              <CreateChildForm />
            </Route>
            <Route exact path="/addtask">
              <AddTask userId={this.state.userId} getTasks={this.getTasks} handleAddTaskSubmit={this.handleAddTaskSubmit}/>
            </Route>

            <Route>
              <Redirect to="/" />
            </Route>

          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
