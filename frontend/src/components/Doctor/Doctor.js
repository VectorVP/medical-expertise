import React from 'react';
import { LinkContainer } from 'react-router-bootstrap'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    cursor: "pointer",
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

export default function Doctor({doctor}) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (

    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {doctor.name.substring(0, 1)}
          </Avatar>
        }
        title={doctor.name}
        subheader="September 14, 2016"
      />
        <LinkContainer to={`/doctors/${doctor._id}`}>
          <CardMedia
            className={classes.media}
            image={doctor.image}
            title="Paella dish"
          />
        </LinkContainer>
        <LinkContainer to={`/doctors/${doctor._id}`}>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            This impressive paella is a perfect party dish and a fun meal to cook together with your
            guests. Add 1 cup of frozen peas along with the mussels, if you like.
          </Typography>
        </CardContent>
      </LinkContainer>
      <CardActions disableSpacing>
      <Button variant="contained" color="primary">
        Subscribe
      </Button>
      <LinkContainer to={`/doctors/${doctor._id}`} style={{marginLeft: "10px"}}>
        <Button variant="contained">
          View Details
        </Button>
      </LinkContainer>
      </CardActions>
    </Card>
  );
}

// import React from 'react'
// import { Card } from 'react-bootstrap'
// import { Link } from 'react-router-dom'

// const Doctor = ({ doctor }) => {
//     return (
//         <Card className="my-3 p-2 rounded">
//             <Link to={`/doctors/${doctor._id}`}>
//                 <Card.Img 
//                     style={{width:'100%', minHeight: "37vh", objectFit:'cover'}} 
//                     src={doctor.image} variant="top" 
//                 />
//             </Link>
//             <Card.Body>
//             <Link to={`/doctors/${doctor._id}`}>
//                 <Card.Title as="div"> 
//                     <strong>{doctor.name}</strong> 
//                 </Card.Title>
//             </Link>
//                 <Card.Text as="div">  
//                    {doctor.qualification}
//                 </Card.Text>
//                 <Card.Text as="div">  
//                     Цена за консультацию: <h4> {doctor.price} </h4>
//                 </Card.Text>
//             </Card.Body>
//         </Card>
//     )
// }

// export default Doctor
