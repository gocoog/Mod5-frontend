import React, { Component } from 'react'
// import Select from 'react-select'
import Select from '@material-ui/core/Select';
import { withRouter } from "react-router";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import FormatListBulleted from '@material-ui/icons/FormatListBulleted';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import TaskImage from '../images/finance.jpg'
import Coin from '../images/coin.png'

const useStyles = theme => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: "blue",
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  })
  
class AddTask extends Component {
    initialState = {
        task_name: '',
        task_img: TaskImage,
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
                      options: [...this.state.options, {value: i.id, label: this.titleCase(`${i.first_name} ${i.last_name}`)}],
                      children: [...this.state.children, i]
                  })
              }
          }
      }

      handleDropdownChange = (e) => {
          console.log(e.target.value)
        this.setState({
            ...this.state,
            child_id: e.target.value
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
            this.setState({
                ...this.initialState
            })
            alert("Task succesfully create!")
            this.props.handleAddTaskSubmit(newTask)
            // this.props.handleElectionSubmit(newTask)
            this.setState(this.initialState,() => {
            this.props.history.push('/')})
        
        })
      }


    render(){
        const { classes } = this.props;
        return(
            <div className="top-element">
                <div className="left-element">

                    
                </div>
            <div className="add-task-form" >
            
            <Container component="main" maxWidth="xs" >
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                    <FormatListBulleted />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                    Create Task!
                    </Typography>
                    <form className={classes.form} onSubmit={this.persistTask}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}> 
                            <InputLabel id="label">Child Name</InputLabel>
                            <Select fullWidth className="width50" value={this.state.selected} onChange={this.handleDropdownChange} > 
                            {this.state.children.map(i => 
                                (<MenuItem
                                    label={this.titleCase(`${i.first_name} ${i.last_name}`)}
                                    value={i.id} >
                                        {this.titleCase(`${i.first_name} ${i.last_name}`)}
                                </MenuItem>))}
                            </Select>
                        </Grid>
                        <Grid item xs={12}>
                        <TextField
                            onChange={this.handleInputChange}
                            name='task_name'
                            variant="outlined"
                            required
                            fullWidth
                            id="taskName"
                            label="Task Name"
                            autoComplete="tname"
                        />
                        </Grid>
                        <Grid item xs={12}>
                        <TextField
                            onChange={this.handleInputChange}
                            name='task_img'
                            variant="outlined"
                            fullWidth
                            id="task_img"
                            label="Task Image"
                            autoComplete="task_img"
                        />
                        </Grid>
                        <Grid item xs={12}>
                        <TextField
                            type="number" 
                            min="0.01" 
                            step="0.01"
                            onChange={this.handleInputChange}
                            name='task_amount'
                            variant="outlined"
                            required
                            fullWidth
                            label="Task Amount"
                            id="task_amount"
                            autoComplete="task_amount"
                        />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Create Task
                    </Button>
                    </form>
                </div>
            </Container>
        </div>

        </div>
        //     <div>
        //     <div className="task-page">
        //         <div className="form">
        //             <form className="task-form" onSubmit={this.persistTask}>
        //                 <h2> Create a task! </h2>
        //                 <Select options={this.state.options} onChange={this.handleDropdownChange}/>
        //                 <input required type="text" onChange={this.handleInputChange} name='task_name' placeholder="Task Name"  />
        //                 <input required type="text" onChange={this.handleInputChange} name='task_img' placeholder="Task Image URL"  />
        //                 <input label="$" required type="number" min="0.01" step="0.01" onChange={this.handleInputChange} name='task_amount' placeholder="How much to complete this task?"  />
                        
        //                 <button id="submit" type="submit" value="Submit">Create Task!</button>
        //             </form>
        //         </div>
        //     </div>            
        // </div>
        )
    }
}

export default withStyles(useStyles) (withRouter(AddTask));