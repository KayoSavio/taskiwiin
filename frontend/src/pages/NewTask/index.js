import React from 'react';
import {useHistory} from 'react-router-dom';
import './style.css';
import jedi from '../../assets/jedi.png';
export default function NewTask(){
  const tarefas = [''];
  const history = useHistory();
    function addTarefas(){

        saveStorage();
    }

    function saveStorage(){
        localStorage.setItem('lista_tarefas',JSON.stringify(tarefas));
    }
    function logout(){
      history.push('/')
    }
  return(
    <div className="box">
      <div className="block2">
      <img src={jedi} className="jedi" />
        <button onClick={logout} className="button">Voltar</button>
      </div>
      <div className="block">
        <h1 className="h">Tarefas</h1>
        <input className="input" type="text" placeholder="Nova Tarefa"/>
        <button onClick={addTarefas} className="button">Adicionar</button>
        <ul></ul>
      </div>
    </div>
  );
}