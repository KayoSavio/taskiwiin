import React, {useState, useEffect} from 'react';
import {Box} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import coin from '../../../assets/coin.svg'
import api from '../../../services/api';

const useStyles = makeStyles((theme) => ({
  coin:{
    width: '24px',
    height: '24px',
    marginLeft: '2px',
  },
  li:{
    backgroundColor:'green',
    color:'white',
    boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.25)',
    borderRadius: '10px',
    marginRight: '30px',
    marginBottom: '15px',
  },
  tags:{
    display:'flex',
    marginLeft:'15px',
    marginTop: '5px',
    flexDirection:'row',
    justifyContent:'space-between',
  },
  pos:{
    marginRight:'20px',
    marginTop:'5px',
    fontSize:'40px',
  },
  title:{
    fontSize:'24px',
  }
}))
export default function Rank(){
  const classes = useStyles();
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState([]);
  const [user1,setUser1]=useState([]);
  const [user2,setUser2]=useState([]);
  const [user3,setUser3]=useState([]);
  const [user4,setUser4]=useState([]);
  const [user5,setUser5]=useState([]);
  const [user6,setUser6]=useState([]);
  const [user7,setUser7]=useState([]);
  const [self,setSelf]=useState([]);

  useEffect(() => {
    api.get('/register')
     .then(res => {
       setUsers(res.data);
     });
    }, [users]);

    useEffect(() => {
      const id = localStorage.getItem('id');
      api.get(`/register/${id}`)
       .then(res => {
         setUser(res.data);
       });
      }, [user]);

    useEffect(() => {
    const userId = users.map((user) => {
      return user._id;
    });
    const id = localStorage.getItem('id');
    api.get(`/history/${userId[0]}`)
    .then(res => {
      setUser1(res.data);
    });
    api.get(`/history/${userId[1]}`)
    .then(res => {
      setUser2(res.data);
    });
    api.get(`/history/${userId[2]}`)
    .then(res => {
      setUser3(res.data);
    });
    api.get(`/history/${userId[3]}`)
    .then(res => {
      setUser4(res.data);
    });
    api.get(`/history/${userId[4]}`)
    .then(res => {
      setUser5(res.data);
    });
    api.get(`/history/${userId[5]}`)
    .then(res => {
      setUser6(res.data);
    });
    api.get(`/history/${userId[6]}`)
    .then(res => {
      setUser7(res.data);
    });
    api.get(`/history/${id}`)
    .then(res => {
      setSelf(res.data);
    });
    }, [users]);
  
    function pos(){
      if(self>=user1&&self>=user2&&self>=user3&&self>=user4&&self>=user5&&self>=user6&&self>=user7)
      return '1°';
      if(self>=user1&&self>=user2&&self>=user3&&self>=user4&&self>=user5&&self>=user6)
      return '2°';
      if(self>=user1&&self>=user2&&self>=user3&&self>=user4&&self>=user5)
      return '3°';
      if(self>=user1&&self>=user2&&self>=user3&&self>=user4)
      return '4°';
      if(self>=user1||self>=user2||self>=user3)
      return '5°';
      if(self<=user1&&self<=user2)
      return '6°';
      if(self<=user1)
      return '7°';
    }

  return(
    <Box className="Content">
      <h1  className="textTask">Ranking</h1>
      <ul className="list">
          <li key={user.id} className={classes.li}>
             <div className={classes.tags}>
              <div className={classes.nome}>
                <strong className={classes.title}>Nome:{user.name}</strong>
                <p>TaskCoin:{user.taskCoin}<img className={classes.coin} src={coin} alt="coin"/></p>
              </div>
              <div className={classes.pos}>
                <strong>{pos()}</strong>
              </div>
             </div>
           </li>
         {users.map(user=>(
           <li key={users._id}>
             <strong>Nome:{user.name}</strong>
             <div className={classes.tags}>
             <p>TaskCoin:{user.taskCoin}<img className={classes.coin} src={coin} alt="coin"/></p>
             </div>
           </li>
         ))}
       </ul>  
    </Box>
  )
}