import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './style.css';
import jedi from '../../assets/jedi.png';
import { MdAddCircle } from 'react-icons/md';
import { FiTrash2 } from 'react-icons/fi';
import api from '../../services/api';

export default function NewTask(){
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const userId = localStorage.getItem('id');
  const userName = localStorage.getItem('userName');

  const [tasks, setTasks] = useState([]);
  
  useEffect(() => {
    api.get(`/tasks`)
      .then(res => {
        setTasks(res.data);
      });
  }, [tasks]);

  const history = useHistory();

    async function addTarefas(e){

      const task ={
        taskId:userId,
        user:userName,
        name,
        description,
      };
    
      try{
        await api.post('tasks', task);
      }catch(err){
        alert('Erro em criar nova task');
      }
    }

    async function deleteTasks(id){
      try{await api.delete(`tasks/${id}`);}
      catch(err){alert('Erro em deletar task, tente novamente')}
    }

    function logout(){
      localStorage.clear();
      history.push('/')
    }

  return(
    <div className="box">
      <strong className="title">{userName} tasks</strong>
      <div className="block2">
      <img src={jedi} className="jedi" />
        <button onClick={logout} className="button">Voltar</button>
      </div>

      <div className="block">
        <h1 className="h">Tarefas</h1>
        
        <ul>
          {tasks.map(tasks=>(
            <li key={tasks._id}>
            <strong>{tasks.name}</strong>
          <p>{tasks.description}</p>
            <button onClick={() => {
              deleteTasks(tasks._id)
            }} className="trash"><FiTrash2 size={16} color="#8cc63f"/></button>
          </li>
          ))}
        </ul>  
      </div>

      <form onSubmit={addTarefas} className="form">
        
        <input 
          className="name"
          type="text" 
          placeholder="Nova Tarefa"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        
        <input 
          className="description"
          type="text" 
          placeholder="Nova Tarefa"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />

        <button type="submit" className="button">Nova tarefa</button>
        <MdAddCircle size={18} color="#8cc63f"/>

      </form>      
    </div>
  );
}