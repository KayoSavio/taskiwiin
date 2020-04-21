import React, {useState} from 'react';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Box, Button, Dialog, Container, IconButton, InputBase} from '@material-ui/core';
import {FiPlus} from 'react-icons/fi';
import green from '@material-ui/core/colors/green';
import { makeStyles } from '@material-ui/core/styles';
import api from '../../../services/api';
import crypto from 'crypto';

const useStyles = makeStyles((theme) => ({
  btn:{
    width: '48px',
    height: '48px',
  },
  box:{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  container:{
    display: 'flex',
    justifyContent: 'flex-end',
    padding: '0px',
    marginRight: '10px',
    marginLeft: '5px',
  },
  form:{
    display: 'flex',
    width: '100%',
  },
  difficult:{
    marginLeft: '5px',
  },
  select:{
    marginRight: '25px',
    marginLeft: '5px',
  },
  btnNew:{
    height: '36px',
    width: '68px',
    backgroundColor: '#69f0ae',
    color: '#000',
  },
}));
export default function AlertDialog() {
  const classes = useStyles();
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

  const [dificult,setDificult] = useState('None');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const userId = localStorage.getItem('id');
  const userName = localStorage.getItem('userName');
  const [att, setAtt] = useState(0);
  const [persona, setPersona] = useState('#fff');
  const [recompensa, setRecompensa]= useState('');

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
      dificuldade:dificult,
      recompensa
    };
   
    try{
      await api.post('history', task);
      await api.post('tasks', task);
      setName('');
      setDescription('');
      setRecompensa('');
      setPersona('#fff');
      setDificult('None');
      setAtt(att+1);
      handleClose();
    }catch(err){
      alert('Erro em criar nova task');
    }
   }

  return (
    <Container className={classes.container}>
    <Box className={classes.box}>
      <IconButton style={style}  onClick={handleClickOpen} className={classes.btn}>
      <FiPlus display="flex" size={24} color="#fff"/>
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Nova Tarefa"}</DialogTitle>
        <DialogContent className={classes.dialogForm}>
            <div className={classes.form}>
              <form onSubmit={addTarefas} className="formTask">
                    <InputBase 
                      className="name"
                      type="text" 
                      placeholder="Título"
                      value={name}
                      onChange={e => setName(e.target.value)}
                    />
                    <InputBase 
                      className="name"
                      type="text" 
                      placeholder="Recompensa"
                      value={recompensa}
                      onChange={e => setRecompensa(e.target.value)}
                    />
                    <InputBase 
                      className="description"
                      type="text" 
                      placeholder="Descrição"
                      value={description}
                      onChange={e => setDescription(e.target.value)}
                    />
                    <div className="select">
                      <label className={classes.textLabel}>Tipo de tarefa:</label>
                      <select value={persona} onChange={e=>setPersona(e.target.value)} className={classes.select}>
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
                      <label className={classes.textLabel}>Dificuldade:</label>
                      <select value={dificult} className={classes.difficult} onChange={(e) => {
                        setDificult(e.target.value)
                      }}>
                        <option value="None">none</option>
                        <option value="Very Easy">very easy</option>
                        <option value="Easy">easy</option>
                        <option value="Medium">medium</option>
                        <option value="Hard">hard</option>
                        <option value="Expert">expert</option>
                      </select>
                      </div>
                <div className="btnForm">
                    <DialogActions>
                      <Button onClick={handleClose} color={color}>
                        Voltar
                      </Button>
                    </DialogActions>
                    <Button  type="submit" color={color} className={classes.btnNew} autoFocus>
                      New
                    </Button>                    
                </div>
            </form> 
          </div>
        </DialogContent>
        
      </Dialog>
    </Box>
   
    </Container>
  );
}