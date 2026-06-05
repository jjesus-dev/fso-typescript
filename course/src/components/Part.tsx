import { type CoursePart } from "../types";

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member ${JSON.stringify(value)}`,
  );
};

const Part = ({ part }: { part: CoursePart }) => {
  switch (part.kind) {
    case "basic":
      return (
        <div>
          <h3>
            {part.name} {part.exerciseCount}
          </h3>
          <p>
            <em>{part.description}</em>
          </p>
        </div>
      );
      break;
    case "background":
      return (
        <div>
          <h3>
            {part.name} {part.exerciseCount}
          </h3>
          <p>
            <em>{part.description}</em> <br /> submit to:{" "}
            {part.backgroundMaterial}
          </p>
        </div>
      );
      break;
    case "group":
      return (
        <div>
          <h3>
            {part.name} {part.exerciseCount}
          </h3>
          <p>Project exercises: {part.groupProjectCount}</p>
        </div>
      );
      break;
    case "special":
      return (
        <div>
          <h3>
            {part.name} {part.exerciseCount}
          </h3>
          <p>
            <em>{part.description}</em> <br /> Required skills:{" "}
            {part.requirements.join(", ")}
          </p>
        </div>
      );
      break;
    default:
      return assertNever(part);
  }
};

export default Part;
