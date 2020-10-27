import React, { Component } from 'react'
import { withRouter } from "react-router";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Mood from '@material-ui/icons/Mood';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Lottie from 'react-lottie';
import animationData from '../lotties/money';

const useStyles = theme => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  })

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

class GoalForm extends Component {
    inititalState = {
        goal_name: '',
       
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
        const { classes } = this.props;
        return (
          <div className="flex-container" > 
            <div className="flex-child" >
            <Lottie 
                    options={defaultOptions}
                    height={400}
                    width={400}
                />
                </div>
                <div className="flex-child">
            <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <Mood />
              </Avatar>
              <Typography component="h1" variant="h5">
                Create Your Goal!
              </Typography>
              <form className={classes.form} onSubmit={this.persistGoal}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      onChange={this.handleInputChange}
                      name='goal_name'
                      autoComplete="fname"
                      variant="outlined"
                      required
                      fullWidth
                      id="goal_name"
                      label="Goal Name"
                      autoFocus
                    />
                  </Grid>
                  {/* <Grid item xs={12} sm={6}>
                    <TextField
                      onChange={this.handleInputChange}
                      name='goal_img'
                      variant="outlined"
                      required
                      fullWidth
                      id="goal_img"
                      label="Goal Image URL"
                      autoComplete="goal_img"
                    />
                  </Grid> */}
                  <Grid item xs={12}>
                    <TextField
                        type="number"
                        min="0.01"
                        step="0.01"
                        onChange={this.handleInputChange}
                        name='goal_amount'
                        variant="outlined"
                        required
                        fullWidth
                        id="goal_amount"
                        label="Goal Amount"
                        autoComplete="goal_amount"
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
                  Create Goal!
                </Button>
              </form>
            </div>
      
            <br />
          </Container>
          </div>
          </div>
        // <div>
        //     <div className="goal-page">
        //         <div className="form">
        //             <form className="goal-form" onSubmit={this.persistGoal}>
        //                 <h2> Create a goal! </h2>
        //                 <input required type="text" onChange={this.handleInputChange} name='goal_name' placeholder="Goal Name"  />
        //                 <input required type="text" onChange={this.handleInputChange} name='goal_img' placeholder="Goal Image URL"  />
        //                 <input label="$" required type="number" min="0.01" step="0.01" onChange={this.handleInputChange} name='goal_amount' placeholder="How much to complete this goal?"  />
                        
        //                 <button id="submit" type="submit" value="Submit">Create Goal!</button>
        //             </form>
        //         </div>
        //     </div>            
        // </div>
        )
    }
}

export default withStyles(useStyles) (withRouter(GoalForm));