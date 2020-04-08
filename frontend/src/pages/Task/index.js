import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import './style.css';
import jedi from '../../assets/Perfil.jpg';
import { MdAddCircle } from 'react-icons/md';
import { FiTrash2 } from 'react-icons/fi';
import api from '../../services/api';




export default function NewTask(){
  
  const meta = 1;
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const userId = localStorage.getItem('id');
  const userName = localStorage.getItem('userName');
  const [valor, setValor] = useState(0);
  const [total, setTotal] = useState(0);
  const [tasks, setTasks] = useState([]);
  const number = 0 +valor;
  localStorage.setItem('value', number);
  const value = localStorage.getItem('value');

  function dayMeta(){
    if(meta>=valor){
      alert('Parábens você concluiu a meta diária!')
    }else{
      return console.log('meta n concluida')
    }
  };

  useEffect(() => {
    api.get(`/tasks`)
      .then(res => {
        setTasks(res.data);
      });
  }, [tasks]);


  useEffect(() => {
    api.get(`/history`)
      .then(res => {
        setTotal(res.data);
      });
  }, [valor]);

  // CREATE
  const history = useHistory();

    async function addTarefas(e){

      const task ={
        taskId:userId,
        user:userName,
        name,
        description,
      };
    
      try{
        await api.post('history', task);
        await api.post('tasks', task);
      }catch(err){
        alert('Erro em criar nova task');
      }
    }

    // DELETE
    async function deleteTasks(id){
      try{
        await api.delete(`tasks/${id}`);
      }
      catch(err){
        alert('Erro em deletar task, tente novamente')
      }
    }

    // COMPLETE
    async function completeTasks(id){
      try{
        await api.delete(`tasks/${id}`);
        setValor(valor + 1);
        dayMeta();
    }
      catch(err){alert('Erro em deletar task, tente novamente')}
      
    }

    // LOGOUT
    function logout(){
      localStorage.clear();
      history.push('/')
    }

    // JSX
  return(

    // PERFIL
    <div className="box">
      <div className="perfil">
        <img src={jedi} className="jedi" />
        <h1 className="titlePerfil">{userName}</h1>
        <button onClick={logout} className="button">Logout</button>
        <h1 className="taskSearch">Tasks Diárias:{value}</h1>
        <h1 className="taskSearch">Meta Diária:{meta}</h1>
        <h1 className="taskSearch">Total Tasks:{total}</h1>
      </div>

    {/* NEWTASK */}
      <div className="taskBox">
        <div className="tarefa">
          <form onSubmit={addTarefas} className="formTask">
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

            <button type="submit" className="submitTask">Nova tarefa</button>
          </form> 
        </div>

      {/* TASKS */}
          <div className="block">
            <h1 className="textTask">Tarefas</h1>
            <ul className="list">
              {tasks.map(tasks=>(
                <li key={tasks._id}>
                  <div className="liBox">
                    <div className="boxTask">
                      <strong className="taskName">{tasks.name}</strong>
                      <p className="taskDescription">{tasks.description}</p>
                    </div>
                    <div className="completeBox">
                      <button onClick={() => {
                        completeTasks(tasks._id)
                      }}className="completeButton">
                        Concluída
                      </button>
                      <Link className="" onClick={() => {
                        deleteTasks(tasks._id)
                      }} className="trash"><FiTrash2 display="inline-block" size={32} color="#07C86B"/>
                      </Link>
                    </div>
                  </div>
                </li>
                
              ))}
            </ul>  
        </div>
      </div>     
    </div>
  );
}