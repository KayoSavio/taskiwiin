import React, {useEffect, useState} from 'react';
import api from '../../services/api';
import './style.css';
import Drawer from '../../components/Drawer';
import { makeStyles } from '@material-ui/core/styles';
import {IoLogoInstagram} from 'react-icons/io';
import {IoLogoFacebook} from 'react-icons/io';
import {IoLogoTwitter} from 'react-icons/io';


const useStyles = makeStyles((theme) => ({
  task:{
    display: 'flex',
    height: '100px',
    boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.25)',
    borderRadius: '10px',
    flexDirection: 'column',
  },
  h1:{
    marginLeft: '30px',
    color: 'green',
  },
  ul:{
    display: 'flex',
    listStyle: 'none',
    flexDirection:'column-reverse',
    marginRight: '40px',
    marginTop: '10px',
    marginBottom: '20px',
  },
  li:{

  },
  nameUser:{
    marginTop: '10px',
    marginLeft: '15px',
  },
  history:{
    display:'flex',
    flexDirection:'row',
    justifyContent: 'space-between',
  }
}));
export default function ClippedDrawer() {
  const classes = useStyles();
  const [task, setTask] = useState([]);

  useEffect(() => {
    api.get('tasks')
     .then(res => {
       setTask(res.data);
     });
    }, [task]);


  return (
    <div className="divDrawer">
      <Drawer/>
      <div className="Content">
          <h1 className="textTask">Feed</h1>
          <ul className={classes.ul}>
          {task.map(tasks=>(
            <li key={tasks._id} className="divHistory">
              <div className={classes.task} style={{backgroundColor: tasks.persona}}>
                <div className={classes.history}>
                  <h2 className="nameUser" style={{marginTop: '3px', marginLeft: '15px', marginBottom: '0'}}>{tasks.user}</h2>
                  <div className="icons">
                  <IoLogoInstagram color="#000" size={24} style={{marginRight: '15px', marginTop:'10px'}}/>
                  <IoLogoFacebook color="#000" size={24} style={{marginRight: '15px', marginTop:'10px'}}/>
                  <IoLogoTwitter color="#000" size={24} style={{marginRight: '15px', marginTop:'10px'}}/>
                  </div>
                </div>
                  <strong  className="taskName" style={{marginLeft:'15px'}}>{tasks.name}</strong>
                  <p className="taskDescription" style={{marginLeft:'15px'}}>{tasks.description}</p>
              </div>
            </li>
          ))}
        </ul>
       </div>  
    </div>
  );
}

