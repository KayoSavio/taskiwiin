import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import api from '../../services/api';
import crypto from 'crypto';
import "./style.css";

export default function Register(){
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  const history = useHistory();

  async function newUser(e){
    e.preventDefault();
    const _id = crypto.randomBytes(4).toString('HEX');

    const data = {
      _id,
      name,
      email,
      password,
      password2
    };
    const persona={
      _id,
      emotional:0,
      spiritual:0,
      relatives:0,
      conjugal:0,
      children:0,
      social:0,
      health:0,
      serve:0,
      intelectual:0,
      financial:0,
      professional:0
    }
    try{
      if(password===password2){
      const res = await api.post('register', data);
      await api.post('persona', persona);
      alert(`${res.data.name} sua conta foi criada com sucesso, seu ID de acesso é ${_id}`);
      return history.push('/');}
      else{
        alert('A senha está incorreta, corrija e tente novamente');
      }
    }catch(err){
      alert('Erro no cadastro, tente novamente');
    }
  }

  function voltar(){
    history.push('/');
  }

  return(
    <div className="boxRegister">
      <form onSubmit={newUser} className="formReg">
        <h1 className="textReg">Cadastrar novo usuário</h1>
        <input 
          placeholder="Nome"
          className="inputName"
          value={name}
          onChange={e => setName(e.target.value)}
         />

        <input 
          placeholder="E-mail"
          className="inputEmail"
          value={email}
          onChange={e => setEmail(e.target.value)}
          />

        <input 
          type="password"
          placeholder="Senha"
          className="inputPassword"
          value={password}
          onChange={e => setPassword(e.target.value)}
          />

        <input 
          type="password"
          placeholder="Confirme a senha" 
          className="password"
          value={password2}
          onChange={e => setPassword2(e.target.value)}
         />
        
        <button className="buttonForm" type="submit">Cadastrar</button>
        <button className="buttonBack" onClick={voltar}>Voltar</button>
      </form>
      
      </div>
  )
}
