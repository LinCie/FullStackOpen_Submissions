const Header = (props) => {
  return <h1>{props.course}</h1>;
};

const Content = (props) => {
  return (
    <>
      <p>
        {props.parts.part1} {props.exercises.exercises1}
      </p>
      <p>
        {props.parts.part2} {props.exercises.exercises2}
      </p>
      <p>
        {props.parts.part3} {props.exercises.exercises3}
      </p>
    </>
  );
};

const Footer = (props) => {
  const numberOfExercise =
    props.exercises.exercises1 +
    props.exercises.exercises2 +
    props.exercises.exercises3;

  return <p>Number of exercises {numberOfExercise}</p>;
};

const App = () => {
  const course = "Half Stack application development";
  const parts = {
    part1: "Fundamentals of React",
    part2: "Using props to pass data",
    part3: "State of a component",
  };
  const exercises = {
    exercises1: 10,
    exercises2: 7,
    exercises3: 14,
  };

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} exercises={exercises} />
      <Footer exercises={exercises} />
    </div>
  );
};

export default App;
