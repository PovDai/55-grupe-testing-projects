import { useState, useEffect } from "react";


export function ReactionGame() {
  const [target, setTarget] = useState(null);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isRunning, setIsRunning] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(t => t - 1), 1000);
    } else if (timeLeft === 0 && isRunning) {
      endGame();
    }
    return () => clearTimeout(timer);
  }, [isRunning, timeLeft]);

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        setTarget({ x: Math.random() * 280, y: Math.random() * 380 });
      }, 700);
      return () => clearInterval(interval);
    }
  }, [isRunning]);

  const startGame = () => {
    setScore(0);
    setTimeLeft(30);
    setIsRunning(true);
    setGameOver(false);
  };

  const endGame = () => {
    setIsRunning(false);
    setTarget(null);
    setGameOver(true);
    if (score > highScore) setHighScore(score);
    const audio = new Audio('https://www.soundjay.com/buttons/sounds/beep-10.mp3');
    audio.play();
  };

  const handleHit = () => {
    if (!isRunning) return;
    setScore(s => s + 1);
    setTarget({ x: Math.random() * 280, y: Math.random() * 380 });
    const hitSound = new Audio('https://www.soundjay.com/button/sounds/button-3.mp3');
    hitSound.play();
  };

  return (
    <div className="reaction-game-container">
      <h1>Reakcijos Žaidimas</h1>
      <p>Taškai: {score} | High Score: {highScore}</p>
      <p>Laikas: {timeLeft}s</p>

      <div className="buttons-container">
        <button className="game-button" onClick={startGame}>Pradėti iš naujo</button>
        <button className="game-button" onClick={endGame}>Baigti žaidimą</button>
      </div>

      {gameOver && <div className="game-over">GAME OVER!</div>}

      <div className="game-area">
        {isRunning && target && (
          <div
            className="target"
            onClick={handleHit}
            style={{ left: target.x, top: target.y }}
          />
        )}
      </div>
    </div>
  );
}
