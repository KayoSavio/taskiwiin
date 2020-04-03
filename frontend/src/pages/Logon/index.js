import React, {useState} from 'react';
import logo from '../../kiwii.svg';
import { Link, useHistory} from "react-router-dom";
import './style.css';
import api from '../../services/api';

export default function Home (){
  const [id, setId] = useState('');
  const history = useHistory();
  

  async function Login(e){
    e.preventDefault();

    try{
      const res = await api.get(`register/${id}`, id);

      if(res.data._id===id){
        localStorage.setItem('userName',res.data.name);
        const userName = localStorage.getItem('userName');
        alert(`Bem vindo ${userName}`);
        localStorage.setItem('userEmail',res.data.email);
        localStorage.setItem('id',res.data._id);
        return history.push('/tasks');
      }else{
      alert('ID incorreto, tente novamente!');
      }
    }catch(err){
      alert('Não foi possível, serviço indisponível')
    }
  }

  return(
    <div className="box">
      
      <div className="caixa">
          <p className="p">TasKiwiin</p>
          
          <img src={logo} className="App-logo" alt="logo" />
          
          <form onSubmit={Login} className="form">
            
            <h1>Faça seu Logon</h1>

            <input 
              className="input" 
              placeholder="Coloque seu ID"
              value={id}
              onChange={e => setId(e.target.value)}
            /> 

            <button className="button"
             type="submit">
               Entrar
            </button>

          </form>  

          <Link className="App-link" to="/register">
            Não tenho cadastro
          </Link>
      </div>

    </div>
  );
}
  