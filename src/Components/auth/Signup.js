import React from 'react';
import { withRouter } from 'react-router';
import { Redirect } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
// import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';

import AccountCircle from '@material-ui/icons/AccountCircle';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link } from 'react-router-dom';

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

class Signup extends React.Component {
    state = {
        first_name: '',
        last_name: '', 
        email_address: '',
        password: ''
    }

    Copyright = () => {
      return (
        <Typography variant="body2" color="textSecondary" align="center">
          {'Copyright © '}
          <Link color="inherit" href="https://material-ui.com/">
            Money and Sense
          </Link>{' '}
          {new Date().getFullYear()}
          {'.'}
        </Typography>
      );
    }

    failedSignup = () => {

            return <Redirect push to="/login" />

    }

    handleInputChange = (e) => {
        this.setState({
          [e.target.name]: e.target.value
        })
      }
    
      handleSubmit = (e) => {
        e.preventDefault()
        const newUser = {
          user: {
              first_name: this.state.first_name,
              last_name: this.state.last_name,
              email_address: this.state.email_address,
              password: this.state.password,
          }
        }
        fetch('http://localhost:3001/signup',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newUser)
        }).then(res => res.json())
        .then(token => 
            {if (token.auth_key) {
              console.log(token)
                localStorage.setItem('auth_key',token['auth_key'])
                localStorage.setItem('user_id', token.user_id)
                this.props.handleLogIn(this.state.email_address, token.user_id)
                this.props.history.push('/user')
            } else{
                alert("This email is taken. Please use a different email")
                // this.failedSignup()
                // this.props.history.push('/signup')
            }})
      }

    render(){
      const { classes } = this.props;
    return (
      <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AccountCircle />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
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
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive updates via email."
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
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to='/login' variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>

      <br />
      {this.Copyright()}
    </Container>
    
    )
        // return (
        //     <div>
        //     <div className="signup-page">
        //         <div className="form">
        //             <form className="signup-form"onSubmit={this.handleSubmit}>
        //                 <h2> Parent? Signup! </h2>
        //                 <input required type="text" onChange={this.handleInputChange} name='first_name' placeholder="First Name"  />
        //                 <input required type="text" onChange={this.handleInputChange} name='last_name' placeholder="Last Name"  />
        //                 <input required type="email" onChange={this.handleInputChange} name='email_address' placeholder="Email Address"  />
        //                 <input required type="password" onChange={this.handleInputChange} name='password' placeholder="Password"/>
        //                 <button id="submit" type="submit" value="Submit">Signup!</button>
        //             </form>
        //         </div>
        //     </div>            
        // </div>
        // )
    }
}
export default withStyles(useStyles) (withRouter(Signup));