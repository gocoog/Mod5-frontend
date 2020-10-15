import React from 'react';
import { withRouter } from 'react-router';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
// import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
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

class Login extends React.Component {

  state = {
    email_address: '',
    password: '',
    userId: ''
  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()

    fetch('http://localhost:3001/login',{
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({
            user: {
            email_address: this.state.email_address,
            password: this.state.password
          }})
    })
    .then(res =>res.json())
    .then(token=> {
        if (token.auth_key){
            localStorage.setItem('auth_key',token['auth_key'])
            localStorage.setItem('user_id', token.user_id)
            // localStorage.setItem('user', JSON.stringify(token.email_address))
            this.props.handleLogIn()
            this.props.history.push('/user')
        }else{
            this.props.failedLogIn()
            this.props.history.push('/login')
        }
    })
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
          Login
        </Typography>
        <form className={classes.form} onSubmit={this.handleSubmit} >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                type="email"
                onChange={this.handleInputChange}
                name='email_address'
                variant="outlined"
                required={true}
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
                required={true}
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
            value="Submit"
          >
            Login
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to='/signup' variant="body2">
                Don't have an account? Sign up!
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        {this.Copyright()}
      </Box>
    </Container>
  

        // <div>
        //     <div className="login-page">
        //         <div className="form">
        //             <form className="login-form"onSubmit={this.handleSubmit}>
        //                 <h2> Login </h2>
        //                 <input type="text" onChange={this.handleInputChange} name='email_address' placeholder="Email Address"  />
        //                 <input type="password" onChange={this.handleInputChange} name='password' placeholder="Password"/>
        //                 <button id="submit" type="submit" value="Submit">login</button>
        //                 <p className="message">Not registered? <Link to='/signup'>Create an account</Link></p>
        //             </form>
        //         </div>
        //     </div>            
        // </div>

        
    )
  }
}

export default withStyles(useStyles) (withRouter(Login));