import express from "express";
import { calculateBmi } from "./bmiCalculator.ts";
import { isNotNumber } from "./utils/validator.ts";
import { calculateExercises } from "./exerciseCalculator.ts";

const app = express();

app.use(express.json());

app.get("/ping", (_req, res) => {
  res.send("pong");
});

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (!isNotNumber(height) && !isNotNumber(weight)) {
    const bmi = calculateBmi(height, weight);
    return res.status(200).json({
      weight,
      height,
      bmi,
    });
  } else {
    return res.status(400).json({ error: "malformatted parameters" });
  }
});


app.post("/exercises", (req, res) => {
   // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment 
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || !target) {
    return res.status(400).json({ error: "parameters missing" });
  }

  if (!Array.isArray(daily_exercises) || isNotNumber(target)) {
    return res.status(400).json({ error: "malformatted parameters" });
  }

  const exercises = daily_exercises.map((d) => Number(d));

  if (exercises.some((d) => isNotNumber(d))) {
    return res.status(400).json({ error: "malformatted parameters" });
  }

  const response = calculateExercises(exercises, Number(target));
  return res.send(response);
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
