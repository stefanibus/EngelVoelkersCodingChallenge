/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable react/require-default-props */
import React from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Collapse from '@material-ui/core/Collapse'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import FavoriteIcon from '@material-ui/icons/Favorite'
import PhoneForwardedIcon from '@material-ui/icons/PhoneForwarded'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import Tooltip from '@material-ui/core/Tooltip'
import Person from '@material-ui/icons/Person'
import Store from '@material-ui/icons/Home'
import Home from '@material-ui/icons/Store'
import HelpIcon from '@material-ui/icons/Help'
import PropTypes from 'prop-types'

// stupid TypeScript Workaround
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PersonIcon: any = Person
const StoreIcon: any = Store
const HomeIcon: any = Home

// https://material-ui.com/styles/basics/
// https://material-ui.com/components/cards/#complex-interaction
const useStyles = makeStyles((someTheming) => ({
  root: {
    maxWidth: 645,
    margin: '0 auto',
    marginTop: '1rem',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: someTheming.transitions.create('transform', {
      duration: someTheming.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: someTheming.palette.primary.main,
  },
  phone: {
    color: 'inherit',
    height: '1em',
    width: '1em',
  },
  blurredInfo: {
    color: 'lightgrey',
    opacity: '.4',
  },
  mtMinus5: {
    marginTop: '-5px',
  },
}))

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
// function SimpleCard({ dummy }): JSX.Element {
function SimpleCard({ dummy }: { dummy: any }): JSX.Element {
  const classes = useStyles()
  const [expanded, setExpanded] = React.useState(false)

  const handleExpandClick = (): void => {
    setExpanded(!expanded)
  }

  const avatarType = (type: string): JSX.Element => {
    // replaced Switch Statement by an object, that was inspired by:
    // eslint-disable-next-line max-len
    // https://stackoverflow.com/questions/6114210/is-returning-out-of-a-switch-statement-considered-a-better-practice-than-using-b
    return (
      {
        agent: <PersonIcon alt="agent" />,
        shop: <HomeIcon alt="shop" />,
        property: <StoreIcon alt="property" />,
      }[type] ?? <HelpIcon />
    )
  }
  // style the Date-Information
  const dateShow = (d: string): string => {
    const res = d.substring(0, 10)
    return res
  }

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {' '}
            {avatarType(dummy.type)}{' '}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            {' '}
            <MoreVertIcon />{' '}
          </IconButton>
        }
        title={dummy.name}
        subheader={dateShow(dummy.createdAt)}
      />
      <CardContent>
        {dummy.address && (
          <Typography variant="body2" color="textSecondary" component="p">
            {`Postal Adress: ${dummy.address}`}
          </Typography>
        )}
        {dummy.shop && (
          <Typography variant="body2" color="textSecondary" component="p">
            {`Shop Information: ${dummy.shop}`}
          </Typography>
        )}
      </CardContent>
      <CardActions disableSpacing className={classes.mtMinus5}>
        <IconButton aria-label="add to favorites">
          <Tooltip title="no func here" enterDelay={400} leaveDelay={200}>
            <FavoriteIcon />
          </Tooltip>
        </IconButton>
        {dummy.phone && (
          <IconButton aria-label="share">
            <Tooltip title="Call now" enterDelay={400} leaveDelay={200}>
              <a href={`tel:${dummy.phone}`} className={classes.phone}>
                <PhoneForwardedIcon />
              </a>
            </Tooltip>
          </IconButton>
        )}
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
          {dummy.phone && (
            <Typography paragraph> Phone Number: {dummy.phone}. </Typography>
          )}
          {dummy.shop && (
            <Typography paragraph>
              {' '}
              <span className={classes.blurredInfo}>
                See above for Shop Info.
              </span>
            </Typography>
          )}
          {dummy.address && (
            <Typography paragraph>
              {' '}
              <span className={classes.blurredInfo}>
                See above for Postal Adress.
              </span>{' '}
            </Typography>
          )}
        </CardContent>
      </Collapse>
    </Card>
  )
}

SimpleCard.propTypes = {
  // eslint-disable-next-line react/require-default-props
  // eslint-disable-next-line react/forbid-prop-types
  dummy: PropTypes.object,
}

export default SimpleCard
