const ExerciseSum = (props) => {
  const { parts } = props;
  const sum = parts.reduce((a, b) => {
    return a + b.exercises;
  }, 0);

  return <li style={{ fontWeight: "700" }}>Total of {sum} exercises</li>;
};

const CourseItem = (props) => {
  const { courseItem } = props;

  return (
    <li>
      {courseItem.name} {courseItem.exercises}
    </li>
  );
};

const Course = (props) => {
  const { course } = props;

  return (
    <div>
      <h1>{course.name}</h1>
      <ul>
        {course.parts.map((courseItem) => (
          <CourseItem key={courseItem.id} courseItem={courseItem} />
        ))}
        <ExerciseSum parts={course.parts} />
      </ul>
    </div>
  );
};

const App = () => {
  const courses = [
    {
      name: "Half Stack application development",
      id: 1,
      parts: [
        {
          name: "Fundamentals of React",
          exercises: 10,
          id: 1,
        },
        {
          name: "Using props to pass data",
          exercises: 7,
          id: 2,
        },
        {
          name: "State of a component",
          exercises: 14,
          id: 3,
        },
        {
          name: "Redux",
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: "Node.js",
      id: 2,
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 1,
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];

  return (
    <div>
      {courses.map((course) => (
        <Course key={course.id} course={course} />
      ))}
    </div>
  );
};

export default App;
