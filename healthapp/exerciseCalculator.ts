interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const parseNumbers = (values: number[]): number[] => {
  if (values.length < 7) throw new Error("Not enough arguments");
  if (values.length > 7) throw new Error("Too many arguments");

  let weekValues: number[] = [];

  values.forEach((value) => {
    if (!isNaN(Number(value))) {
      weekValues.push(value);
    } else {
      throw new Error("Provided values were not numbers!");
    }
  });

  return weekValues;
};

const calculateExercises = (
  exercises: number[],
  targetHours: number,
): Result => {
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

  return {
    periodLength: periodLength,
    trainingDays: trainingDays,
    success: success,
    rating: rating,
    ratingDescription: ratingDescription,
    target: targetHours,
    average: totalHours / periodLength,
  };
};

try {
  const week1Exercises = parseNumbers([3, 0, 2, 4.5, 0, 3, 1]);
  const week2Exercises = parseNumbers([3, 2, 2, 2, 1, 3, 1]);
  const week3Exercises = parseNumbers([3, 0, 2, 2, 3, 3, 3]);
  console.log(calculateExercises(week1Exercises, 2));
  console.log(calculateExercises(week2Exercises, 2));
  console.log(calculateExercises(week3Exercises, 2));
} catch (error: unknown) {
  let errorMessage = "Something went wrong: ";
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}
