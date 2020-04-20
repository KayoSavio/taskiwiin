import React, {useState} from 'react';
import logo from '../../kiwii.svg';
import { Link, useHistory} from "react-router-dom";
import './style.css';
import api from '../../services/api';

export default function Home (){
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();
  

  async function Login(e){
    e.preventDefault();

    try{
      const res = await api.get(`registers/${name}`, name);
      if(password===res.data[0].password&&name===res.data[0].name){
        localStorage.setItem('coins',res.data[0].taskCoin);
        localStorage.setItem('userName',res.data[0].name);
        localStorage.setItem('sexo',res.data[0].sexo);
        const userName = localStorage.getItem('userName');
        alert(`Bem vindo ${userName}`);
        localStorage.setItem('userEmail',res.data[0].email);
        localStorage.setItem('id',res.data[0]._id);
        return history.push('/tasks');
      }else{
      alert('Senha incorreta, tente novamente!');
      }
    }catch(err){
      alert('Nome de usuário não existe, tente novamente.')
    }
  }

  return(
      <div className="conteiner">
          <h1 className="text">TasKiwiin</h1>
          
          <img src={logo} className="Kiwii" alt="logo" />
          
          <form onSubmit={Login} className="formLogon">
            
            <h2 className="textInput">Faça seu Logon</h2>

            <input 
              className="inputID" 
              placeholder="Coloque seu Nome de Usuário"
              value={name}
              onChange={e => setName(e.target.value)}
            /> 
            <input 
              type="password"
              className="inputID" 
              placeholder="Coloque sua Senha"
              value={password}
              onChange={e => setPassword(e.target.value)}
            /> 

            <button className="buttonLogon"
             type="submit">
               Entrar
            </button>

          </form>  

          <Link className="linkLogon" to="/register">
            Não tenho cadastro
          </Link>
      </div>
  );
}
  