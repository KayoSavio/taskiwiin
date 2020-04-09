import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import api from '../../services/api';
import "./style.css";

export default function Register(){
  const [emotional, setEmotional] = useState(0);
 
  const _id = localStorage.getItem('id')
  const history = useHistory();

  async function newUser(e){
    e.preventDefault();

    const persona={
      _id,
      emotional,
      spiritual:0,
      relatives:0,
      conjugal:0,
      children:0,
      social:0,
      health:0,
      serve:0,
      intelectual:0,
      financial:0,
      professional:0
    }
    try{
      await api.put(`persona/${_id}`, persona);
      alert('Atualizado');
      return history.push('/task');
    }catch(err){
      alert('Erro no cadastro, tente novamente');
    }
  }

  function voltar(){
    history.push('/tasks');
  }

  return(
    <div className="boxRegister">
      <form onSubmit={newUser} className="formReg">
        <h1 className="textReg">Areas da sua vida:</h1>
        <input 
          type="range"
          placeholder="Nome"
          className="inputName"
          min="0" max="10"
          value={emotional}
          onChange={e => {setEmotional(e.target.value);
          console.log(e.target.value);
          }}
         />
        
        <button className="buttonForm" type="submit">Atualizar</button>
        <button className="buttonBack" onClick={voltar}>Voltar</button>
      </form>
      
      </div>
  )
}
