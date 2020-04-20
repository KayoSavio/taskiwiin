import React, { useState, useEffect} from 'react';
import { useHistory} from 'react-router-dom';
import '../style.css';
import homem from '../../../assets/Perfil.jpg';
import mulher from '../../../assets/perfilF.jpg';
import { FiTrash2 } from 'react-icons/fi';
import api from '../../../services/api';
import {IconButton, Button} from '@material-ui/core';
import crypto from 'crypto';




export default function NewTask(){
  // 0-59
const [meta,setMeta] = useState(1);

const [dificult,setDificult] = useState('None');
const [name, setName] = useState('');
const [description, setDescription] = useState('');
const userId = localStorage.getItem('id');
const userName = localStorage.getItem('userName');
const [valor, setValor] = useState(0);
const [total, setTotal] = useState(0);
const [att, setAtt] = useState(0);
const [tasks, setTasks] = useState([]);
const [areas, setAreas] = useState([]);
const [persona, setPersona] = useState('#fff');


localStorage.setItem('value', valor);
const value = localStorage.getItem('value');
const sexo = localStorage.getItem('sexo');

function genero (){
if(sexo==='Masculino')
return homem;
if(sexo==='Feminino')
return mulher;
}
function dayMeta(){
if(meta===value)
 alert('Parábens você concluiu a meta diária!')
return
};

useEffect(() => {
const userName = localStorage.getItem('userName');
api.get(`/tasks/${userName}`)
 .then(res => {
   setTasks(res.data);
 });
}, [tasks]);

useEffect(() => {
const userId = localStorage.getItem('id');
api.get(`/persona/${userId}`)
 .then(res => {
   setAreas(res.data);
 });
}, [areas]);

useEffect(() => {
const userId = localStorage.getItem('id');
api.get(`/history/${userId}`)
 .then(res => {
   setTotal(res.data);
 });
}, [att]);

// CREATE
const history = useHistory();

async function addTarefas(e){
 e.preventDefault();
 const _id = crypto.randomBytes(8).toString('HEX');
 const task ={
   _id,
   taskId:userId,
   user:userName,
   name,
   description,
   persona,
   dificuldade:dificult
 };

 try{
   await api.post('history', task);
   await api.post('tasks', task);
   setName('');
   setDescription('');
   setPersona('#fff');
   setAtt(att+1);
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

function config(){
 history.push('/persona')
}
return(
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
       <div className="select">
         <label className="type">Tipo de tarefa:</label>
         <select value={persona} onChange={e=>setPersona(e.target.value)}>
           <option value="#fff" className="cor">none</option>
           <option value="rgb(249, 255, 190)" className="cor">emocional</option>
           <option value="rgb(255, 226, 80)" className="cor">espiritual</option>
           <option value="rgb(255, 150, 118)" className="cor">parentes</option>
           <option value="rgb(255, 100, 80)" className="cor">conjugal</option>
           <option value="rgb(255, 10, 100)" className="cor">filhos</option>
           <option value="rgb(255, 73, 151)" className="cor">social</option>
           <option value="rgb(229, 83, 255)" className="cor">saúde</option>
           <option value="rgb(195, 93, 255)" className="cor">servir</option>
           <option value="rgb(14, 151, 255)" className="cor">intelectual</option>
           <option value="rgb(11, 223, 252)" className="cor">financeiro</option>
           <option value="rgb(11, 252, 173)" className="cor">profissional</option>
         </select>
         <label className="type">Dificuldade:</label>
         <select value={dificult} className="dificultTask" onChange={(e) => {
           setDificult(e.target.value)
         }}>
           <option value="None">none</option>
           <option value="Very Easy">very easy</option>
           <option value="Easy">easy</option>
           <option value="Medium">medium</option>
           <option value="Hard">hard</option>
           <option value="Expert">expert</option>
         </select>
         <div className="buttonsForm">
       </div>
       <Button variant="contained" type="submit" className="submitTask">Nova tarefa</Button>
       
       </div>
     </form> 
   </div>

 {/* TASKS */}
     <div className="block">
       <h1 className="textTask">Tarefas</h1>
       <ul className="list">
         {tasks.map(tasks=>(
           <li key={tasks._id}>
             <div className="liBox">
               <div className="boxTask" style={{backgroundColor: tasks.persona,}}>
                 <strong  className="taskName">{tasks.name}</strong>
                 <p className="taskDescription">{tasks.description}</p>
               </div>
               <div className="completeBox">
                 <Button size="medium" variant="contained" onClick={() => {
                   completeTasks(tasks._id)
                 }}className="completeButton">
                   Concluída
                 </Button>
                 <IconButton  onClick={() => deleteTasks(tasks._id)} 
                 className="trash"><FiTrash2 display="inline-block" size={32} color="#07C86B"/>
                 </IconButton>
               </div>
             </div>
           </li>
           
         ))}
       </ul>  
   </div>
 </div>     
)
}