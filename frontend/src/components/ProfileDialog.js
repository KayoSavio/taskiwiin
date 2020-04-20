import React from 'react';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Box, Button, Dialog, Container, IconButton} from '@material-ui/core';
import {AccountCircleSharp } from '@material-ui/icons';
import green from '@material-ui/core/colors/green';
import { makeStyles } from '@material-ui/core/styles';
import homem from '../assets/Perfil.jpg';
import mulher from '../assets/perfilF.jpg';

const useStyles = makeStyles((theme) => ({
  btn:{
    width: '50px',
    height: '50px',
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
  },
  profile:{
    display: 'flex',
    flexDirection: 'row',
  },
  img:{
    marginTop: '30px',
    width: '213px',
    height: '213px',
    boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.25)',
    marginRight: '20px',
    borderRadius: '10px',
  },
  dialProfile:{
    width: '552px',
    height:'500px',
  },
}));
export default function ClainDialog() {
  const classes = useStyles();
  const style ={
    color : 'white',
  }
  const color = green['#69f0ae'];
  const [open, setOpen] = React.useState(false);
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //Profile
  const sexo = localStorage.getItem('sexo');
  const userName = localStorage.getItem('userName');
  function genero (){
  if(sexo==='Masculino')
  return homem;
  if(sexo==='Feminino')
  return mulher;
  }

  return (
    <Container className={classes.container}>
    <Box className={classes.box}>
      <IconButton style={style}  onClick={handleClickOpen} className={classes.btn}>
      <AccountCircleSharp display="flex" size={24} />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className={classes.dialog}
      >
        <DialogTitle id="alert-dialog-title">{"Perfil"}</DialogTitle>
        <DialogContent className={classes.dialProfile}>
          <div className={classes.profile}>
            <img src={genero()} className={classes.img} alt="img"/>
            <h1 className="titlePerfil">{userName}</h1>
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