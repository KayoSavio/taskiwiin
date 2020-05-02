import React, { useState, useEffect} from 'react';
import '../style.css';
import { FiTrash2 } from 'react-icons/fi';
import api from '../../../services/api';
import {IconButton} from '@material-ui/core';
import AddTask from './AddTask';
import Claim from './Claim';
import Coin from './Coin';
import None from '../../../assets/buttonDificult/none.svg';
import Easy from '../../../assets/buttonDificult/Easy.svg';
import VeryEasy from '../../../assets/buttonDificult/VeryEasy.svg';
import Medium from '../../../assets/buttonDificult/Medium.svg';
import Hard from '../../../assets/buttonDificult/Hard.svg';
import Expert from '../../../assets/buttonDificult/Expert.svg';

export default function NewTask(){
const meta = 5;
// const [meta,setMeta] = useState(0);
const [valor, setValor] = useState(0);
// const [total, setTotal] = useState(0);
const [tasks, setTasks] = useState([]);
const [areas, setAreas] = useState([]);
// const [coins, setCoins] = useState(localStorage.getItem('coins'));

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
  //  setCoins(res.data.taskCoin);
   dayMeta();
}
 catch(err){alert('Erro em deletar task, tente novamente')}
 
}
function btnDificult(img){
  if(img==='None')
  return None;
  if(img==='Very Easy')
  return VeryEasy;
  if(img==='Easy')
  return Easy;
  if(img==='Medium')
  return Medium;
  if(img==='Hard')
  return Hard;
  if(img==='Expert')
  return Expert;
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
      <p>Claim:</p>
      <Claim/>
      </div>
      </div>
       <ul className="list">
         {tasks.map(tasks=>(
           <li key={tasks._id}>
             <div className="liBox">
               <div className="boxTask" style={{backgroundColor: tasks.persona,}}>
                 <div className="contentName" style={{display:'flex',flexDirection: 'row', justifyContent:'flex-start', alignItems:'center', marginLeft:'3px'}}>
                 <img src={btnDificult(tasks.dificuldade)} className="taskHard" alt="btnDificult" style={{marginLeft:'10px',marginRight: '0px', marginTop:'5px',marginBottom:'0px', width:'30px',height:'30px'}}/>
                 <strong  className="taskName">Nome:{tasks.name}</strong>
                 </div>
                 <p className="taskDescription">Descrição:{tasks.description}</p>
                 <p  className="taskClain" style={{marginLeft:'10px', marginBottom:'5px'}}>Recompensa:{tasks.recompensa}</p>
               </div>
               <div className="completeBox">
                 <button  onClick={() => {
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