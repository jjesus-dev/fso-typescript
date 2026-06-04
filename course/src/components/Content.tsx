export interface CoursePart {
  name: string;
  exerciseCount: number;
}

const Content = ({ parts }: { parts: CoursePart[] }) => {
  return (
    <>
      {parts.map((part, index) => (
        <p key={index}>
          {part.name} {part.exerciseCount}
        </p>
      ))}
    </>
  );
};

export default Content;
