import React from 'react';
import { LinkContainer } from 'react-router-bootstrap'
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {likeNew} from '../../actions/newsAction'
import { useDispatch, useSelector } from 'react-redux'

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginBottom: "12px",
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function New({singleNew, docs, user}) {
  const classes = useStyles();

  const [expanded, setExpanded] = React.useState(false);
  const [liked, setLiked] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const dispatch = useDispatch()

  const docEmail = singleNew.doc
  const doc = docs.find( doc => doc.email === docEmail)

  const getCoincidence = (userId) => {
    return !!singleNew.users.find(u => (u.user).toString() === (userId).toString())
  }
  const like = (new_id) => {
    if (!getCoincidence(user._id) && !liked) {
      console.log("like")
      setLiked(true)
      dispatch(likeNew(new_id))
    }
  }
  return (
    <Card className={classes.root}>
       <CardHeader
        avatar={
          <LinkContainer to={`/doctors/${doc._id}`}>
          <Avatar aria-label="recipe" className={classes.avatar}>
            {doc.name.substring(0, 1)}
          </Avatar>
          </LinkContainer>
        }
        title={doc.name}
        subheader={singleNew.descr}
      />
      <CardMedia
        className={classes.media}
        image={singleNew.image}
        title="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {singleNew.text.length > 10 ? singleNew.text.substring(0, 10) + "..." : singleNew.text}
        </Typography>
      </CardContent>
      {
        singleNew.text.length > 10 ?
        <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon onClick={() => like({new_id: singleNew._id})}/>
        </IconButton>
        <p style={{fontSize:20, color:"gray"}}> {liked && singleNew.likes ? singleNew.likes + 1 : liked && !singleNew.likes ? 1 : singleNew.likes} </p>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <div onClick={handleExpandClick} style={{display:"flex", width:"100%"}}>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
        </div>
      </CardActions> : 
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon onClick={() => like({new_id: singleNew._id})} />
          
        </IconButton>
        <p style={{fontSize:20, color:"gray"}}> {liked && singleNew.likes ? singleNew.likes + 1 : liked && !singleNew.likes ? 1 : singleNew.likes} </p>
       </CardActions>
      }
       
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>
            {singleNew.text}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
