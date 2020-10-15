import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { NavLink } from 'react-router-dom';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

  const Header = (props) => {
    const isLoggedIn = props.isLoggedIn
    const isAdult = props.isAdult

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };
    const classes = useStyles();

    return (
      <div className={classes.root}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={handleClick}>
            <MenuIcon />
          </IconButton>
          <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <NavLink className="menu" to="/"> Home </NavLink>
          </MenuItem>

          { isLoggedIn ? 
         (
          <div>
          <MenuItem onClick={handleClose}>
        <NavLink className="menu" to="/logout"> Logout </NavLink>
        </MenuItem>
        {isAdult ? 
        <MenuItem onClick={handleClose}><NavLink className="menu" to="/create_child_account"> Create Your Childs Account! </NavLink> 
        </MenuItem>
        : 
        <div>
        <MenuItem onClick={handleClose}>
        <NavLink className="menu" to="/wallet">Wallet</NavLink>
        </MenuItem>
        <MenuItem onClick={handleClose}>
        <NavLink className="menu" to="/addgoal">Add Goal</NavLink>
        </MenuItem>
        </div>
        }
        
        
        </div>
      )
     : (
        <div>
        <MenuItem onClick={handleClose}>
          <NavLink className="menu" to="/login"> Login </NavLink>
          </MenuItem>
          <MenuItem onClick={handleClose}>
          <NavLink className="menu" to="/signup"> Signup </NavLink>
          </MenuItem>
        </div>
      )
    }
      </Menu>
          {/* <Typography variant="h6" color="inherit">
            Photos
          </Typography> */}
        </Toolbar>
      </AppBar>
    </div>
    )
  }
  
  export default Header;