import React, { Component } from 'react'
import { withRouter } from "react-router";

class GoalForm extends Component {
    inititalState = {
        goal_name: '',
        goal_img: '',
        goal_amount: 0
    }

    state = this.inititalState

    handleInputChange = (e) => {
        this.setState({
          [e.target.name]: e.target.value
        })
      }

    persistGoal = (e) => {
        e.preventDefault()
        let newGoal = {
            goal_name: this.state.goal_name,
            goal_img: this.state.goal_img,
            goal_amount: this.state.goal_amount,
            completed: false,
            user_id: parseInt(localStorage.getItem('user_id'))
        }

        fetch('http://localhost:3001/goals', {
          method: 'POST',
          body: JSON.stringify(newGoal),
          headers: {
            'Content-Type': 'application/json',
            'Auth-Key': localStorage.getItem('auth_key')
          }
        }).then(response => response.json())
        .then(json => {
            this.setState(this.initialState,() => {
                this.props.history.push('/wallet')
              })
        })
    }
    render(){
        return (
        <div>
            <div className="goal-page">
                <div className="form">
                    <form className="goal-form" onSubmit={this.persistGoal}>
                        <h2> Create a goal! </h2>
                        <input required type="text" onChange={this.handleInputChange} name='goal_name' placeholder="Goal Name"  />
                        <input required type="text" onChange={this.handleInputChange} name='goal_img' placeholder="Goal Image URL"  />
                        <input label="$" required type="number" min="0.01" step="0.01" onChange={this.handleInputChange} name='goal_amount' placeholder="How much to complete this goal?"  />
                        
                        <button id="submit" type="submit" value="Submit">Create Goal!</button>
                    </form>
                </div>
            </div>            
        </div>
        )
    }
}

export default withRouter(GoalForm)