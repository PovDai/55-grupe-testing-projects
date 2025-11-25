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
      <span key={index} className="mx-1 display-6">
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
    <div className="container text-center mt-5">
      <h1 className="mb-4">Hangman Žaidimas</h1>

      <div className="hangman-container mb-3">
        <div className={`gallows`}></div>
        <div className={`head ${wrongGuesses > 0 ? "show" : ""}`}></div>
        <div className={`body ${wrongGuesses > 1 ? "show" : ""}`}></div>
        <div className={`left-arm ${wrongGuesses > 2 ? "show" : ""}`}></div>
        <div className={`right-arm ${wrongGuesses > 3 ? "show" : ""}`}></div>
        <div className={`left-leg ${wrongGuesses > 4 ? "show" : ""}`}></div>
        <div className={`right-leg ${wrongGuesses > 5 ? "show" : ""}`}></div>
      </div>

      <div className="mb-3">{renderWord()}</div>
      <div className="mb-3">{renderAlphabetButtons()}</div>
      <div className="mb-3">
        <p>Klaidos: {wrongGuesses} / {maxWrong}</p>
      </div>

      {isGameOver && <h3 className="text-danger">Pralaimėjai! Žodis buvo: {word}</h3>}
      {isWinner && <h3 className="text-success">Laimėjai! 🎉</h3>}

      {(isGameOver || isWinner) && (
        <button className="btn btn-success mt-3" onClick={resetGame}>
          Pradėti iš naujo
        </button>
      )}
    </div>
  );
}
