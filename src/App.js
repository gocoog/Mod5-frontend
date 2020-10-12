import React, { Component } from 'react';
import './App.css';

import Login from './Components/auth/Login'
import Signup from './Components/auth/Signup'
import Header from './Components/Header'
import ProfileContainer from './Containers/ProfileContainer'
import AddTask from './Components/AddTask'
import CreateChildForm from './Components/CreateChildForm'


import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';


class App extends Component {
  state ={
    isLoggedIn: false
  }

  componentDidMount(){
    if(localStorage.getItem('auth_key')){
      this.setState({...this.state, isLoggedIn: true })
    }
  }

  handleLogIn = (email_address, userId) =>{
    if(localStorage.getItem('auth_key')){
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
  

  render(){
    return (
    <div className="parent" >
        <BrowserRouter>
        <Header isLoggedIn={this.state.isLoggedIn}/>
          <Switch>
            <Route exact path="/" component={() => {
              if(localStorage.getItem('auth_key')){
                return <ProfileContainer />
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

            <Route path="/logout" component={() => {
              localStorage.clear()

              this.setState({
                isLoggedIn: false,
                email_address: '',
                userId: ''
              })
              return <Redirect to="/login" />
            }} />
            <Route exact path="/create_child_account">
              <CreateChildForm />
            </Route>
            <Route exact path="/addtask">
              <AddTask userId={this.state.userId}/>
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
