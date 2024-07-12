import React, { useState, useEffect } from 'react';
import Slider from 'rc-slider';
import './App.css'
import 'rc-slider/assets/index.css';
import song1 from './assets/start.wav'
import song2 from './assets/break.wav'
import  addNotifications  from 'react-push-notification';


function CountdownTimer() {
  // const [selectedDuration, setSelectedDuration] = useState(25);
  const [remainingSeconds, setRemainingSeconds] = useState(25* 60); // 20 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [isWork,setIsWork]=useState(true)
  const [counter,setCounter]=useState(0)
  const [resetV,setResetV]=useState(false)
  const [breakTaken,setBreakTaken]=useState(0)
  const [isVisible, setIsVisible] = useState(false);
  let songstart = new Audio(song1);
  let songbreak = new Audio(song2);

  const buttonClick = () => {
    addNotifications({
        title: 'Pomodoro Timer',
        subtitle: 'Attention!',
        message: 'You may take a break now',
        theme: 'darkblue',
        native: true // when using native, your OS will handle theming.
    });
};

const buttonClick2 = () => {
  addNotifications({
      title: 'Pomodoro Timer',
      subtitle: 'Attention!',
      message: 'Break is over, get going',
      theme: 'darkblue',
      native: true // when using native, your OS will handle theming.
  });
};

  const handleStart = () => {
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
  };
  
 
  useEffect(() => {
    let intervalId;
    if (isRunning) {
      intervalId = setInterval(() => {
        setRemainingSeconds(prevSeconds => Math.max(0, prevSeconds - 1));
      }, 1000);
    } else if (intervalId) {
      clearInterval(intervalId);
    }


    

    

    return () => clearInterval(intervalId); 
  }, [isRunning]);

  const formatTime = (seconds) => {
    
    const minutes1 = Math.floor(seconds / 60);
    const remainingSeconds1 = seconds % 60;
    const m=minutes1.toString().padStart(2, '0')
    const s=remainingSeconds1.toString().padStart(2, '0')
    if(seconds===0&&isWork===true){
      buttonClick()
      songbreak.play()
      setRemainingSeconds(10*60)
      setIsWork(false)
      setCounter(counter+1)
      console.log(isWork)
     }
     else if(seconds===0&&isWork===false){
      buttonClick2()
      songstart.play()
      setRemainingSeconds(25*60)
      setIsWork(true)
      setBreakTaken(breakTaken+1)
      
      console.log(remainingSeconds)
     }
    

    return `${m}:${s}`;
    
  };

  const reset = ()=>{
    setResetV(!resetV)
    setRemainingSeconds(25*60)
    setIsRunning(false)
    setCounter(0)
    setBreakTaken(0)
    formatTime();
    setIsVisible(false)
     

  }

  // const handleDurationChange = (value) => {
  //   setSelectedDuration(value);
  //   setRemainingSeconds(value * 60); // Update timer based on selected duration
  // };

  const handleButtonClick = () => {
    setIsVisible(true);
  };




  return (
    <>
    <div className='container'>
      <div className='card'>
        <div className='cont'>
      <div className='Timer'><div className='h2'><h2>{formatTime(remainingSeconds)}</h2></div>
      </div>
      <div className="buttons">
      <button onClick={isRunning ? handleStop : handleStart}>
        {isRunning ? 'Stop' : 'Start'}
      </button>
      <button onClick={reset}>Reset</button>
      <div className='sl'>
      <div className='slider'>
      <Slider value={remainingSeconds} reverse={true} max={isWork?(25*60):(10*60)} min={0}/>
      </div>
    
      </div>
      </div>
      </div>
      </div>
      <div className='clk'   onClick={handleButtonClick}
        style={{ display: isVisible ? 'none' : 'block' }}><button>Details</button></div>
    
      <div className='ff'    onClick={handleButtonClick}
        style={{ display: isVisible ? 'block' :' none' }}>
          <h4 className='Comp-text'>Tasks Completed : <span>{counter}</span></h4>
      <h4 className='Comp-text'>Breaks Taken : <span>{breakTaken}</span></h4>
      </div>
      {/* <div className="duration-selector">
                <label htmlFor="duration">Duration:</label>
                <select id="duration" value={selectedDuration} onChange={(e) => handleDurationChange(e.target.value)}>
                  <option value={1}>25 Min (Pomodoro)</option>
                  <option value={0.9}>10 Min</option>
                  <option value={0.10}>5 Min</option>
                </select>
              </div> */}
    </div>
    </>
    
  );
}

export default CountdownTimer;
