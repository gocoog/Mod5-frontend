import React, { useState, Component } from 'react'
import Select from 'react-select'
import { withRouter } from "react-router";

class AddTask extends Component {
    initialState = {
        task_name: '',
        task_img: '',
        task_amount: 0,
        parent_id: parseInt(localStorage.getItem('user_id')),
        children: [],
        child_id: 0,
        options: []
    }

    state = this.initialState

    handleInputChange = (e) => {
        this.setState({
          [e.target.name]: e.target.value
        })
      }

      componentDidMount(){
          this.getChildren()
      }
      getChildren = () => {
          fetch('http://localhost:3001/users')
          .then(res => res.json())
          .then(children => this.getChild(children))   
      }

      capitalize = (str) => {
        if(str.length === 0) return str;
        return str[0].toUpperCase() + str.substr(1);
      }

      titleCase = (str) => {
        return str.split(' ').map(this.capitalize).join(' ');
      }

      getChild = (children) => {
          for(const i of children){
              if (!i.adult && i.parent_id === parseInt(localStorage.getItem('user_id'))) {
                  this.setState({
                      ...this.state,
                      options: [this.state.options, {value: i.id, label: this.titleCase(`${i.first_name} ${i.last_name}`)}],
                      children: [this.state.children, i]
                  })
              }
          }
      }

      handleDropdownChange = (selectedId) => {
        this.setState({
            child_id: selectedId.value
        })
      }
    persistTask = (e) => {
        e.preventDefault();

        let newTask = {
          task_name: this.state.task_name,
          task_img: this.state.task_img,
          task_amount: this.state.task_amount,
          parent_id: this.state.parent_id,
          user_id: this.state.child_id
      }
     fetch('http://localhost:3001/tasks', {
          method: 'POST',
          body: JSON.stringify(newTask),
          headers: {
            'Content-Type': 'application/json',
            'Auth-Key': localStorage.getItem('auth_key')
          }
        }).then(response => response.json())
        .then(newTask => {
            console.log(newTask)
            // this.props.handleElectionSubmit(newTask)
            this.setState(this.initialState,() => {
            this.props.history.push('/')})
        
        })
      }


    render(){
        return(
            <div>
            <div className="task-page">
                <div className="form">
                    <form className="task-form" onSubmit={this.persistTask}>
                        <h2> Create a task! </h2>
                        <Select options={this.state.options} onChange={this.handleDropdownChange}/>
                        <input required type="text" onChange={this.handleInputChange} name='task_name' placeholder="Task Name"  />
                        <input required type="text" onChange={this.handleInputChange} name='task_img' placeholder="Task Image URL"  />
                        <input label="$" required type="number" min="0.01" step="0.01" onChange={this.handleInputChange} name='task_amount' placeholder="How much to complete this task?"  />
                        
                        <button id="submit" type="submit" value="Submit">Create Task!</button>
                    </form>
                </div>
            </div>            
        </div>
        )
    }
}

export default withRouter(AddTask);