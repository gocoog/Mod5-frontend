import React, { Component } from 'react'
import { withRouter } from 'react-router';
import { Redirect } from 'react-router-dom';

class CreateChildForm extends Component {
    initialState = {
        first_name: '',
        last_name: '', 
        email_address: '',
        password: '',
        formSuccess: false
    }

    state = this.initialState

    failedSignup = () => {
            return <Redirect push to="/create_child_account" />
    }

    handleInputChange = (e) => {
        this.setState({
          [e.target.name]: e.target.value
        })
      }
    
      handleSubmit = (e) => {
        e.preventDefault();

        const newChildAccount = {
          user: {
              first_name: this.state.first_name,
              last_name: this.state.last_name,
              email_address: this.state.email_address,
              password: this.state.password,
              parent_id: parseInt(localStorage.getItem('user_id'))
          }
        }
    
        fetch('http://localhost:3001/signup',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newChildAccount)
        }).then(res => res.json())
        .then(token => 
            // console.log(token)
            {if (token.auth_key) {
                // console.log(token.user_id)
                this.setState({
                    ...this.initialState,
                    formSuccess: true
                })
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
                        {this.state.formSuccess ? <h1>Account succesfully created!</h1> : null}
                        <h2> Sign your child up and start the journey! </h2>
                        <input required type="text" onChange={this.handleInputChange} name='first_name' placeholder="First Name"  />
                        <input required type="text" onChange={this.handleInputChange} name='last_name' placeholder="Last Name"  />
                        <input required type="email" onChange={this.handleInputChange} name='email_address' placeholder="Email Address"  />
                        <input required type="password" onChange={this.handleInputChange} name='password' placeholder="Password"/>
                        <button id="submit" type="submit" value="Submit">Create Acccount!</button>
                    </form>
                </div>
            </div>            
        </div>
        )
    }
}

export default withRouter(CreateChildForm)