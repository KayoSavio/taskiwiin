import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {ListItemText, ListItemIcon, ListItem, Typography, List, Toolbar, AppBar, Drawer} from '@material-ui/core';
import {ExitToApp, ViewList, AssignmentTurnedIn} from '@material-ui/icons';
import {IoMdTrophy} from 'react-icons/io';
import ProfileDialog from './ProfileDialog';
import NotificationDialog from './NotificationDialog';
import Store from './Store';
import coin from '../assets/coin.svg';
import api from '../services/api';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: 'green',
    display: 'flex',    
    alignItems: 'space-between',
  },
  drawer: {
    width: 'maxContent',
    flexShrink: 0,
    backgroundColor: 'white'
  },
  drawerPaper: {
    width: drawerWidth,
    
  },
  drawerContainer: {
    overflow: 'auto',
  },
  app:{
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  btnNotify:{
    color: 'white',
  },
  icon:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'center',
    alignContent:'center',
  },
  coinValue:{
    marginTop: '25px',
    fontSize: '18px',
    marginLeft:'0px',
    marginRight: '10px',
  },
  link:{
    marginRight:'0px',
    padding:'0px',
  }
}));

export default function ClippedDrawer() {
  const classes = useStyles();
  const [coinValue,setCoinValue] = useState('');
  const history = useHistory();


  useEffect(() => {
    const userId = localStorage.getItem('id');
    api.get(`register/${userId}`)
    .then(res=>{
      console.log(res);
      setCoinValue(res.data.taskCoin);
    });
  }, [coinValue])


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
    history.push('/ranking');
  }
  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <div className={classes.app}>
          <Typography variant="h5" noWrap>
            Taskiwin
          </Typography>
          <div className={classes.icon}>
          <img src={coin} alt="coin" style={{width:'25px', height: '25px', marginTop:'18px', marginRight:'3px'}}/>
          <p style={{marginRight:'10px'}}>:{coinValue}</p>
          <Store/>
          <NotificationDialog/>
          <ProfileDialog/>
          </div>
          </div>
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
              <ListItem button key={'Ranking'} onClick={()=>goProfile()}>
                <ListItemIcon ><IoMdTrophy size={26}/></ListItemIcon>
                <ListItemText primary={'Ranking'} />
              </ListItem>
              <ListItem button key={'Task List'} onClick={()=>goTask()}>
                <ListItemIcon><AssignmentTurnedIn /></ListItemIcon>
                <ListItemText primary={'Tasks List'} />
              </ListItem>
              <ListItem button key={'Tasks Feed'} onClick={()=>goFeed()}>
                <ListItemIcon><ViewList /></ListItemIcon>
                <ListItemText primary={'Tasks Feed'} />
              </ListItem>
              <ListItem button  key={'Exit'} onClick={()=>logout()}>
                <ListItemIcon><ExitToApp  /></ListItemIcon>
                <ListItemText primary={'Exit'} />
              </ListItem>
          </List>
        </div>    
      </Drawer>
      </div>
      
  );
}


