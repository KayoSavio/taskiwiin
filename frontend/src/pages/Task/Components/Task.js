import React, { useState, useEffect} from 'react';
import '../style.css';
import { FiTrash2 } from 'react-icons/fi';
import api from '../../../services/api';
import {IconButton} from '@material-ui/core';
import AddTask from './AddTask';
import Clain from './Clain';
import Coin from './Coin';

export default function NewTask(){
const meta = 5;
// const [meta,setMeta] = useState(0);
const [valor, setValor] = useState(0);
// const [total, setTotal] = useState(0);
const [tasks, setTasks] = useState([]);
const [areas, setAreas] = useState([]);
const [coins, setCoins] = useState(localStorage.getItem('coins'));

localStorage.setItem('value', valor);
const value = localStorage.getItem('value');



function dayMeta(){
if(value===meta){
  alert('Parábens você concluiu a meta diária!')
}

return
};

//Tasks(Mostra no task list, todas as tarefas que não foram feitas que estão salvas no db)

useEffect(() => {
const userName = localStorage.getItem('userName');
api.get(`/tasks/${userName}`)
 .then(res => {
   setTasks(res.data);
 });
}, [tasks]);

//Persona(Areas que cada task é feita)

useEffect(() => {
const userId = localStorage.getItem('id');
api.get(`/persona/${userId}`)
 .then(res => {
   setAreas(res.data);
 });
}, [areas]);


//History(Numero do total de tasks já feitas)

// useEffect(() => {
// const userId = localStorage.getItem('id');
// api.get(`/history/${userId}`)
//  .then(res => {
//    setTotal(res.data);
//  });
// }, [tasks]);


// DELETE
async function deleteTasks(id){
 try{
   await api.delete(`tasks/${id}`);
 }
 catch(err){
   alert('Erro em deletar task, tente novamente')
 }
}
async function taskValue(id){
  const res = await api.get(`task/${id}`);
    if(res.data.dificuldade==="None")
      return 0;
    if(res.data.dificuldade==="Very Easy")
      return 1;
    if(res.data.dificuldade==="Easy")
      return 2;
    if(res.data.dificuldade==="Medium")
      return 3;
    if(res.data.dificuldade==="Hard")
      return 4;
    if(res.data.dificuldade==="Expert")
      return 5;
}
// COMPLETE
async function completeTasks(id){
  const userId = localStorage.getItem('id');
  const res = await api.get(`register/${userId}`);
  const valor = await taskValue(id);
  const coins= res.data.taskCoin+valor;  
  const data={
    taskCoin:coins,
  };
 try{
   await api.delete(`tasks/${id}`);
   setValor(valor + 1);
   const res = await api.put(`register/${userId}`,data);
   localStorage.setItem('coins',res.data.taskCoin);
   setCoins(res.data.taskCoin);
   dayMeta();
}
 catch(err){alert('Erro em deletar task, tente novamente')}
 
}

return(
     <div className="Content">
      <div className="titleContent">
      <h1 className="textTask">Tarefas</h1>
      <div className="dialogBox">
      <p>NewTask:</p>
      <AddTask/>
      <p>TaskCoins:</p>
      <Coin/>
      <strong className="strongCoins">{coins}</strong>
      <p>Clain:</p>
      <Clain/>
      </div>
      </div>
       <ul className="list">
         {tasks.map(tasks=>(
           <li key={tasks._id}>
             <div className="liBox">
               <div className="boxTask" style={{backgroundColor: tasks.persona,}}>
                 <div className="contentName" style={{display:'flex',flexDirection: 'row', justifyContent: 'space-between'}}>
                 <strong  className="taskName">Nome:{tasks.name}</strong>
                 <p className="taskHard" style={{marginRight: '15px', marginTop:'5px',marginBottom:'0px'}}>Mode:{tasks.dificuldade}</p>
                 </div>
                 
                 <p className="taskDescription">Descrição:{tasks.description}</p>
                 <p  className="taskClain" style={{marginLeft:'10px', marginBottom:'5px'}}>Recompensa:{tasks.recompensa}</p>
               </div>
               <div className="completeBox">
                 <button size="medium" variant="contained" onClick={() => {
                   completeTasks(tasks._id)
                 }}className="completeButton">
                   Concluída
                 </button>
                 <IconButton  onClick={() => deleteTasks(tasks._id)} 
                 className="trash"><FiTrash2 display="inline-block" size={32} color="#07C86B"/>
                 </IconButton>
               </div>
             </div>
           </li>
           
         ))}
       </ul>  
   </div>   
)
}