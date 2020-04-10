import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import api from '../../services/api';
import "./style.css";

export default function Register(){
  const [areas,setAreas]=useState([]);
  const [emotional, setEmotional] = useState(areas.emotional);
  const [spiritual, setSpiritual] = useState(areas.spiritual);
  const [relatives, setRelatives] = useState(areas.relatives);
  const [conjugal, setConjugal] = useState(areas.conjugal);
  const [children, setChildren] = useState(areas.children);
  const [social, setSocial] = useState(areas.social);
  const [health, setHealth] = useState(areas.health);
  const [serve, setServe] = useState(areas.serve);
  const [intelectual, setIntelectual] = useState(areas.intelectual);
  const [financial, setFinancial] = useState(areas.financial);
  const [professional, setProfessional] = useState(areas.professional);
  
  const _id = localStorage.getItem('id')
  const history = useHistory();

  useEffect(() => {
    const userId = localStorage.getItem('id');
    api.get(`/persona/${userId}`)
      .then(res => {
        setAreas(res.data);
      });
  }, [areas]);
  async function newUser(e){
    e.preventDefault();

    const persona={
      _id,
      emotional,
      spiritual,
      relatives,
      conjugal,
      children,
      social,
      health,
      serve,
      intelectual,
      financial,
      professional
    }
    try{
      await api.put(`persona/${_id}`, persona);
      alert('Atualizado');
      return history.push('/tasks');
    }catch(err){
      alert('Erro no cadastro, tente novamente');
    }
  }

  function voltar(){
    history.push('/tasks');
  }

  return(
    <div className="boxPersona">
      <form onSubmit={newUser} className="formPerson">
        <h1 className="textReg">Areas da sua vida:</h1>
        <div className="areasPer">
          <div className="areasA">
        <label>{emotional}Emotional:{areas.emotional}</label>
        <input 
          type="range"
          placeholder="Nome"
          className="inputName"
          min="0" max="10"
          value={emotional}
          onChange={e => {setEmotional(e.target.value);
          }} 
         />
         <label>{spiritual}Spiritual:{areas.spiritual}</label>
         <input 
          type="range"
          placeholder="Nome"
          className="inputName"
          min="0" max="10"
          value={spiritual}
          onChange={e => {setSpiritual(e.target.value);
          }} 
         />
         <label>{relatives}Relatives:{areas.relatives}</label>
         <input 
          type="range"
          placeholder="Nome"
          className="inputName"
          min="0" max="10"
          value={relatives}
          onChange={e => {setRelatives(e.target.value);
          }} 
         />
         <label>{conjugal}Conjugal:{areas.conjugal}</label>
         <input 
          type="range"
          placeholder="Nome"
          className="inputName"
          min="0" max="10"
          value={conjugal}
          onChange={e => {setConjugal(e.target.value);
          }} 
         />
         <label>{children}Children:{areas.children}</label>
         <input 
          type="range"
          placeholder="Nome"
          className="inputName"
          min="0" max="10"
          value={children}
          onChange={e => {setChildren(e.target.value);
          }} 
         />
         <label>{social}Social:{areas.social}</label>
         <input 
          type="range"
          placeholder="Nome"
          className="inputName"
          min="0" max="10"
          value={social}
          onChange={e => {setSocial(e.target.value);
          }} 
         /></div>
         <div className="areasB">
         <label>{health}Health:{areas.health}</label>
         <input 
          type="range"
          placeholder="Nome"
          className="inputName"
          min="0" max="10"
          value={health}
          onChange={e => {setHealth(e.target.value);
          }} 
         />
         <label>{serve}Serve:{areas.serve}</label>
         <input 
          type="range"
          placeholder="Nome"
          className="inputName"
          min="0" max="10"
          value={serve}
          onChange={e => {setServe(e.target.value);
          }} 
         />
         <label>{intelectual}Intelectual:{areas.intelectual}</label>
         <input 
          type="range"
          placeholder="Nome"
          className="inputName"
          min="0" max="10"
          value={intelectual}
          onChange={e => {setIntelectual(e.target.value);
          }} 
         />
         <label>{financial}Financial:{areas.financial}</label>
         <input 
          type="range"
          placeholder="Nome"
          className="inputName"
          min="0" max="10"
          value={financial}
          onChange={e => {setFinancial(e.target.value);
          }} 
         />
         <label>{professional}Professional:{areas.professional}</label>
         <input 
          type="range"
          placeholder="Nome"
          className="inputName"
          min="0" max="10"
          value={professional}
          onChange={e => {setProfessional(e.target.value);
          }} 
         /></div>
        </div>
        <div className="buttonPerson">
        <button className="buttonForm" type="submit">Atualizar</button>
        <button className="buttonBack" onClick={voltar}>Voltar</button>
        </div>
      </form>
      
      </div>
  )
}
