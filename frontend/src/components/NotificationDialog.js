import React from 'react';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Box, Button, Dialog, Container, IconButton} from '@material-ui/core';
import green from '@material-ui/core/colors/green';
import { makeStyles } from '@material-ui/core/styles';
import {Notifications, NotificationsActive} from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  btn:{
    width: '50px',
    height: '50px',
  },
  box:{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyItems:'center',
  },
  container:{
    display: 'flex',
    justifyContent: 'flex-end',
    padding: '0px',
    marginRight: '10px',
  },
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


  function buttonType(){
    if(open===true){
      return (<Notifications display="flex" size={24} />)
    }else{
      return(<NotificationsActive display="flex" size={24} style={{color:'#fff'}} />)
    }
  }

 
  return (
    <Container className={classes.container}>
    <Box className={classes.box}>
      <IconButton  onClick={handleClickOpen} className={classes.btn}>
        {buttonType()}
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Notificações"}</DialogTitle>
        <DialogContent className="dialogClain">
        <DialogContentText>Test</DialogContentText>
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