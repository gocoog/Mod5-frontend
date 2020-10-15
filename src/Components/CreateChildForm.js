import React, { Component } from 'react'
import { withRouter } from 'react-router';
import { Redirect } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

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
        // e.preventDefault();

        const newChildAccount = {
          user: {
              first_name: this.state.first_name,
              last_name: this.state.last_name,
              email_address: this.state.email_address,
              password: this.state.password,
              adult: false,
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
                this.createChildWallet(token.user_id)
                this.setState({
                    ...this.initialState,
                    formSuccess: true
                })
            } else{
                alert("This email is taken. Please use a different email")
            }})
      }

    createChildWallet = (id) => {
        let newWallet = {
            user_id: id,
            amount: 0
        }
        fetch('http://localhost:3001/wallets', {
          method: 'POST',
          body: JSON.stringify(newWallet),
          headers: {
            'Content-Type': 'application/json',
            'Auth-Key': localStorage.getItem('auth_key')
          }
        }).then(response => response.json())
        .then(wallet => console.log(wallet))
    }

    render(){
      const { classes } = this.props;
        return (
          <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
        Sign up your child!
        </Typography>
        <form className={classes.form} onSubmit={this.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                onChange={this.handleInputChange}
                name='first_name'
                autoComplete="fname"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                onChange={this.handleInputChange}
                name='last_name'
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="email"
                onChange={this.handleInputChange}
                name='email_address'
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={this.handleInputChange}
                name='password'
                variant="outlined"
                required
                fullWidth
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
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
            Create Child Account!
          </Button>
        </form>
      </div>

      <br />
    </Container>
        //     <div>
        //     <div className="signup-page">
        //         <div className="form">
        //             <form className="signup-form"onSubmit={this.handleSubmit}>
        //                 {this.state.formSuccess ? <h1>Account succesfully created!</h1> : null}
        //                 <h2> Sign your child up and start the journey! </h2>
        //                 <input required type="text" onChange={this.handleInputChange} name='first_name' placeholder="First Name"  />
        //                 <input required type="text" onChange={this.handleInputChange} name='last_name' placeholder="Last Name"  />
        //                 <input required type="email" onChange={this.handleInputChange} name='email_address' placeholder="Email Address"  />
        //                 <input required type="password" onChange={this.handleInputChange} name='password' placeholder="Password"/>
        //                 <button id="submit" type="submit" value="Submit">Create Acccount!</button>
        //             </form>
        //         </div>
        //     </div>            
        // </div>
        )
    }
}

export default withStyles(useStyles) (withRouter(CreateChildForm));