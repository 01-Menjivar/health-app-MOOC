import axios from "axios"
import { type DiaryEntry } from "../../types"
import {type NewDiaryEntry } from "../../types"

const baseUrl = "http://localhost:3000/api/diaries"

const fetchDiaries = async () => { 
  try {
    const response = await axios.get<DiaryEntry[]>(baseUrl);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
    const zodIssues = error.response?.data.error;
    const errorMessage = Array.isArray(zodIssues)
        ? zodIssues.map(issue => issue.message).join(", ")
        : error.message;
      throw new Error(errorMessage, {cause: error});
    }
    throw new Error("Unknown error", {cause: error});
  }
}

const addDiary = async (diary: NewDiaryEntry) => {
  try {
    const response = await axios.post<DiaryEntry>(baseUrl, diary);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
       const zodIssues = error.response?.data.error;
         const errorMessage = Array.isArray(zodIssues)
        ? zodIssues.map(issue => issue.message).join(", ")
        : error.message;
      throw new Error(errorMessage, {cause: error});
    }
     throw new Error("Unknown error", {cause: error});
  }
}

export default {fetchDiaries, addDiary}