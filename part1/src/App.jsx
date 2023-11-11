import { useState } from "react";

const Button = (props) => {
  return <button onClick={props.onClick}>{props.text}</button>;
};

const Statistic = (props) => {
  return (
    <div>
      <p>Good {props.reviews.good}</p>
      <p>Neutral {props.reviews.neutral}</p>
      <p>Bad {props.reviews.bad}</p>
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
