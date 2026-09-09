import { useState } from 'react';
import Quiz from './data/quiz.json';
import './App.css'

function App() {
  const [gameStarted, setGameStarted] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);

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
      ) : (
        // --- Quiz Screen View ---
        <div className="quiz-screen">
          <h2>Question {currentQuestionIndex + 1} of {Quiz.length}</h2>
          <p>{Quiz[currentQuestionIndex].question}</p>

          {
            Quiz[currentQuestionIndex].choices.map((choice, index) => (
              <button
                key={index}
                className={`basic-style ${isCorrect === true ? 'right-answer' : 'wrong-answer'} `}
                onClick={() => {
                  if (currentQuestionIndex < Quiz.length - 1) {
                    if(Quiz[currentQuestionIndex].answer === choice) {
                      setScore(score + 1);
                      setIsCorrect(true);
                    } else {
                      setIsCorrect(false);
                    }
                  } else {
                    alert('Quiz Completed!');
                    setGameStarted(false);
                    setCurrentQuestionIndex(0);
                    setShowScore(true);
                  }
                }}
              >
                {choice}
              </button>
            ))



          }
          <button className="btn-style" onClick={() => { setGameStarted(false); setCurrentQuestionIndex(0); }}>
            Quit / Home
          </button>
        </div>
      )}
    </div>
  )
}

export default App