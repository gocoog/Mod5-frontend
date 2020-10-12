import React from 'react'

export default class TaskCard extends React.Component {
    state = {
        submitted: false,
        completed: false
    }

    componentDidMount() {
        this.setState({
            submitted: this.props.submitted,
            completed: this.props.completed
        })
    }

    handleAdultButton = (e) => {
        e.preventDefault()
        let patchData = {
            "completed": true
        }
        fetch(`http://localhost:3001/tasks/${this.props.task.id}`, {
                    method: 'PATCH',
                    body: JSON.stringify(patchData),
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': "application/json"
                      }
                }).then(res => res.json())
                .then(json => {
                    console.log(json)
                    this.setState({
                        ...this.state,
                        completed: true
                    })
                })
    }

    handleChildClick = (e) => {
        e.preventDefault()
        let patchData = {
            "submitted": true
        }
        fetch(`http://localhost:3001/tasks/${this.props.task.id}`, {
                    method: 'PATCH',
                    body: JSON.stringify(patchData),
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': "application/json"
                      }
                }).then(res => res.json())
                .then(json => {
                    console.log(json)
                    this.setState({
                        ...this.state,
                        submitted: true
                    })
                })
    }

    render(){
        return(
                <div class="card">
                    <img src={this.props.task.task_img} alt="Avatar" style={{width: "20%"}} />
                    <div class="container">
                        <h4><b>{this.props.task.task_name}</b></h4> 
                        <p>${this.props.task.task_amount}</p> 
                        {this.props.isAdult ? 
                        (this.state.completed ? <button disabled >Complete</button> : (this.state.submitted ? <button onClick={this.handleAdultButton}>Submit completion</button> : null)) 
                        : 
                        (this.state.submitted ? <button disabled > submitted</button> : <button onClick={this.handleChildClick}>submit!</button>)
                        }
                        <div>
                            {this.props.isAdult ? <button onClick={(e) => this.props.handleDelete(e, this.props.task.id)}>❌</button> : null}
                        </div>
                    </div>
                </div>
        )
    }
}