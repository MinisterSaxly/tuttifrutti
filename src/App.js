import React, { useState } from 'react';
import categoriesData from './categories.json';

function App() {
  const [categories, setCategories] = useState([]);
  const [timer, setTimer] = useState(0);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [randomLetter, setRandomLetter] = useState('');

  const categoryList = categoriesData.categories;
  
  function startGame() {
    const randomCategories = [];
    while (randomCategories.length < 5) {
      const randomIndex = Math.floor(Math.random() * categoryList.length);
      if (!randomCategories.includes(categoryList[randomIndex])) {
        randomCategories.push(categoryList[randomIndex]);
      }
    }
    setCategories(randomCategories);

    // Generate random letter
    let randomLetter = '';
    const excludedLetters = ['x', 'q', 'y', 'z', 'w', 'c'];
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    while (excludedLetters.includes(randomLetter) || randomLetter === '') {
      randomLetter = alphabet[Math.floor(Math.random() * alphabet.length)];
    }
    setRandomLetter(randomLetter);

    // Start the timer
    setTimer(60);
    const countdown = setInterval(() => {
      setTimer((prevTime) => prevTime - 1);
    }, 1000);

    // End the game
    setTimeout(() => {
      clearInterval(countdown);
      calculateScore();
    }, 60000);
  }

  function handleAnswerChange(event) {
    const { name, value } = event.target;
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [name]: value,
    }));
  }

  function calculateScore() {
    let newScore = 0;
    for (const category of categories) {
      if (answers[category]) {
        newScore++;
      }
    }
    setScore(newScore);
  }

  return (
    <div className="container">
      <h1>Tutti Frutti Game</h1>
      {categories.length === 0 ? (
        <button onClick={startGame}>Start Game</button>
      ) : (
        <div>
          <div className="timer">
            <h2>Timer</h2>
            <div>{timer}</div>
          </div>
          <div className="random-letter">
            <h2>Random Letter</h2>
            <div>{randomLetter}</div>
          </div>
          <div className="categories">
            <h2>Categories</h2>
            <ul>
              {categories.map((category) => (
                <li key={category}>{category}</li>
              ))}
            </ul>
          </div>

          <div className="answers">
            <h2>Answers</h2>
            <form>
              {categories.map((category) => (
                <div className="answer" key={category}>
                  <label htmlFor={category}>{category}: </label>
                  <input type="text" id={category} name={category} onChange={handleAnswerChange} />
                </div>
              ))}
              <button type="submit" onClick={calculateScore}>Submit</button>
            </form>
          </div>
          <div className="score">
            <h2>Score</h2>
            <div>{score}</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
