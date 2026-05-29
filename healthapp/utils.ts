export const isNotNumber = (value: string | number): boolean => {
  if (isNaN(Number(value))) {
    return true;
  } else {
    return false;
  }
};

export const parseNumbers = (args: string[]): number[] => {
  if (args.length < 1) throw new Error("Not enough arguments");

  const routineValues: number[] = [];

  // Omit function name & start from the actual arguments
  for (let i = 0; i < args.length; i++) {
    if (!isNotNumber(args[i])) {
      routineValues.push(Number(args[i]));
    } else {
      throw new Error("Provided values were not numbers!");
    }
  }

  return routineValues;
};
