import { useState } from "react";

const Button = (props) => {
  const { text, onClick } = props;
  return <button onClick={onClick}>{text}</button>;
};

const Anecdote = (props) => {
  const { anecdote, votes } = props;
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdote}</p>
      <p>Votes {votes}</p>
    </div>
  );
};

const BestAnecdotes = (props) => {
  const { total, anecdote, votes } = props;
  return (
    <div>
      <h1>Anecdote with most votes</h1>
      {total ? (
        <>
          <p>{anecdote}</p>
          <p>Votes {votes}</p>
        </>
      ) : (
        <p>There is no vote</p>
      )}
    </div>
  );
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const randomAnecdote = () => Math.floor(Math.random() * anecdotes.length);

  const [selected, setSelected] = useState(randomAnecdote());
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));
  const [totalVotes, setTotalVotes] = useState(0);
  const [bestAnecdote, setBestAnecdote] = useState({
    index: 0,
    votes: 0,
  });

  const randomizeSelected = () => setSelected(randomAnecdote());
  const addVote = () => {
    const copy = [...votes];
    copy[selected] += 1;
    setVotes(copy);
    if (copy[selected] > bestAnecdote.votes) {
      setBestAnecdote({ index: selected, votes: copy[selected] });
    }
    setTotalVotes(totalVotes + 1);
  };

  return (
    <div>
      <Anecdote anecdote={anecdotes[selected]} votes={votes[selected]} />
      <Button onClick={addVote} text="Vote" />
      <Button onClick={randomizeSelected} text="Next Anecdote" />
      <BestAnecdotes
        total={totalVotes}
        anecdote={anecdotes[bestAnecdote.index]}
        votes={bestAnecdote.votes}
      />
    </div>
  );
};

export default App;
