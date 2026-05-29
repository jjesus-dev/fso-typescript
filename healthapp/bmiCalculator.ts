import isNotNumber from "./utils.ts";

interface BodyValues {
  height: number;
  weight: number;
}

const parseArguments = (args: string[]): BodyValues => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 7) throw new Error("Too many arguments");

  if (isNotNumber(args[2]) || isNotNumber(args[3]))
    throw new Error(`Entered values are not numbers!`);
  else {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  }
};

const calculateBmi = (h: number, w: number): string => {
  // converting cm to m
  const cmH = h / 100;
  const bmi = w / (cmH * cmH);

  let result: string;

  if (bmi < 16) result = "Underweight (Severe thinness)";
  else if (bmi >= 16 && bmi < 17.0) result = "Underweight (Moderate thinness)";
  else if (bmi >= 17 && bmi < 18.5) result = "Underweight (Mild thinness)";
  else if (bmi >= 18.5 && bmi < 25) result = "Normal range";
  else if (bmi >= 25 && bmi < 30) result = "Overweight (Pre-obese)";
  else if (bmi >= 30 && bmi < 35) result = "Obese (Class I)";
  else if (bmi >= 35 && bmi < 40) result = "Obese (Class II)";
  else if (bmi >= 40) result = "Obese (Class III)";
  else throw new Error(`Can't calculate your BMI!`);

  return result;
};

// Don't run if module is imported
if (process.argv[1] === import.meta.filename) {
  try {
    const { height, weight } = parseArguments(process.argv);
    console.log(calculateBmi(height, weight));
  } catch (error: unknown) {
    let errorMessage = "Something went wrong: ";
    if (error instanceof Error) {
      errorMessage += error.message;
    }
    console.log(errorMessage);
  }
}

export default calculateBmi;
