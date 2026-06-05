import axios from "axios";
import type { Diary } from "../types";

const getAll = async () => {
  return await axios
    .get<Diary[]>("/api/diaries")
    .then((response) => response.data);
};

export default { getAll };
