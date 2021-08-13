import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import AccountCircle from '@material-ui/icons/AccountCircle'
import Switch from '@material-ui/core/Switch'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormGroup from '@material-ui/core/FormGroup'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import logo from '../img/EV_Logo_RGB_oReg.svg'

// stupid TypeScript Workaround
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const FormGroupIcon: any = FormGroup

const useStyles = makeStyles((someTheming) => ({
  root: {
    marginBottom: '7rem',
    paddingBottom: '2rem',
    position: 'relative',
    '&::after': {
      content: '" "',
      position: 'absolute',
      right: '1%',
      bottom: 0,
      height: '1px',
      width: '98%',
      borderBottom: '1px solid red',
      borderRadius: '0em',
    },
  },
  menuButton: {
    marginRight: someTheming.spacing(2),
  },
  title: {
    flexGrow: 1,
    color: '#000000',
    textAlign: 'left',
  },
  iconButtonClass: {
    color: '#000000',
  },
  appBar: {
    backgroundColor: '#fafafa',
    boxShadow: 'none',
  },
  loginToggle: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  logoImg: {
    width: '220px',
    maxWidth: '40vw',
    height: 'auto',
  },
}))
// MenuAppBar
function Header(): JSX.Element {
  const classes = useStyles()
  const [auth, setAuth] = React.useState(true)
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)

  const handleChange = (event: { target: { checked: boolean } }): void => {
    setAuth(event.target.checked)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleMenu = (event: { currentTarget: any }): void => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = (): void => {
    setAnchorEl(null)
  }

  return (
    <div className={classes.root}>
      <FormGroupIcon edge="start">
        <FormControlLabel
          className={classes.loginToggle}
          control={
            <Switch
              checked={auth}
              onChange={handleChange}
              aria-label="login switch"
            />
          }
          label={auth ? 'Logout' : 'Login'}
        />
      </FormGroupIcon>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <a href="#sortThis">
              <img src={logo} className={classes.logoImg} alt="Logo" />
            </a>
          </Typography>

          <IconButton
            edge="start"
            className={classes.menuButton}
            aria-label="menu"
          >
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
                className={classes.iconButtonClass}
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
  )
}
export default Header
