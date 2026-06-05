import { useEffect, useState } from "react";
import diaryService from "./services/diaryService";
import type { Diary } from "./types";

const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([]);

  useEffect(() => {
    diaryService.getAll().then((initialDiaries) => setDiaries(initialDiaries));
    //  console.log(diaries);
  }, []);

  return (
    <>
      <ul>
        {diaries?.map((d, index) => (
          <li key={index}>{d.date}</li>
        ))}
      </ul>
    </>
  );
};

export default App;
