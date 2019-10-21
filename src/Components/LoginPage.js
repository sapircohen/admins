import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import firebase from 'firebase';
import Loader from 'react-loader-spinner';
import Header from './MainHeader';

let logged = false;

const styles = theme => ({
    main: {
      width: 'auto',
      display: 'block', // Fix IE 11 issue.
      marginLeft: theme.spacing.unit * 3,
      marginRight: theme.spacing.unit * 3,
      [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
        width: 400,
        marginLeft: 'auto',
        marginRight: 'auto',
      },
    },
    paper: {
      marginTop: theme.spacing.unit * 8,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
      margin: theme.spacing.unit,
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing.unit,
    },
    submit: {
      marginTop: theme.spacing.unit * 3,
    },
  });
  
  class LoginScreen extends React.Component{
    constructor(props){
      super(props);
      this.changedAdmin = this.changedAdmin.bind(this);
      this.changedPassword = this.changedPassword.bind(this);
    }
    state={
      password:'',
      admin:'',
      isReady:true
    }
    CheckUser = (event)=>{
      event.preventDefault();
      this.setState({
        isReady:false,
      },()=>{
      if (this.state.password === '') {
        alert("שכחת סיסמה?");
        this.setState({
          isReady:true,
        })
        return;
      }
      else if (this.state.groupName === '') {
        alert("שכחת שם משתמש?");
        this.setState({
          isReady:true,
        })
        return;
      }
      this.GetUser();
    })
    }
    GetUser=()=>{
      //console.log('sdfsf')
      const {history} = this.props;
      const ref = firebase.database().ref('Data').child('Admins');
      ref.once("value", (snapshot)=> {
        snapshot.forEach((admin)=> {
          if (this.state.password === admin.val().Password && this.state.admin === admin.val().Name) {
            logged=true;
            localStorage.setItem('adminInfo',JSON.stringify(admin.val()));
            history.push('/InstitudePage');
          }
        })
      })
      .then(()=>{
        if (!logged) {
          //console.log('sdfsf')
          this.getSmallAdmin();
        }
      })
    }
    getSmallAdmin=()=>{
      const {history} = this.props;
      //first check if big admin
      const ref = firebase.database().ref('Data').child('Ruppin').child('Faculties');
      ref.once("value", (snapshot)=> {
        snapshot.forEach((faculty)=> {
            faculty.child('Departments').forEach((dep)=>{
                const admins =dep.val().Admins;
                if (admins!==undefined) {
                    //console.log(admins)
                    dep.child('Admins').forEach((admin)=>{
                        if (this.state.password === admin.val().Password && this.state.admin === admin.val().Name) {
                            logged=true;
                            localStorage.setItem('department', JSON.stringify(dep.val().Name));
                            localStorage.setItem('GoogleDriveLink', JSON.stringify(dep.val().Groups));
                            //console.log(dep.val().Groups);
                            localStorage.setItem('faculty',JSON.stringify(faculty.val().Name));
                            localStorage.setItem('adminInfo',JSON.stringify(admin.val()));
                            history.push('/projectsData')
                        }
                    })
                }
            })
        })
      }, (errorObject)=> {
        console.log("The read failed: " + errorObject.code);
      })
      .then(()=>{
        this.setState({isReady:true},()=>{
          if (!logged) {
            alert('נתונים שגויים, נסה שוב');
          }
        });
      })
    }
    changedAdmin(e){
      this.setState({admin:e.target.value});
    }
    changedPassword(e){
      this.setState({password:e.target.value})
    }
    render(){
      const { classes } = this.props;
      if(!this.state.isReady){
        return(
          <div style={{flex:1,marginTop:'20%',textAlign:'center'}}>
            <Loader 
            type="Watch"
            color="#58947B"
            height="100"	
            width="100"
            />  
          </div> 
        )
      }
      return (
        <div>
          <Header/>
          <main className={classes.main}>
          <CssBaseline />
          <Paper className={classes.paper}>
            <Avatar style={{backgroundColor:'transparent'}} className={classes.avatar}>
              <img
                alt="ruppin logo"
                src='http://sn2e.co.il/wp-content/uploads/2016/07/logo.Ruppin_round-300x296.png'
                width='70'
                height='70'
              />
            </Avatar>
            <Typography component="h1" variant="h5">
              ממשק סגל
            </Typography>
            <form className={classes.form}>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="email">שם משתמש</InputLabel>
                <Input onChange={this.changedAdmin} autoFocus />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password">סיסמה</InputLabel>
                <Input onChange={this.changedPassword} type="password" autoComplete="current-password" />
              </FormControl>
              <Button
                onClick={this.CheckUser}
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                התחבר
              </Button>
            </form>
          </Paper>
        </main>

        </div>
      );
    }
  }
  LoginScreen.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(LoginScreen);