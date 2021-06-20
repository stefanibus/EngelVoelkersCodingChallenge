import React              from 'react';
import clsx               from 'clsx';
import { makeStyles }     from '@material-ui/core/styles';
import Card               from '@material-ui/core/Card';
import CardHeader         from '@material-ui/core/CardHeader';
import CardContent        from '@material-ui/core/CardContent';
import CardActions        from '@material-ui/core/CardActions';
import Collapse           from '@material-ui/core/Collapse';
import Avatar             from '@material-ui/core/Avatar';
import IconButton         from '@material-ui/core/IconButton';
import Typography         from '@material-ui/core/Typography';
import FavoriteIcon       from '@material-ui/icons/Favorite';
import PhoneForwardedIcon from '@material-ui/icons/PhoneForwarded';
import ExpandMoreIcon     from '@material-ui/icons/ExpandMore';
import MoreVertIcon       from '@material-ui/icons/MoreVert';
import Tooltip            from '@material-ui/core/Tooltip';
import Person             from '@material-ui/icons/Person';
import Store              from '@material-ui/icons/Home';
import Home               from '@material-ui/icons/Store';
import HelpIcon           from '@material-ui/icons/Help';





const useStyles = makeStyles((ev_theme) => ({
  root: {
    maxWidth: 645,
    margin: '0 auto',
    marginTop: '1rem',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: ev_theme.transitions.create('transform', {
      duration: ev_theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: ev_theme.palette.primary.main,
  },
  phone: {
    color: 'inherit',
  },
  blurredInfo: {
    color: 'lightgrey',
    opacity: '.4',
  },
  noInfo: {
    display: 'none',
  },
  mtMinus5: {
      marginTop: '-5px',
  },
}));

function SimpleCard({dummy}) {


 //
  console.log('dummy: ', dummy)


  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const avatarType = (type) => { // Improoved Switch Statement inspired from:  https://stackoverflow.com/questions/6114210/is-returning-out-of-a-switch-statement-considered-a-better-practice-than-using-b
    return (({
      'agent':  <Person alt="agent" /> ,
      'shop':  <Home  alt="shop" /> ,
      'property':  <Store  alt="property" />
    })[type] ?? <HelpIcon />)
  }

  const dateShow = (d) => {
      const res = d.substring(0, 10);
      return(res);
  }

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar} >
           {avatarType(dummy.type)}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={dummy.name}
        subheader={dateShow(dummy.createdAt)}
      />
      <CardContent>
        {dummy.address ?
            <Typography variant="body2" color="textSecondary" component="p">
                 {'Postal Adress: '+dummy.address}
            </Typography>
          :  <span className={classes.noInfo}>No Postal Adress </span>
        }

        {dummy.shop ?
            <Typography variant="body2" color="textSecondary" component="p">
                 {'Shop Information: '+dummy.shop}
            </Typography>
          : <span className={classes.noInfo}>No Shop Adress</span>
        }
      </CardContent>
      <CardActions disableSpacing className={classes.mtMinus5 } >
        <IconButton aria-label="add to favorites">
            <Tooltip title="no func here" enterDelay={500} leaveDelay={200}>
               <FavoriteIcon />
            </Tooltip>
        </IconButton>
      {dummy.phone ?
        <IconButton aria-label="share">
            <Tooltip title="Call now" enterDelay={500} leaveDelay={200}>
              <a href={'tel:'+dummy.phone} className={classes.phone}  >
                <PhoneForwardedIcon   />
              </a>
            </Tooltip>
        </IconButton>
        : ''
      }

        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>
               {dummy.phone ?  `Phone Number:  ${dummy.phone}.` : <span className={classes.blurredInfo}>No Phone Number available for  {dummy.type}-Members.</span> }
          </Typography>
          <Typography paragraph>
               {dummy.address ?  <span className={classes.blurredInfo}>See above for Postal Adress.</span>  : <span className={classes.blurredInfo}>No Adress available for {dummy.type}-Members.</span> }
          </Typography>
          <Typography paragraph>
               {dummy.shop ?  <span className={classes.blurredInfo}>See above for Shop Info.</span> :  <span className={classes.blurredInfo}>No Shop-Info available for {dummy.type}-Members.</span> }
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}

export default SimpleCard