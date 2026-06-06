import axios from "axios";
import type { Diary, NewDiary } from "../types";

const getAll = async (): Promise<Diary[]> => {
  return await axios
    .get<Diary[]>("/api/diaries")
    .then((response) => response.data)
    .catch((error) => {
      if (axios.isAxiosError(error)) {
        console.log(`Error: ${error.status} - ${error.message}`);
      } else {
        console.error(error);
      }
      throw error;
    });
};

const create = async (object: NewDiary): Promise<Diary> => {
  //console.log("new diary:", object);
  return await axios
    .post<Diary>("/api/diaries", object)
    .then((response) => response.data)
    .catch((error) => {
      if (axios.isAxiosError(error)) {
        console.log(`Error: ${error.status} - ${error.response.statusText}`);
        throw error.response;
      } else {
        console.error(error);
        throw error;
      }
    });
};

export default { getAll, create };
