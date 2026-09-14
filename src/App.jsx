import { useState } from 'react';
import Quiz from './data/quiz.json';
import './App.css';

function App() {
  const [gameStarted, setGameStarted] = useState(false); // Fixed initial state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  
  // Track selected choice and answer status locally per question
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  const handleAnswerClick = (choice) => {
    const correctAnswer = Quiz[currentQuestionIndex].answer;
    const correct = choice === correctAnswer;

    setSelectedChoice(choice);
    setIsCorrect(correct);

    if (correct) {
      setScore(score + 1);
    }

    // Wait 1 second so the user sees the feedback, then move forward
    setTimeout(() => {
      const nextQuestion = currentQuestionIndex + 1;
      if (nextQuestion < Quiz.length) {
        setCurrentQuestionIndex(nextQuestion);
        setSelectedChoice(null);
        setIsCorrect(null);
      } else {
        setShowScore(true);
      }
    }, 1000);
  };

  const restartGame = () => {
    setGameStarted(false);
    setShowScore(false);
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedChoice(null);
    setIsCorrect(null);
  };

  return (
    <div className="App">
      {!gameStarted ? (
        // --- Start Screen View ---
        <div className="start-screen">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 60" width="400" height="200">
            <defs>
              <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#8B5CF6" />
                <stop offset="100%" stopColor="#38BDF8" />
              </linearGradient>
            </defs>
            <g transform="translate(12, 12)">
              <circle cx="18" cy="18" r="16" fill="none" stroke="url(#logoGrad)" strokeWidth="3.5" />
              <path d="M13 15h10M18 10v10" stroke="#38BDF8" strokeWidth="3" strokeLinecap="round" />
              <circle cx="18" cy="25" r="2" fill="#8B5CF6" />
            </g>
            <text x="56" y="37" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="800" fontSize="22" letterSpacing="-0.5">
              <tspan fill="#8B5CF6">Quiz</tspan><tspan fill="#38BDF8">Game</tspan>
            </text>
          </svg>

          <button className="btn-style" onClick={() => setGameStarted(true)}>
            Start Game
          </button>
        </div>
      ) : showScore ? (
        // --- Score Screen View ---
        <div className="score-screen">
          <h2>Quiz Completed!</h2>
          <p>Your Score: {score} out of {Quiz.length}</p>
          <button className="btn-style" onClick={restartGame}>
            Play Again
          </button>
        </div>
      ) : (
        // --- Quiz Screen View ---
        <div className="quiz-screen">
          <h2>Question {currentQuestionIndex + 1} of {Quiz.length}</h2>
          <p>{Quiz[currentQuestionIndex].question}</p>

          {Quiz[currentQuestionIndex].choices.map((choice, index) => {
            // Determine dynamic button styling based on selection
            let btnClass = "basic-style";
            if (selectedChoice !== null) {
              if (choice === Quiz[currentQuestionIndex].answer) {
                btnClass += " right-answer";
              } else if (choice === selectedChoice) {
                btnClass += " wrong-answer";
              }
            }

            return (
              <button
                key={index}
                className={btnClass}
                disabled={selectedChoice !== null} // Disable clicks during timeout
                onClick={() => handleAnswerClick(choice)}
              >
                {choice}
              </button>
            );
          })}

          <button className="btn-style" onClick={restartGame}>
            Quit / Home
          </button>
        </div>
      )}
    </div>
  );
}

export default App;