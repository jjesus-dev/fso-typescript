import { parseNumbers } from "./utils.ts";

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (
  targetHours: number,
  exercises: number[],
): Result => {
  const periodLength = exercises.length;
  const trainingDays = exercises.filter((d) => d > 0).length;
  let totalHours = 0;
  let rating: number;
  let ratingDescription: string;

  exercises.forEach((v) => {
    totalHours += v;
  });

  const average = totalHours / periodLength;
  const success = average < targetHours ? false : true;

  if (average < targetHours) {
    rating = 1;
    ratingDescription = "Too bad, you need to train more!";
  } else if (average == targetHours) {
    rating = 2;
    ratingDescription = "Good, you are doing some work!";
  } else {
    rating = 3;
    ratingDescription = "Excelent, you are awesome!";
  }

  const resultObject: Result = {
    periodLength: periodLength,
    trainingDays: trainingDays,
    success: success,
    rating: rating,
    ratingDescription: ratingDescription,
    target: targetHours,
    average: totalHours / periodLength,
  };

  return resultObject;
};

// Don't run if module is imported
if (process.argv[1] === import.meta.filename) {
  try {
    // Separating target & routine arguments
    const exercises = parseNumbers(process.argv);
    const target = exercises.shift() ?? 0;

    console.log(calculateExercises(target, exercises));
  } catch (error: unknown) {
    let errorMessage = "Something went wrong: ";
    if (error instanceof Error) {
      errorMessage += error.message;
    }
    console.log(errorMessage);
  }
}

export default calculateExercises;
