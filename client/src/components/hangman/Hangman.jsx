import React, { useState } from "react";


const words = ["REACT", "JAVASCRIPT", "BOOTSTRAP", "HANGMAN", "RESPONSIVE"];
const getRandomWord = () => words[Math.floor(Math.random() * words.length)];

export function Hangman() {
  const [word, setWord] = useState(getRandomWord());
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const maxWrong = 6;

  const handleGuess = (letter) => {
    if (guessedLetters.includes(letter)) return;

    setGuessedLetters([...guessedLetters, letter]);
    if (!word.includes(letter)) setWrongGuesses(wrongGuesses + 1);
  };

  const renderWord = () =>
    word.split("").map((letter, index) => (
      <span key={index} className="mx-1 display-6 text-warning">
        {guessedLetters.includes(letter) ? letter : "_"}
      </span>
    ));

  const renderAlphabetButtons = () => {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    return alphabet.map((letter) => (
      <button
        key={letter}
        className="btn btn-outline-warning m-1"
        onClick={() => handleGuess(letter)}
        disabled={guessedLetters.includes(letter) || wrongGuesses >= maxWrong}
      >
        {letter}
      </button>
    ));
  };

  const resetGame = () => {
    setWord(getRandomWord());
    setGuessedLetters([]);
    setWrongGuesses(0);
  };

  const isGameOver = wrongGuesses >= maxWrong;
  const isWinner = word.split("").every((letter) => guessedLetters.includes(letter));

  return (
    <div className="hangman-game text-center p-4">
      <h1 className="text-warning mb-4">Hangman Žaidimas</h1>

      <div className="hangman-frame mb-3">
        <div className={`gallows`}></div>
        <div className={`head ${wrongGuesses > 0 ? "show" : ""} bg-warning`}></div>
        <div className={`body ${wrongGuesses > 1 ? "show" : ""} bg-warning`}></div>
        <div className={`left-arm ${wrongGuesses > 2 ? "show" : ""} bg-warning`}></div>
        <div className={`right-arm ${wrongGuesses > 3 ? "show" : ""} bg-warning`}></div>
        <div className={`left-leg ${wrongGuesses > 4 ? "show" : ""} bg-warning`}></div>
        <div className={`right-leg ${wrongGuesses > 5 ? "show" : ""} bg-warning`}></div>
      </div>

      <div className="word mb-3">{renderWord()}</div>
      <div className="alphabet mb-3">{renderAlphabetButtons()}</div>

      <div className="status mb-3">
        {isGameOver && <p className="text-danger">Pralaimėjai! Žodis buvo: {word}</p>}
        {isWinner && <p className="text-success">Laimėjai! 🎉</p>}
      </div>

      {(isGameOver || isWinner) && (
        <button className="btn btn-success" onClick={resetGame}>
          Pradėti iš naujo
        </button>
      )}
    </div>
  );
}
