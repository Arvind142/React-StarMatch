import React, { useEffect, useState } from 'react';
import './index.css';
import * as ReactDOM from 'react-dom/client';
import StarDisplay from './StarDisplay';
import PlayAgain from './PlayAgain';
import ButtonDisplay from './ButtonDisplay';

const StarMatch = () => {
  const [secondsLeft, setSecondsLeft] = useState(20);
  const [stars, setStars] = useState(utils.random(1, 9));
  const [availableNums, setAvailableNums] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  const [candidateNums, setCandidateNums] = useState([]);
  const gameStatus = (availableNums.length === 0 ?'won':(secondsLeft === 0?'lost':'active'));

  useEffect(() => {
    if (secondsLeft > 0) {
      const timerID = setTimeout(() => {
        setSecondsLeft(secondsLeft - 1);
      }, 1000);
      return () => clearTimeout(timerID);
    }
    // when code is rendered
    // console.log('render called'); 
    // before render is called, return is executed n+1 cycle i.e. after code is executed once return is called to clenup previous render effect
    // return () => console.log('re-render is called') 
  })
  // to figureout if selected button is wrong or not
  const candidatesAreWrong = utils.sum(candidateNums) > stars;
  // to get status of number
  const numberStatus = (number) => {
    if (!availableNums.includes(number)) {
      return 'used';
    }
    if (candidateNums.includes(number)) {
      return candidatesAreWrong ? 'wrong' : 'candidate'
    }
    return 'available';
  }
  const onNumberClick = (number, status) => {
    if (status === 'used') {
      return;
    }
    const newCandidateNums = (status === 'available' ? candidateNums.concat(number) : candidateNums.filter(k => k !== number));
    if (utils.sum(newCandidateNums) !== stars) {
      setCandidateNums(newCandidateNums);
    }
    else {
      const newAvailableNums = availableNums.filter(k => !newCandidateNums.includes(k));
      setStars(utils.randomSumIn(newAvailableNums, 9));
      setAvailableNums(newAvailableNums);
      setCandidateNums([]);
    }
  }
  const resetGame = () => {
    setStars(utils.random(1, 9));
    setAvailableNums([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    setCandidateNums([])
    setSecondsLeft(20);
  }
  return (
    <div className="game">
      <div className="help">
        Pick 1 or more numbers that sum to the number of stars
      </div>
      <div className="body">
        <div className="left">
          {gameStatus!=='active' ? <PlayAgain resetMethod={resetGame} gameStatus={gameStatus} /> : <StarDisplay stars={stars} />}
        </div>
        <div className="right">
          {utils.range(1, 9).map(number =>
            <ButtonDisplay key={number} status={numberStatus(number)} number={number} onClick={onNumberClick} />
          )}
        </div>
      </div>
      {gameStatus==='active'?<div className="timer">Time Remaining: {secondsLeft}</div>:''}
    </div>
  );
};

// Color Theme
const colors = {
  available: 'lightgray',
  used: 'lightgreen',
  wrong: 'lightcoral',
  candidate: 'deepskyblue',
};

// Math science
const utils = {
  // Sum an array
  sum: arr => arr.reduce((acc, curr) => acc + curr, 0),

  // create an array of numbers between min and max (edges included)
  range: (min, max) => Array.from({ length: max - min + 1 }, (_, i) => min + i),

  // pick a random number between min and max (edges included)
  random: (min, max) => min + Math.floor(Math.random() * (max - min + 1)),

  // Given an array of numbers and a max...
  // Pick a random sum (< max) from the set of all available sums in arr
  randomSumIn: (arr, max) => {
    const sets = [[]];
    const sums = [];
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0, len = sets.length; j < len; j++) {
        const candidateSet = sets[j].concat(arr[i]);
        const candidateSum = utils.sum(candidateSet);
        if (candidateSum <= max) {
          sets.push(candidateSet);
          sums.push(candidateSum);
        }
      }
    }
    return sums[utils.random(0, sums.length - 1)];
  },
};


ReactDOM.createRoot(document.getElementById('root')).render(<StarMatch />);