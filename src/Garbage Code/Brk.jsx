// import { useState, useEffect } from 'react';
// function Brk() {
//     const [seconds, setSeconds] = useState(0);
//     const [minutes, setMinutes] = useState(0);
//     const [isRunning, setIsRunning] = useState(false); // Use a flag for timer state
  
//     useEffect(() => {
//       let intervalId;
      
//       if (isRunning) {
//         intervalId = setInterval(() => {
//           setSeconds((prevSeconds) => (prevSeconds + 1) % 60); // Efficiently update seconds
//           if (seconds === 59) {
//             if(minutes===1){
//               console.log("break");
//               setIsRunning(!isRunning)
//             }
//             else{
//               console.log("break");
//               setIsRunning(!isRunning)
//               setMinutes(minutes + 1);
    
//             }
//           }
      
//         }, 1000);
//       }
      
  
//       return () => clearInterval(intervalId);
//     }, [isRunning, seconds]); // Dependency array for useEffect
  
//     // const startTimer = () => {
//     //   setIsRunning(true);
//     // };
  
//     const stopTimer = () => {
//       setIsRunning(!isRunning);
//     };
  
//     return (
//       <>
//         <div className='container'>
//           <div className='timer'>{minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}</div> 
//           <div className='buttons'>
//             {/* <button disabled={isRunning} onClick={startTimer} className='start'>
//               Start
//             </button> */}
//             <button onClick={stopTimer} className='stop'>
//               {isRunning?'Stop':'Start'}
//             </button>
//           </div>
//         </div>
//       </>
//     );
//   }
  
//   export default Brk;
  