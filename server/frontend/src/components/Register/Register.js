import React from 'react';
import { LinkContainer } from 'react-router-bootstrap'
import {NavLink} from 'react-router-dom'
import CircularProgress from '@material-ui/core/CircularProgress'
import Paper from '@material-ui/core/Paper';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/collection/68742803)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },  paper: {
    margin: theme.spacing(8, 4),
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Register = ({ onSigninSubmit, 
                    email, 
                    onEmailChange, 
                    password, 
                    onPasswordChahge, 
                    name,
                    onNameChange,
                    qualification, 
                    onQualificationChange, 
                    specialty, 
                    onSpecialtyChange, 
                    price, 
                    onPriceChange}) => {
  const classes = useStyles();

  const [check, setCheck] = React.useState(false);

  const handleChange = (event) => {
    setCheck(event.target.checked);
  };

  return (
    <Grid container component="main" className={classes.root} style={{marginBottom: "-80px"}}>
      <CssBaseline />
      <CircularProgress style={{position:"absolute", top:"45%", left: "26%", zIndex:0, width:"90px", height:"90px"}}/>
        <Grid item xs={false} sm={4} md={7} className={classes.image} style={{zIndex:1}}/>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Добро пожаловать!
          </Typography>
          <LinkContainer to="/" style={{marginTop:"20px"}}>
                <Button variant="contained" color="primary">
                    Вернуться на главную
                </Button>
          </LinkContainer>  
          <form className={classes.form} onSubmit={onSigninSubmit} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              value={name}
              onChange={onNameChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={onEmailChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={onPasswordChahge}
            />
            { check && 
              <>
               <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="qualification"
                  label="Qualification"
                  type="qualification"
                  id="qualification"
                  autoComplete="qualification"
                  value={qualification}
                  onChange={onQualificationChange}
                />
                  <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="specialty"
                  label="Specialty"
                  type="specialty"
                  id="specialty"
                  autoComplete="specialty"
                  value={specialty}
                  onChange={onSpecialtyChange}
                />
                  <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="price"
                  label="Price"
                  type="price"
                  id="price"
                  autoComplete="price"
                  value={price}
                  onChange={onPriceChange}
                />
              </>
            }
             <FormControlLabel
                control={
                <Checkbox
                    checked={check.checkedB}
                    onChange={handleChange}
                    name="checkedB"
                    color="primary"
                />
                }
                label="I'm doctor."
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Зарегестриорваться
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Забыли пароль?
                </Link>
              </Grid>
              <Grid item>
                <NavLink to={"/login"}>
                  "Есть аккаунт? Войти."
                </NavLink>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}

export default Register;