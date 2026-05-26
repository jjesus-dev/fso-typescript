const calculateBmi = (h: number, w: number) => {
  // converting cm to m
  const cmH = h / 100;
  const bmi = w / (cmH * cmH);

  if (bmi < 16) return "Underweight (Severe thinness)";
  else if (bmi >= 16 && bmi < 17.0) return "Underweight (Moderate thinness)";
  else if (bmi >= 17 && bmi < 18.5) return "Underweight (Mild thinness)";
  else if (bmi >= 18.5 && bmi < 25) return "Normal range";
  else if (bmi >= 25 && bmi < 30) return "Overweight (Pre-obese)";
  else if (bmi >= 30 && bmi < 35) return "Obese (Class I)";
  else if (bmi >= 35 && bmi < 40) return "Obese (Class II)";
  else if (bmi >= 40) return "Obese (Class III)";
  else throw new Error(`Can't calculate your BMI!`);
};

try {
  console.log(calculateBmi(180, 74));
} catch (error: unknown) {
  let errorMessage = "Something went wrong: ";
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}
