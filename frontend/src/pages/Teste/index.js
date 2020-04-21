import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {MobileStepper} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

const useStyles = makeStyles({
  root: {
    width: 1000,
    height:80,
    maxWidth: 400,
    flexGrow: 1,
    
  },
  div:{
    height:'1000px',
    display:'flex',
    justifyContent:'center',
    alignContent:'center',
    alignItems:'flex-end',
  }
});

export default function Teste() {
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div className={classes.div}>
    <MobileStepper
      variant="progress"
      steps={10}
      position="static"
      activeStep={activeStep}
      className={classes.root}
      nextButton={
        <Button size="small" onClick={handleNext} disabled={activeStep === 9}>
          Next
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </Button>
      }
      backButton={
        <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
          Back
        </Button>
      }
    />
    </div>
  );
}

// import React from 'react';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
// import DialogTitle from '@material-ui/core/DialogTitle';
// import {Box, Button, Dialog, Container} from '@material-ui/core';
// import homem from '../../assets/Perfil.jpg';
// import mulher from '../../assets/perfilF.jpg';
// import './style.css';
// import green from '@material-ui/core/colors/green';



// export default function AlertDialog() {
  
//   const style ={
//     color : 'white',
//     backgroundColor: 'green',
//   }
//   const color = green['#69f0ae'];
//   const [open, setOpen] = React.useState(false);
  
//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   return (
//     <Container>
//     <Box>
//       <Button style={style} variant="contained"  onClick={handleClickOpen}>
//         Perfil
//       </Button>
//       <Dialog
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="alert-dialog-title"
//         aria-describedby="alert-dialog-description"
//       >
//         <DialogTitle id="alert-dialog-title">{"Perfil"}</DialogTitle>
//         <DialogContent className="dialogContent">
//           <img src={homem} className="jedi" alt="jedi"/>
//           <button>Teste</button>
//           <DialogContentText id="alert-dialog-description">
//             Let Google help apps determine location. This means sending anonymous location data to
//             Google, even when no apps are running.
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose} color={color} autoFocus>
//             Voltar
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//     </Container>
//   );
// }

// import React, { useState, useEffect} from 'react';
// import { RadialBarChart, RadialBar, Legend } from 'recharts';



// export default function Time(){
    
//     const [seg, setSeg] = useState(0);
//     const [min, setMin] = useState(0);
//     const [hor, setHor] = useState(0);
  
//     const timer = () => {
//       if(hor>0&&seg>0||min>0&&seg>0||seg>0){
//         return setSeg(seg-1)
//       }
//       };

//     useEffect(() => {
//             if(seg==0&&min>0){
//               setMin(min-1)
//               setSeg(59)
//             }
//             if(min==0&&hor>0){
//               setHor(hor-1)
//               setMin(59)
//             }
//             const id = setInterval(timer, 1);
//             return () => clearInterval(id);
//         },
//         [seg]
//     );

    
//   return(
//     <div>
//       <button onClick={()=>setSeg(seg+1)}>Start</button>
//       <p>TIME:{hor}:{min}:{seg}</p>
//       <input type="time"onChange={(e) => {
//         setHor(e.target.value);
//         console.log(e.target.value)
//       }}></input>
//       <input onChange={(e) => {
//         setMin(e.target.value)
//       }}></input>
//       <input onChange={(e) => {
//         setSeg(e.target.value)
//       }}></input>
      
      
     
//     </div>
//   )
// }

