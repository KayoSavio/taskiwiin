import React, {useState} from 'react';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Box, Button, Dialog, Container, IconButton} from '@material-ui/core';
import {AiTwotoneTrophy } from 'react-icons/ai';
import green from '@material-ui/core/colors/green';
import { makeStyles } from '@material-ui/core/styles';

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
}));
export default function ClainDialog() {
  const classes = useStyles();
  const style ={
    color : 'white',
    backgroundColor: 'green',
  }
  const color = green['#69f0ae'];
  const [open, setOpen] = useState(false);
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <Container className={classes.container}>
    <Box className={classes.box}>
      <IconButton style={style}  onClick={handleClickOpen} className={classes.btn}>
      <AiTwotoneTrophy display="flex" size={24} color="#fff"/>
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Recompensas"}</DialogTitle>
        <DialogContent className="dialogClain">
        <p>Meta Diária</p>

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