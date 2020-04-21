import React from 'react';
import './style.css';
import Drawer from '../../components/Drawer';
import Rank from './components/Rank';

export default function ClippedDrawer() {

  return (
    <div className="divDrawer">
      <Drawer/>  
      <Rank/>
    </div>
  );
}
