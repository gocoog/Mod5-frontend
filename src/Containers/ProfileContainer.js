import React from 'react';
import { withRouter } from 'react-router';
import TaskCard from '../Components/TaskCard'
import { Link } from 'react-router-dom';
import profile from '../images/test.png';

class ProfileContainer extends React.Component {

    handleClick = (e) => {
        e.preventDefault();
        this.props.history.push('/addtask')
    }

    

    render(){
        return (
            <div className='flex-container'>
                <div className="flex-child info">
                        <div className="info">
                            
                                {this.props.isAdult ? 
                                <div className="test">
                             <h1 className="profile-title">
                                 Create tasks for your kids!
                                 </h1>
                                 <hr></hr>
                             <p className="parent-task-page">It is never too early to start teaching your young ones the importance of proper money management.  </p>
                             <p className="parent-task-page">With the availability of tasks at their fingertips, your kids will be well on their journey of knowing how to earn, save, and share their money.</p>
                             <p className="parent-task-page">To your right you can keep tabs on your childrens tasks. Delete them if they're complete or hit that completion button to help your child reach their goals!</p>

                             {this.props.isAdult ? <button className="add-task" onClick={this.handleClick}> Add New Task! </button> : null}
                             </div>   
                            :
                            <div>
                            <h1>Task Corner!</h1>
                            <p className="parent-task-page">Take a look at all your available tasks! Complete each one and hit the submit button to let your parent know you're done. Watch as your money grows and you begin to reach your goals!</p>
                            </div>
                            }
                               
                    {/* <img className="test" src={profile} alt="Logo" /> */}
                    </div>
                </div>
                <div className="flex-child" id="cards">
                   

                    {this.props.tasks.map(task => 
                    <TaskCard key={task.id} task={task} submitted={task.submitted} completed={task.completed} isAdult={this.props.isAdult} handleDelete={this.props.handleDelete}/>
                    )
                    }

                </div>  
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