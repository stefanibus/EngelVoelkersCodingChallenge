import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { flexbox } from '@material-ui/system';
import logo from '../img/EV_Logo_RGB_oReg.svg';

const useStyles = makeStyles((theme) => ({



  root: {
    marginBottom: '7rem',
    paddingBottom: '2rem',
    position: 'relative',
      '&::after': {
        content: '" "',
        position: 'absolute',
        right    : '1%',
        bottom  : 0,
        height  : '1px',
        width   : '98%',
        borderBottom:'1px solid red',
        borderRadius: '0em',
      }
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    color: '#000000',
    textAlign: 'left',
  },
  iconButton: {
    color: '#000000',
  },
  appBar: {
    backgroundColor: '#fafafa',
    boxShadow: 'none',
  },
  loginToggle: {
          display: "flex",
          justifyContent: "flex-end",
  },
  logoImg: {
          width: "220px",
          maxWidth: '40vw',
          height: "auto",

  },



}));
// MenuAppBar
function Header() {
  const classes = useStyles();
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <FormGroup  edge="start" >
        <FormControlLabel
           className={classes.loginToggle}
          control={<Switch checked={auth} onChange={handleChange} aria-label="login switch" />}
          label={auth ? 'Logout' : 'Login'}
        />
      </FormGroup>
      <AppBar position="static"  className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title} >
            <a href="#">
              <img src={logo}  className={classes.logoImg} alt="Logo" />
            </a>
          </Typography>

          <IconButton edge="start" className={classes.menuButton} color="#000000" aria-label="menu">
            <MenuIcon />
          </IconButton>
          {auth && (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
                className={classes.iconButton}
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header
