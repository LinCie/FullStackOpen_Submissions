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

export default Course;
