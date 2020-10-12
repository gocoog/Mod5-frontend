import React from 'react';
import { withRouter } from 'react-router';
import TaskCard from '../Components/TaskCard'
import { Link } from 'react-router-dom';

class ProfileContainer extends React.Component {

    state = {
        user_id: 0,
        first_name: '',
        last_name: '',
        email_address: '',
        isAdult: false,
        tasks: [],
        completed: false,
        submitted: false
    }
    componentDidMount(){
        const id = localStorage.getItem('user_id')

        fetch(`http://localhost:3001/users/${id}`)
          .then(res => res.json())
          .then(user => this.setState({
              ...this.state,
              user_id: user.id,
              first_name: user.first_name,
              last_name: user.last_name,
              email_address: user.email_address,
              isAdult: user.adult
          })) 

          fetch('http://localhost:3001/tasks')
          .then(res => res.json())
          .then(tasks => {
            for(const task of tasks){
                if (task.parent_id === this.state.user_id || task.user_id === this.state.user_id) {
                    this.setState({
                        ...this.state,
                        tasks: [...this.state.tasks, task],
                        completed: task.completed,
                        submitted: task.submitted
                    })
                }
                
            }
          })
    }

    handleClick = (e) => {
        e.preventDefault();
        this.props.history.push('/addtask')
    }

    handleDelete = (e, id) => {
        // e.preventDefault();
        console.log(id)
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

    render(){
        return (
            <div>
                {this.state.isAdult ? <button onClick={this.handleClick}> Add New Task! </button> : null}
                
                profile

                {this.state.tasks.map(task => 
                <TaskCard key={task.id} task={task} submitted={this.state.submitted} completed={this.state.completed} isAdult={this.state.isAdult} handleDelete={this.handleDelete}/>
                )
                }

            </div>  
        )
    }
}
export default withRouter(ProfileContainer);