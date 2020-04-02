import React, {useState} from 'react';
import logo from '../../kiwii.svg';
import { Link, useHistory} from "react-router-dom";
import './style.css';

export default function Home (){

  const history = useHistory();

  function Login(){
    history.push("/task");
  }
  return(
    <div className="box">
        <div className="caixa">
          <p className="p">TasKiwiin</p>
          <img src={logo} className="App-logo" alt="logo" />
          <form onsubmit={Login} className="form">
            <input className="input1" placeholder="Nome"/> 
            <input className="input2" placeholder="Senha"/> 
          </form>  
          <button onClick={Login} className="button" type="submit">Entrar</button>
          <Link className="App-link" to="/register">
            Não tenho cadastro
          </Link>
        </div>
        <footer className="footer"></footer>
      </div>
  );
}
  