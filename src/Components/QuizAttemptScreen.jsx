import { useState, useEffect } from 'react';

const AttemptScreen = ({ questions, selectedAnswer, setSelectedAnswer, submitAnswer, nextQuestion }) => {
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime === 1) {
          clearInterval(timer);
          nextQuestion(timeLeft,questions.currentIndex + 1);
          return 60; // Reset the timer to 60 seconds for the new question
        }
        return prevTime - 1;
      });
    }, 1000);
  
    return () => {
      clearInterval(timer);
    };
  }, [nextQuestion,timeLeft,questions]);
  

  const handleAnswerSelection = (event) => {
    setSelectedAnswer(event.target.value);
  };

  const handleNextQuestion = () => {
    submitAnswer(selectedAnswer);
    setSelectedAnswer('');
    nextQuestion(timeLeft,questions.currentIndex + 1);
    setTimeLeft(60); // Reset the timer to 60 seconds
  };

  
  // if (!questions || !questions.list || questions.list.length === 0) {
  //   // Handle case where there are no questions
  //   return <div>No questions available.</div>;
  // }

  const currentQuestion = questions.list[questions.currentIndex];

  return (
    <div>
      <h1>Quiz Attempt Screen</h1>
      <p>Timer: {timeLeft} seconds</p>
      <h3>Question {questions.currentIndex + 1}</h3>
      <p>{currentQuestion.question}</p>
      <form>
        {questions.list[questions.currentIndex].options.map((option, index) => (
          <div key={index}>
            <input
              type="radio"
              id={`option${index}`}
              name="answer"
              value={option}
              checked={selectedAnswer === option}
              onChange={handleAnswerSelection}
            />
            <label htmlFor={`option${index}`}>{option}</label>
          </div>
        ))}
      </form>
      <button onClick={handleNextQuestion}>Next</button>
    </div>
  );
};

export default AttemptScreen;
