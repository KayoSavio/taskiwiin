import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import api from '../../services/api';
import crypto from 'crypto';

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

    try{
      if(password===password2){
      const res = await api.post('register', data);
      console.log(res);
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
    <div className="box">
      <form onSubmit={newUser} className="form">
        <input 
          placeholder="Nome"
          className="name"
          value={name}
          onChange={e => setName(e.target.value)}
         />

        <input 
          placeholder="E-mail"
          className="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          />

        <input 
          type="password"
          placeholder="Senha"
          className="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          />

        <input 
          type="password"
          placeholder="Confirme a senha" 
          className="password2"
          value={password2}
          onChange={e => setPassword2(e.target.value)}
         />
        
        <button className="button" type="submit">Cadastrar</button>
      </form>
      
      <button onClick={voltar}>Voltar</button>
    </div>
  )
}
