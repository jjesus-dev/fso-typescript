import { useEffect, useState } from "react";
import diaryService from "./services/diaryService";
import type { Diary } from "./types";

const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [date, setDate] = useState<string>("");
  const [weather, setWeather] = useState<string>("");
  const [visibility, setVisibility] = useState<string>("");

  useEffect(() => {
    diaryService.getAll().then((initialDiaries) => setDiaries(initialDiaries));
    //  console.log(diaries);
  }, []);

  const diaryCreation = (e: React.SyntheticEvent) => {
    e.preventDefault();
    diaryService
      .create({ date: date, weather: weather, visibility: visibility })
      .then((returnedDiary) => {
        setDiaries(diaries.concat(returnedDiary));
      });
    setDate("");
    setWeather("");
    setVisibility("");
  };

  return (
    <>
      <h2>Flight diaries app</h2>

      <h2>Create new Diary</h2>
      <form onSubmit={diaryCreation}>
        <div>
          <label>Date:</label>
          <input
            type="text"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div>
          <label>Weather:</label>
          <input
            type="text"
            value={weather}
            onChange={(e) => setWeather(e.target.value)}
          />
        </div>
        <div>
          <label>Visibility:</label>
          <input
            type="text"
            value={visibility}
            onChange={(e) => setVisibility(e.target.value)}
          />
        </div>
        <button type="submit">Create</button>
      </form>

      <ul>
        {diaries?.map((d, index) => (
          <li key={index}>{d.date}</li>
        ))}
      </ul>
    </>
  );
};

export default App;
