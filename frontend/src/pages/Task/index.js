import React from 'react';
import './style.css';
import Drawer from '../../components/Drawer';
import Task from './Components/Task';

export default function NewTask(){

  return(
    <div className="divDrawer">
      <Drawer/>
      <Task/>
    </div>
  );
}