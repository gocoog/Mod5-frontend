import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "inline",
    padding: "10px",

  }
}));

  const Header = (props) => {
    const isLoggedIn = props.isLoggedIn
    const isAdult = props.isAdult

    const [anchorEl, setAnchorEl] = React.useState(null);

    const classes = useStyles();

    return (
        <AppBar>
        <Toolbar variant="dense">
        <Typography variant="h6" className={classes.title}>
          <NavLink className="menu" to="/"> Home </NavLink>
          </Typography>
          { !isLoggedIn ? 
         <span>
              <Typography variant="h6" className={classes.title}>
              <NavLink className="menu" to="/login"> Login </NavLink>
              </Typography>
              <Typography variant="h6" className={classes.title}>
              <NavLink className="menu" to="/signup"> Signup </NavLink>
              </Typography>
          </span>
            
          : 
                  
              <span>
            {isAdult ? 
              <Typography variant="h6" className={classes.title}>
                  <NavLink className="menu" to="/create_child_account"> Create Your Childs Account!
                </NavLink> 
                </Typography>
              : 
              <span>
                <Typography variant="h6" className={classes.title}>
              <NavLink className="menu" to="/wallet">Wallet</NavLink>
              </Typography>
              <Typography variant="h6" className={classes.title}>
              <NavLink className="menu" to="/addgoal">Add Goal</NavLink>
              </Typography>
              <Typography variant="h6" className={classes.title}>
              <NavLink className="menu" to="/learn_more">Learn More!</NavLink>
              </Typography>
              </span>
              } 
              <Typography variant="h6" className={classes.title}>
            <NavLink className="menu" to="/logout"> Logout </NavLink>
            </Typography>
            </span>
            }
        </Toolbar>
      </AppBar>
    //   <AppBar position="static">
    //     <Toolbar variant="dense">
    //     <Typography variant="h6" className={classes.title}>
    //       <NavLink className="menu" to="/"> Home </NavLink>
    //       </Typography>
    //       { isLoggedIn ? 
         
    //       <div>
            
    //         <Typography variant="h6" className={classes.title}>
    //     <NavLink className="menu" to="/logout"> Logout </NavLink>
    //     </Typography>
    //     {isAdult ? 
    //     <Typography variant="h6" className={classes.title}>
    //         <NavLink className="menu" to="/create_child_account"> Create Your Childs Account!
    //       </NavLink> 
    //       </Typography>
    //     : 
    //     <div>
    //       <Typography variant="h6" className={classes.title}>
    //     <NavLink className="menu" to="/wallet">Wallet</NavLink>
    //     </Typography>
    //     <Typography variant="h6" className={classes.title}>
    //     <NavLink className="menu" to="/addgoal">Add Goal</NavLink>
    //     </Typography>
    //     </div>
    //     }
        
        
    //     </div>
      
    //  : 
    //     <div>
    //       <Typography variant="h6" className={classes.title}>
    //       <NavLink className="menu" to="/login"> Login </NavLink>
    //       </Typography>
    //       <Typography variant="h6" className={classes.title}>
    //       <NavLink className="menu" to="/signup"> Signup </NavLink>
    //       </Typography>
    //     </div>
      
    // }
    //     </Toolbar>
    //   </AppBar>

    )
  }
  
  export default Header;