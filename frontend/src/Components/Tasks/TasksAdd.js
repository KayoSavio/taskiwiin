import React, {Component, useState} from 'react';
import api from '../../services/api';

class AddTask extends Component{
  render(){
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const userId = localStorage.getItem('id');
    const [time,setTime]= useState();
    const [att, setAtt] = useState(0);
    const userName = localStorage.getItem('userName');

    async function addTarefas(e){
      e.preventDefault();
      const task ={
        taskId:userId,
        user:userName,
        name,
        description,
        time,
      };
    
      try{
        await api.post('history', task);
        await api.post('tasks', task);
        setName('');
        setDescription('');
        setTime([]);
        setAtt(att+1);
      }catch(err){
        alert('Erro em criar nova task');
      }
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
            <div className="buttonsForm">
            <input type="time" className="time" onChange={e=>setTime(e.target.value)}/>
            <p>{time}</p>
            <button type="submit" className="submitTask">Nova tarefa</button>
            
            </div>
          </form> 
        </div>
      </div>
  )
}
}

export default AddTask;