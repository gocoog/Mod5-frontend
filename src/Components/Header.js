import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

const handleLoginRender = (isLoggedIn, isAdult) => {
    if(isLoggedIn){
      return (
          <>
        <NavLink className="menu" to="/logout"> Logout </NavLink>
        {isAdult ? <NavLink className="menu" to="/create_child_account"> Create Your Childs Account! </NavLink> : 
        <>
        <NavLink className="menu" to="/wallet">Wallet</NavLink>
        <NavLink className="menu" to="/goals">Goals</NavLink>
        </>
        }
        
        
        </>
      )
    }else{
      return(
        <>
          <NavLink className="menu" to="/login"> Login </NavLink>
          <NavLink className="menu" to="/signup"> Signup </NavLink>
        </>
      )
    }
  }

  const Header = (props) => {

    return (
        <div>
          <NavLink className="menu" to="/"> Home </NavLink>
          {
            handleLoginRender(props.isLoggedIn, props.isAdult)
          }
          </div>
    )
  }
  
  export default Header;