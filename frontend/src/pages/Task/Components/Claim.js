import React, {useState, useEffect} from 'react';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Box, Button, Dialog, Container, IconButton, Input} from '@material-ui/core';
import {AiTwotoneTrophy } from 'react-icons/ai';
import green from '@material-ui/core/colors/green';
import { makeStyles } from '@material-ui/core/styles';
import coin from '../../../assets/coin.svg';
import api from '../../../services/api';
import crypto from 'crypto';
import '../style.css';
import { FiTrash2 } from 'react-icons/fi';

const useStyles = makeStyles((theme) => ({
  btn:{
    width: '48px',
    height: '48px',
    marginRight: '190px',
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
  coin:{
    marginLeft:'5px',
    marginTop:'3px',
    marginRight:'2px',
    width:'24px',
    heigth: '24px',
  },
  clain:{
    display:'flex',
    flexDirection:'row',
    width: '554px',
  },
  button:{
    color:'green',
    backgroundColor:'white',
    marginLeft: '10px',
    marginRight:'5px',
  },
  trash:{
    backgroundColor:'green',
    marginRight:'10px',
  },
  text:{
    marginLeft:'10px',
  },
  content:{
    display:'flex',
    justifyContent:'space-between',
    alignItems:'center',
  },
  reward:{
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
  },
  description:{
    width: '70%',
  },
  value:{
    width:'15%',
    marginLeft: '5px',
    marginRight: '5px',
  }
}));
export default function ClainDialog() {
  const [description,setDescription] = useState('');
  const [coinValue,setCoinValue] = useState('');
  const [claim,setClaim] = useState([]);

  useEffect(() => {
    const userName = localStorage.getItem('userName');
    api.get(`/clain/${userName}`)
     .then(res => {
       setClaim(res.data);
     });
    }, [claim]);

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

  async function addClaim(e){
    e.preventDefault();
    const userId = localStorage.getItem('id');
    const userName = localStorage.getItem('userName');
    const _id = crypto.randomBytes(10).toString('HEX');
    const claim ={
      _id,
      claimId:userId,
      user:userName,
      description,
      coinValue,
    };
   
    try{
      await api.post('/claim', claim);
      setDescription('');
      setCoinValue('');
    }catch(err){
      alert('Erro em criar nova claim');
    }
   }

   async function deleteReward(id){
    try{
      await api.delete(`claim/${id}`);
    }
    catch(err){
      alert('Erro em deletar task, tente novamente')
    }
   }

   async function claimValue(id){
    const res = await api.get(`claim/${id}`);
    return res.data.coinValue;
  }

   async function claimReward(id){
    const userId = localStorage.getItem('id');
    const res = await api.get(`register/${userId}`);
    const valor = await claimValue(id);
    if(res.data.taskCoin>=valor){
    const coins= res.data.taskCoin-valor;  
    const data={
      taskCoin:coins,
    };
   try{
     await api.delete(`claim/${id}`);
     const res = await api.put(`register/${userId}`,data);
     localStorage.setItem('coins',res.data.taskCoin);
  }
   catch(err){alert('Erro em resgatar recompensa, tente novamente')}
   }else{
     return alert('Não tem taskcoins suficientes!')
   }
   }

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
          <div className="newClain">
          <form onSubmit={addClaim} className="formClaim">
            <Input 
            placeholder="Nova Recompensa"  
            className={classes.description}
            type="text"    
            value={description}
            onChange={e => setDescription(e.target.value)}
            />

            <Input  
            placeholder="TaskCoin Valor"
            className={classes.value}
            type="number"    
            value={coinValue}
            onChange={e => setCoinValue(e.target.value)}
            />
          <Button  type="submit" style={{color:'white', backgroundColor:'green'}} className={classes.btnNew} autoFocus>
                      New
          </Button>   
          </form>
           
          </div>
        <div className={classes.claim}>
          <ul className="claimUl">
            {claim.map(reward=>(
            <li key={reward._id} className="claimLi">
              <div className={classes.content}>
                  <p className={classes.text}>{reward.description}:</p>
                  <div className={classes.reward}>
                    <img src={coin} className={classes.coin} alt="coin"/>
                    <strong className={classes.valor}>{reward.coinValue}</strong>
                    <Button size="small" variant="contained" className={classes.button} onClick={() => claimReward(reward._id)}>Claim</Button>
                    <IconButton size="small" variant="contained" className={classes.trash} onClick={() => deleteReward(reward._id)}>
                      <FiTrash2 display="inline-block" size={26} color="white"/>
                    </IconButton>
                  </div>
                </div>
            </li>
         ))}
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