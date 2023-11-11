import { useState } from "react";

const Button = (props) => {
  return <button onClick={props.onClick}>{props.text}</button>;
};

// Exercise 1.8 note. Statistic has been previously refactored
const Statistic = (props) => {
  const { reviews } = props;

  const all = reviews.good + reviews.neutral + reviews.bad;
  const average = (reviews.good + reviews.bad * -1) / all;
  const positive = (reviews.good / all) * 100;

  if (all === 0) {
    return <div>No feedback given.</div>
  }

  return (
    <div>
      <p>Good {reviews.good}</p>
      <p>Neutral {reviews.neutral}</p>
      <p>Bad {reviews.bad}</p>
      <p>All {all}</p>
      <p>Average {average ? average : 0}</p>
      <p>Positive {positive ? positive : 0}%</p>
    </div>
  );
};

const App = () => {
  const [reviews, setReviews] = useState({ good: 0, neutral: 0, bad: 0 });

  const handleClick = (review) => {
    switch (review) {
      case "good":
        setReviews({ ...reviews, good: reviews.good + 1 });
        break;
      case "neutral":
        setReviews({ ...reviews, neutral: reviews.neutral + 1 });
        break;
      case "bad":
        setReviews({ ...reviews, bad: reviews.bad + 1 });
        break;
      default:
        return;
    }
  };

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button onClick={() => handleClick("good")} text="good" />
      <Button onClick={() => handleClick("neutral")} text="neutral" />
      <Button onClick={() => handleClick("bad")} text="bad" />
      <h1>Statistics</h1>
      <Statistic reviews={reviews} />
    </div>
  );
};

export default App;
