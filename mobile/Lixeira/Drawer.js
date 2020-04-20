import React from 'react';
import {useHistory} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import ViewListIcon from '@material-ui/icons/ViewList';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Task from '../Task.js';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: 'green',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
}));

export default function ClippedDrawer() {
  const classes = useStyles();
  const history = useHistory();

  function logout(){
    localStorage.clear('');
    history.push('/');
  }
  function goFeed(){
    history.push('/feed');
  }
  function goTask(){
    history.push('/tasks');
  }
  function goProfile(){
    history.push('/profile');
  }
  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            Taskiwiin
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
              <ListItem button key={'Profile'} onClick={()=>goProfile()}>
                <ListItemIcon><AccountBoxIcon/></ListItemIcon>
                <ListItemText primary={'Profile'} />
              </ListItem>
              <ListItem button key={'Task List'} onClick={()=>goTask()}>
                <ListItemIcon><AssignmentTurnedInIcon /></ListItemIcon>
                <ListItemText primary={'Tasks List'} />
              </ListItem>
              <ListItem button key={'Tasks Feed'} onClick={()=>goFeed()}>
                <ListItemIcon><ViewListIcon /></ListItemIcon>
                <ListItemText primary={'Tasks Feed'} />
              </ListItem>
              <ListItem button  key={'Exit'} onClick={()=>logout()}>
                <ListItemIcon><ExitToAppIcon  /></ListItemIcon>
                <ListItemText primary={'Exit'} />
              </ListItem>
          </List>
        </div>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
      </main>
    </div>
      
  );
}


