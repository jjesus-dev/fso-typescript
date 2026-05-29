import express from "express";
import { isNotNumber, parseNumbers } from "./utils.ts";
import calculateBmi from "./bmiCalculator.ts";
import calculateExercises from "./exerciseCalculator.ts";
const app = express();
const PORT = 3000;
app.use(express.json());

app.set("query parser", "extended");

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  if (!req.query.height || !req.query.weight) {
    return res.status(400).json({ error: "malformatted parameters" });
  }

  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (isNotNumber(height) || isNotNumber(weight)) {
    return res.status(400).json({ error: "malformatted parameters" });
  }

  const bmi: string = calculateBmi(height, weight);

  return res.json({ height, weight, bmi });
});

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  let exercises: number[] = [];

  if (!daily_exercises || !target) {
    return res.status(400).json({ error: "parameters missing" });
  } else {
    if (isNotNumber(target)) {
      return res.status(400).json({ error: "malformatted parameters" });
    }

    try {
      exercises = parseNumbers(daily_exercises);
    } catch (error: unknown) {
      const errorMessage = "malformatted parameters";
      if (error instanceof Error) {
        return res.status(400).json({ error: errorMessage });
      }
    }
  }

  return res.json(calculateExercises(Number(target), exercises));
});

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
