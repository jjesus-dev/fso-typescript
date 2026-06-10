import { useEffect, useState } from "react";
import diaryService from "./services/diaryService";
import type { Diary } from "./types";
import Notification from "./components/Notifications";

const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [date, setDate] = useState<string>("");
  const [weather, setWeather] = useState<string>("sunny");
  const [visibility, setVisibility] = useState<string>("great");
  const [errorMessage, setErrorMessage] = useState(null);

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
        setDate("");
      })
      .catch((error) => {
        //console.log(error);
        setErrorMessage(error.data);

        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      });
  };

  return (
    <>
      <h2>Flight diaries app</h2>
      <Notification message={errorMessage} />

      <h2>Create new Diary</h2>
      <form onSubmit={diaryCreation}>
        <div>
          <label>Date:</label>
          <input
            type="date"
            min="2000-01-01"
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div>
          <label>Weather:</label>
          <input
            type="radio"
            name="weather"
            value="sunny"
            onChange={(e) => setWeather(e.target.value)}
            defaultChecked
          />
          Sunny
          <input
            type="radio"
            name="weather"
            value="rainy"
            onChange={(e) => setWeather(e.target.value)}
          />
          Rainy
          <input
            type="radio"
            name="weather"
            value="cloudy"
            onChange={(e) => setWeather(e.target.value)}
          />
          Cloudy
          <input
            type="radio"
            name="weather"
            value="stormy"
            onChange={(e) => setWeather(e.target.value)}
          />
          Stormy
          <input
            type="radio"
            name="weather"
            value="windy"
            onChange={(e) => setWeather(e.target.value)}
          />
          Windy
        </div>
        <div>
          <label>Visibility:</label>
          <input
            type="radio"
            name="visibility"
            onChange={(e) => setVisibility(e.target.value)}
            defaultChecked
          />
          Great
          <input
            type="radio"
            name="visibility"
            value="good"
            onChange={(e) => setVisibility(e.target.value)}
          />
          Good
          <input
            type="radio"
            name="visibility"
            value="ok"
            onChange={(e) => setVisibility(e.target.value)}
          />
          Ok
          <input
            type="radio"
            name="visibility"
            value="poor"
            onChange={(e) => setVisibility(e.target.value)}
          />
          Poor
        </div>
        <button type="submit">Create</button>
      </form>

      <h2>Diary entries:</h2>
      <div>
        {diaries?.map((d, index) => (
          <div key={index}>
            <h3>{d.date}</h3>
            <p>
              Weather: {d.weather} - Visibility: {d.visibility}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default App;
