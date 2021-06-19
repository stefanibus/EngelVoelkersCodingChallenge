import React              from 'react';
import clsx               from 'clsx';
import { makeStyles }     from '@material-ui/core/styles';
import Card               from '@material-ui/core/Card';
import CardHeader         from '@material-ui/core/CardHeader';
import CardMedia          from '@material-ui/core/CardMedia';
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
    marginTop: '1.3rem',
  },
  media: {
    height: 0,
    paddingTop: '.25%',
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
}));

function SimpleCard({dummydata}) {

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const avatarType = () => {
    const type =  dummydata.mergedArray[0].type

    // Improoved Switch Statement https://stackoverflow.com/questions/6114210/is-returning-out-of-a-switch-statement-considered-a-better-practice-than-using-b
    return (({
      'agent':  <Person /> ,
      'shop':  <Home /> ,
      'store':  <Store />
    })[type] ?? <HelpIcon />)

  }

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar} >
           {dummydata?   avatarType()  : 'no data'}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"
      />
      <CardMedia
        className={classes.media}
        image="/static/images/cards/paella.jpg"
        title="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          This impressive paella is a perfect party dish and a fun meal to cook together with your
          guests. Add 1 cup of frozen peas along with the mussels, if you like.
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
            <Tooltip title="no func here" enterDelay={500} leaveDelay={200}>
               <FavoriteIcon />
            </Tooltip>
        </IconButton>
        <IconButton aria-label="share">
            <Tooltip title="Call now" enterDelay={500} leaveDelay={200}>
              <PhoneForwardedIcon   />
            </Tooltip>
        </IconButton>
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
            Details can be accessed quickly.
          </Typography>
          <Typography paragraph>
            What sort of Insights might be helpful inside of a dropown, if at all?
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}

export default SimpleCard