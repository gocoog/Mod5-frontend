import React from 'react';
import { withRouter } from 'react-router';
import TaskCard from '../Components/TaskCard'
import { Link } from 'react-router-dom';

class ProfileContainer extends React.Component {

    handleClick = (e) => {
        e.preventDefault();
        this.props.history.push('/addtask')
    }

    

    render(){
        return (
            <div>
                {this.props.isAdult ? <button onClick={this.handleClick}> Add New Task! </button> : null}
                
                profile

                {this.props.tasks.map(task => 
                <TaskCard key={task.id} task={task} submitted={task.submitted} completed={task.completed} isAdult={this.props.isAdult} handleDelete={this.props.handleDelete}/>
                )
                }

            </div>  
        )
    }
}
export default withRouter(ProfileContainer);

// state = {
    //     user_id: 0,
    //     first_name: '',
    //     last_name: '',
    //     email_address: '',
    //     isAdult: false,
    //     tasks: [],
    //     completed: false,
    //     submitted: false
    // }
    // componentDidMount(){
    //     const id = localStorage.getItem('user_id')

    //     fetch(`http://localhost:3001/users/${id}`)
    //       .then(res => res.json())
    //       .then(user => this.setState({
    //           ...this.state,
    //           user_id: user.id,
    //           first_name: user.first_name,
    //           last_name: user.last_name,
    //           email_address: user.email_address,
    //           isAdult: user.adult
    //       })
    //       ) 

    //       fetch('http://localhost:3001/tasks')
    //       .then(res => res.json())
    //       .then(tasks => {
    //         for(const task of tasks){
    //             if (task.parent_id === this.state.user_id || task.user_id === this.state.user_id) {
    //                 this.setState({
    //                     ...this.state,
    //                     tasks: [...this.state.tasks, task],
    //                     completed: task.completed,
    //                     submitted: task.submitted
    //                 })
    //             }
                
    //         }
    //       })
          
    // }