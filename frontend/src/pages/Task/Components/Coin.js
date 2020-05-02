import React from 'react';
import {Link} from 'react-router-dom';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Box, Button, Dialog, Container} from '@material-ui/core';
import green from '@material-ui/core/colors/green';
import { makeStyles } from '@material-ui/core/styles';
import coin from '../../../assets/coin.svg';
import kiwiCoin from '../../../assets/kiwiCoin.svg';

const useStyles = makeStyles((theme) => ({
  btn:{
    width: '48px',
    height: '48px',
    marginRight: '10px', 
    marginLeft: '5px',
    display:'flex',
    justifyContent:'center',
  },
  box:{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  container:{
    display: 'flex',
    padding: '0px',
    marginRight: '0px',
  },
  img:{
    width: '100%',
    height: '100%',
  },
  kiwiCoin:{
    width: '512px',
    height: '512px',
    marginLeft:'20px,'
  }
}));
export default function ClainDialog() {
  const classes = useStyles();
  
  const color = green['#69f0ae'];
  const [open, setOpen] = React.useState(false);
  
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

 
  return (
    <Container className={classes.container}>
    <Box className={classes.box}>
      <Link  onClick={handleClickOpen} className={classes.btn}>
        <img src={coin} alt="coin" className={classes.img}/>
      </Link>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" style={{color:'green'}}>{"Task Coin"}</DialogTitle>
        <DialogContent className="dialogClain">
          <img src={kiwiCoin} alt="kiwiCoin" className={classes.kiwiCoin}/>
        <DialogContentText>
          Task Coin é a forma de pagamento no app da Taskiwin, complete tarefas e ganhe coins!
          Quanto mais coins maior é o desconto na nossa loja!
        </DialogContentText>
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