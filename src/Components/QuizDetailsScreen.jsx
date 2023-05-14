import PropTypes from 'prop-types';

const DetailScreen = ({ startQuiz }) => {
  return (
    <div>
      <h1>Quiz Detail Screen</h1>
      <p>Information about the quiz goes here.</p>
      <button onClick={startQuiz}>Start Quiz</button>
    </div>
  );
};

DetailScreen.propTypes = {
  startQuiz: PropTypes.func.isRequired,
};


export default DetailScreen;
