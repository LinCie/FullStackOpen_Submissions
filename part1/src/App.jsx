const Header = (props) => {
  return <h1>{props.course}</h1>;
};

const Part = (props) => {
  return (
    <p>
      {props.part} {props.exercises}
    </p>
  );
};

const Content = (props) => {
  return (
    <>
      <Part part={props.parts.part1} exercises={props.exercises.exercises1} />
      <Part part={props.parts.part2} exercises={props.exercises.exercises2} />
      <Part part={props.parts.part3} exercises={props.exercises.exercises3} />
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
