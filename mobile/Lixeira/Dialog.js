import React, {useState, useEffect} from 'react';
import { useHistory, Link } from 'react-router-dom';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Box, Button, Dialog, Container} from '@material-ui/core';
import homem from '../../../../assets/Perfil.jpg';
import mulher from '../../../../assets/perfilF.jpg';
import '../../style.css';
import green from '@material-ui/core/colors/green';
import api from '../../../../services/api';


export default function AlertDialog() {
  const [meta,setMeta] = useState(1);

  const userName = localStorage.getItem('userName');
  const [valor, setValor] = useState(0);
  const [total, setTotal] = useState(0);
  const [att, setAtt] = useState(0);
  const [tasks, setTasks] = useState([]);
  const [areas, setAreas] = useState([]);
  const [persona, setPersona] = useState('#fff');


  const style ={
    color : 'white',
    backgroundColor: 'green',
  }
  const color = green['#69f0ae'];
  const [open, setOpen] = React.useState(false);
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
  const value = localStorage.getItem('value');
  const sexo = localStorage.getItem('sexo');
  function genero (){
    if(sexo==='Masculino')
    return homem;
    if(sexo==='Feminino')
    return mulher;
  }
  return (
    <Container>
    <Box>
      <Button style={style} variant="contained"  onClick={handleClickOpen}>
        Perfil
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Perfil"}</DialogTitle>
        <DialogContent className="dialogContent">
        <img src={genero()} className="jedi" alt="jedi"/>
        <h1 className="titlePerfil">{userName}</h1>
 
        <h1 className="taskSearch">Tasks Diárias:{value}</h1>
        <h1 className="taskSearch">Meta Diária:{meta}</h1>
        <input type="number" onChange={e=>setMeta(e.target.value)} placeholder="Quantidade de metas"></input>
        <h1 className="taskSearch">Total Tasks:{total}</h1>
        <div className="personUl">
          <ul className="ulPersona">
            <li>emocional:{areas.emotional}</li>
            <li>espiritual:{areas.spiritual}</li>
            <li>parentes:{areas.relatives}</li>
            <li>conjugal:{areas.conjugal}</li>
            <li>filhos:{areas.children}</li>
            <li>social:{areas.social}</li>
            <li>saúde:{areas.health}</li>
            <li>servir:{areas.serve}</li>
            <li>intelectual:{areas.intelectual}</li>
            <li>financeiro:{areas.financial}</li>
            <li>profissional:{areas.professional}</li>
          </ul> 
       
        </div>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color={color} autoFocus>
            Voltar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
    </Container>
  );
}