interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface values {
  target: number;
  days: number[];
}

import { isNotNumber } from "./utils/validator.ts";

const parseArguments = (args: string[]): values => {
  if (args.length < 4) throw new Error("Not enough arguments");

  const input = args.slice(2).map(Number);

  if (input.some(isNotNumber)) {
    throw new Error("One of the values provided is not a number");
  } else {
    const target: number = input[0];
    const days: number[] = input.slice(1);
    return {
      target,
      days,
    };
  }
};

export const calculateExercises = (days: number[], target: number): Result => {
  const periodLength = days.length;

  let trainingDays = 0;

  days.forEach((day) => {
    if (day) {
      trainingDays += 1;
    }
  });

  const workedHours = days.reduce((a, b) => a + b, 0);

  const average = workedHours / periodLength;

  const success = average >= target ? true : false;

  const rating = average < target - 1 ? 1 : average < target ? 2 : 3;

  const ratingDescription =
    rating === 1
      ? "Bad"
      : rating === 2
        ? "not too bad but could be better"
        : "Excelent";

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};


if (process.argv[1] === import.meta.filename) {
  const { days, target } = parseArguments(process.argv);
  console.log(calculateExercises(days, target));
}