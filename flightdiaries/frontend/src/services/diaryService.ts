import axios from "axios";
import type { Diary, NewDiary } from "../types";

const getAll = async () => {
  return await axios
    .get<Diary[]>("/api/diaries")
    .then((response) => response.data);
};

const create = async (object: NewDiary): Promise<Diary> => {
  console.log("new diary:", object);
  return await axios
    .post<Diary>("/api/diaries", object)
    .then((response) => response.data);
};

export default { getAll, create };
