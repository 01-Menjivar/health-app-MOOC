import { isNotNumber } from "./utils/validator.ts";

interface values {
  height: number;
  weight: number;
}

const parseArguments = (args: string[]): values => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  if (!isNotNumber(args[2]) && !isNotNumber(args[3])) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

export const calculateBmi = (height: number, weight: number) => {
  try {
    const bmi = 10000 * (weight / (height * height));
    if (bmi < 18) return "Underweight";
    if (bmi >= 18 && bmi < 25) return "Normal range";
    if (bmi >= 25 && bmi < 30) return "Overweight";
    return "Obesity";
  } catch (error: unknown) {
    let errorMessage = "something bad happened";
    if (error instanceof Error) {
      errorMessage += error.message;
    }
    return errorMessage;
  }
};

if (process.argv[1] === import.meta.filename) {
  const { height, weight } = parseArguments(process.argv);
  console.log(calculateBmi(height, weight));
}
