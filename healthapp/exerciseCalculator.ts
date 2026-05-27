import isNotNumber from "./utils.ts";

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const parseNumbers = (args: string[]): number[] => {
  if (args.length < 3) throw new Error("Not enough arguments");

  let routineValues: number[] = [];

  // Omit function name & start from the actual arguments
  for (let i = 2; i < args.length; i++) {
    if (!isNotNumber(args[i])) {
      routineValues.push(Number(args[i]));
    } else {
      throw new Error("Provided values were not numbers!");
    }
  }

  return routineValues;
};

const calculateExercises = (args: number[]) => {
  // Separating target & routine arguments
  const exercises = [...args];
  const targetHours = exercises.shift() ?? 0;

  const periodLength = exercises.length;
  const trainingDays = exercises.filter((d) => d > 0).length;
  let totalHours = 0;
  let rating = 1;
  let ratingDescription = "";

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

  const resultObject = {
    periodLength: periodLength,
    trainingDays: trainingDays,
    success: success,
    rating: rating,
    ratingDescription: ratingDescription,
    target: targetHours,
    average: totalHours / periodLength,
  };

  console.log(resultObject);
};

try {
  const exercises = parseNumbers(process.argv);
  calculateExercises(exercises);
} catch (error: unknown) {
  let errorMessage = "Something went wrong: ";
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}
