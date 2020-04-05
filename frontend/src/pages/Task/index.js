import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
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
      
      <div className="perfil">
      <img src={jedi} className="jedi" />
      <h1 className="title">{userName}</h1>
        <button onClick={logout} className="button">Logout</button>
      </div>

      <div className="block">
        <h1 className="h">Tarefas</h1>
        <div className="tt">
        <ul className="list">
          {tasks.map(tasks=>(
            <li key={tasks._id}>
            <strong className="taskName">{tasks.name}</strong>
            <p className="taskDescription">{tasks.description}</p>
            <Link className="" onClick={() => {
              deleteTasks(tasks._id)
            }} className="trash"><FiTrash2 display="inline-block" size={24} color="#07C86B"/>
            </Link>
          </li>
          ))}
        </ul>  
        </div>
      </div>
      <div className="tarefa">
        <form onSubmit={addTarefas} className="form">
          <strong className="task">Nova Tarefa</strong>
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

          <button type="submit" className="submit">Nova tarefa</button>

        </form> 
      </div>     
    </div>
  );
}