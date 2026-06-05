import { type CoursePart } from "../types";
import Part from "./Part";

const Content = ({ parts }: { parts: CoursePart[] }) => {
  return (
    <>
      {parts.map((part, index) => (
        <Part part={part} key={index} />
      ))}
    </>
  );
};

export default Content;
