import Header from "./components/Header";
import Content from "./components/Content";
import Total from "./components/Total";
import { courseParts } from "./types";

const App = () => {
  const courseName = "Half Stack application development";

  const totalExercises = courseParts.reduce(
    (sum, part) => sum + part.exerciseCount,
    0,
  );

  return (
    <>
      <Header name={courseName} />
      <Content parts={courseParts} />
      <Total count={totalExercises} />
    </>
  );
};

export default App;
