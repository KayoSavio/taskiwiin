import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';

export default function Register(){
  const history = useHistory();
  function voltar(){
    history.push('/');
  }
  return(
    <div className="box">
      <p>Testando</p>
      <button onClick={voltar}>Voltar</button>
    </div>
  )
}