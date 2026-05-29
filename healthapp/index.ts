import express from "express";
import isNotNumber from "./utils.ts";
import calculateBmi from "./bmiCalculator.ts";
const app = express();
const PORT = 3000;

app.set("query parser", "extended");

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  let bmi: string;

  if (isNotNumber(height) || isNotNumber(weight)) {
    res.json({ error: "malformatted parameters" });
  } else {
    bmi = calculateBmi(height, weight);

    res.json({ height, weight, bmi });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
