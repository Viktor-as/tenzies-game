import React from 'react';
import './App.css';
import Die from './components/die';
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti'

function App() {

  const [diceArray, setDiceArray] = React.useState(allNewDice())

  function allNewDice() {
    const newDice = []
    for (let i = 0; i < 10; i++) {
      const randomNumber =  Math.ceil(Math.random() * 6); 
      newDice.push({
        value: randomNumber,
        isHeld: false,
        id: nanoid()
      })
    }
    return newDice
}

function rollNewDice() {
  setDiceArray(oldArr=> oldArr.map(ele=>{
    return ele.isHeld ? ele : {...ele, value: Math.ceil(Math.random() * 6) }
  }));
}

function holdDice(id) {
  setDiceArray(oldArr=>{
   return oldArr.map(ele=>{
      return ele.id === id ? {...ele, isHeld: !ele.isHeld} : ele
    })
  })
}

const [tenzies, setTenzies] = React.useState(false);

React.useEffect(()=>{
  const allAreHeld = diceArray.every(ele => ele.isHeld);
  const allSameValues = diceArray.every(ele => ele.value === diceArray[0].value);
  if(allAreHeld && allSameValues){
    setTenzies(true);
  }
  },[diceArray])

function newGame() {
  setTenzies(false);
  setDiceArray(allNewDice());
  setCounter(-1);
}

const [counter, setCounter] = React.useState(-1);

React.useEffect(()=>{
  setCounter((prev)=>{
    return prev + 1
  })
},[diceArray])

React.useEffect(()=>{
  function getBestTurnCount(){
    return JSON.parse(localStorage.getItem("Best turn count"));
  } 
  function setBestTurnCount(){
    localStorage.setItem("Best turn count", JSON.stringify(counter));
  } 
  let hasBestTurnCount = localStorage.hasOwnProperty("Best turn count");

if(hasBestTurnCount && counter < getBestTurnCount() && counter > -1){
  setBestTurnCount();
    setBestCount(getBestTurnCount());
    console.log('First ran');
}else if(hasBestTurnCount && getBestTurnCount()===0 && counter > -1){
  setBestTurnCount();
  setBestCount(getBestTurnCount());
  console.log('Second ran');
} else if(!hasBestTurnCount){
  localStorage.setItem("Best turn count", "0");
  console.log('Third ran');
}
},[tenzies])

const [bestCount, setBestCount] = React.useState(
  JSON.parse(localStorage.getItem("Best turn count")) || 0
)

return (
    <div className="app">
      <div className="app-container">
        <div className="tenzies-container">
          <h1 className="title">Tenzies</h1>
          <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
          <div className="best-counter-container">
            <span className="best-counter-text">Your best turn count is </span>
            <span className="best-counter">{bestCount}</span>
          </div>
          <div className="counter-container">
            <span className="counter-text">Your turn count is </span>
            <span className="counter">{counter}</span>
          </div>
          <div className="dies">
            {diceArray.map(ele=><Die value={ele.value} key={ele.id} id={ele.id} isHeld={ele.isHeld} handleClick={holdDice}/>)}            
          </div>  
          <button className="roll-btn" onClick={tenzies? newGame : rollNewDice} >{tenzies ? "New game" : "Roll"}</button>       
          {tenzies && <Confetti />}
        </div>
      </div>
    </div>
  );
}

export default App;