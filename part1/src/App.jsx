import { useState } from "react";

// Exercise 1.10 note. Button has been previously refactored
const Button = (props) => {
  return <button onClick={props.onClick}>{props.text}</button>;
};

const StatisticLine = (props) => {
  const { text, value } = props;
  return (
    <p>
      {text} {value}
    </p>
  );
};

// Exercise 1.8 note. Statistic has been previously refactored
const Statistic = (props) => {
  const { reviews } = props;

  const all = reviews.good + reviews.neutral + reviews.bad;
  const average = (reviews.good + reviews.bad * -1) / all;
  const positive = (reviews.good / all) * 100;

  if (all === 0) {
    return <div>No feedback given.</div>;
  }

  return (
    <div>
      <StatisticLine text="Good" value={reviews.good} />
      <StatisticLine text="Neutral" value={reviews.neutral} />
      <StatisticLine text="Bad" value={reviews.bad} />
      <StatisticLine text="All" value={all} />
      <StatisticLine text="Average" value={average} />
      <StatisticLine text="Positive" value={positive} />
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
