import React from 'react';
import { withRouter } from 'react-router';

import { Redirect } from 'react-router-dom';

class Signup extends React.Component {
    state = {
        first_name: '',
        last_name: '', 
        email_address: '',
        password: ''
    }

    failedSignup = () => {

            return <Redirect push to="/login" />

    }

    handleInputChange = (e) => {
        this.setState({
          [e.target.name]: e.target.value
        })
      }
    
      handleSubmit = (e) => {
        e.preventDefault()
        const newUser = {
          user: {
              first_name: this.state.first_name,
              last_name: this.state.last_name,
              email_address: this.state.email_address,
              password: this.state.password,
          }
        }
        fetch('http://localhost:3001/signup',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newUser)
        }).then(res => res.json())
        .then(token => 
            // console.log(token)
            {if (token.auth_key) {
                // console.log(token.user_id)
                localStorage.setItem('auth_key',token['auth_key'])
                localStorage.setItem('email_address',this.state.email_address)
                this.props.handleLogIn(this.state.email_address, token.user_id)
                this.props.history.push('/user')
            } else{
                alert("This email is taken. Please use a different email")
                // this.failedSignup()
                // this.props.history.push('/signup')
            }})
      }

    render(){
        return (
            <div>
            <div className="signup-page">
                <div className="form">
                    <form className="signup-form"onSubmit={this.handleSubmit}>
                        <h2> Parent? Signup! </h2>
                        <input required type="text" onChange={this.handleInputChange} name='first_name' placeholder="First Name"  />
                        <input required type="text" onChange={this.handleInputChange} name='last_name' placeholder="Last Name"  />
                        <input required type="email" onChange={this.handleInputChange} name='email_address' placeholder="Email Address"  />
                        <input required type="password" onChange={this.handleInputChange} name='password' placeholder="Password"/>
                        <button id="submit" type="submit" value="Submit">Signup!</button>
                    </form>
                </div>
            </div>            
        </div>
        )
    }
}
export default withRouter(Signup);