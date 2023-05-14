
const ResultScreen = ({ score, totalTime,questions}) => {
  return (
    <div>
      <h1>Quiz Result Screen</h1>
      <p>Percentage Score: {((score / questions.list.length) * 100).toFixed(2)}%</p>
      <p>Score: {score} out of {questions.list.length}</p>
      <p>Total Time Taken: {totalTime} seconds</p>
      {/* <button onClick={handleRestartQuiz}>Restart Quiz</button> */}
    </div>
  );
};
export default ResultScreen;

// if the total time is greater than 60 secs than display the time in mins and secs ?


