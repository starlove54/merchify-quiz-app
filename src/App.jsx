import { useState } from 'react';
import QuizDetailScreen from './Components/QuizDetailsScreen';
import QuizAttemptScreen from './Components/QuizAttemptScreen';
import QuizResultScreen from './Components/QuizResultScreen';

const QuizRulesScreen = ({ startQuiz }) => {
  const handleStartQuiz = () => {
    startQuiz();
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white p-4 flex flex-col items-center">
      <h2 className="text-xl font-bold mb-4">Quiz Rules</h2>
      <p className="mb-4">Rules about the quiz go here.</p>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleStartQuiz}>
        Start
      </button>
    </div>
  );
};

const App = () => {
  const [currentScreen, setCurrentScreen] = useState('detail');
  const [questions, setQuestions] = useState({
    currentIndex: 0,
    list: [
      {
        question: 'What is the largest organ in the human body?',
        options:  ['Liver', 'Heart', 'Skin', 'Lungs'],
        answer:  'Skin',
      },
      {
        question: 'Which of the following is responsible for carrying oxygen in the blood?',
        options: ['Platelets', 'White blood cells', 'Red blood cells', 'Plasma'],
        answer: 'Red blood cells',
      },{
        question: 'What is the powerhouse of the cell?',
        options: ['Mitochondria', 'Nucleus', 'Endoplasmic reticulum', 'Golgi apparatus'],
        answer: 'Mitochondria',
      },{
        question: 'Which of the following is the primary function of the pancreas?',
        options: ['Production of insulin', 'Filtering blood', 'Digestion of proteins', 'Production of bile'],
        answer: 'Production of insulin',
      },{
        question: 'What is the process by which plants convert sunlight into energy?',
        options:  ['Photosynthesis', 'Respiration', 'Transpiration', 'Fermentation'],
        answer: 'Photosynthesis',
      }
      // Add more questions as needed
    ],
  });
  const [score, setScore] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [currentQuestionTime, setCurrentQuestionTime] = useState(0);


  const startQuiz = () => {
    setCurrentScreen('rules');
  };

  const submitAnswer = (selectedAnswer) => {
    // Check if the selected answer is correct and update the score accordingly
    // You can implement your own logic here based on the correct answer for each question
    const currentQuestion = questions.list[questions.currentIndex];
    const isCorrect = selectedAnswer === currentQuestion.answer;
    
    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }
    setCurrentQuestionTime(0); // Reset the current question time

  };

  const nextQuestion = (timeLeft, index) => {

  if (index >= 0 && index < questions.list.length) {
    const question = questions.list[index];
    const questionTimeTaken = 60 - timeLeft; // Calculate the time taken for the current question
    const newTotalTime = totalTime + questionTimeTaken; // Add the time taken to the totalTime

    // Update the current question and options
    setQuestions((prevQuestions) => ({
      ...prevQuestions,
      currentIndex: index,
      currentQuestion: question.question,
      currentOptions: question.options,
    }));
    setSelectedAnswer(''); // Reset the selected answer
    setCurrentQuestionTime(0); // Reset the current question time
    setTotalTime(newTotalTime); // Update the totalTime state
  } else {
    // Quiz is completed, show the result screen
    setCurrentScreen('result');
  }
  };

  // const handleRestartQuiz = () => {
  //   setCurrentScreen('detail');
  //   setQuestions({
  //     currentIndex: 0,
  //     currentQuestion: 'Question 1',
  //     currentOptions: ['Option A', 'Option B', 'Option C', 'Option D'],
  //   });
  //   setScore(0);
  //   setTotalTime(0);
  //   setCurrentQuestionTime(0);
  //   setSelectedAnswer('');
  // };
  const renderScreen = () => {
    switch (currentScreen) {
      case 'detail':
        return <QuizDetailScreen startQuiz={startQuiz} />;
      case 'rules':
        return <QuizRulesScreen startQuiz={() => setCurrentScreen('attempt')} />;
      case 'attempt':
        return (
          <QuizAttemptScreen
            questions={questions}
            selectedAnswer={selectedAnswer}
            setSelectedAnswer={setSelectedAnswer}
            submitAnswer={submitAnswer}
            nextQuestion={nextQuestion}
            currentQuestionTime={currentQuestionTime} // Pass currentQuestionTime as a prop

          />
        );
      case 'result':
        return (
          <QuizResultScreen
            score={score}
            totalTime={totalTime}
            // handleRestartQuiz={handleRestartQuiz}
            questions={questions}
          />
        );
      default:
        return null;
    }
  };
  return <div>{renderScreen()}</div>;
};

export default App;
