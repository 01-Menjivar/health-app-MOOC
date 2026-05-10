import axios from "axios";
import { apiBaseUrl } from "../constants";
import { Entry, EntryWithoutId } from "../types";

const addEntry = async (entry: EntryWithoutId, id: string): Promise<Entry> => {
    const response = await axios.post<Entry>(`${apiBaseUrl}/patients/${id}/entries`, entry);
    return response.data;
};

export default {
    addEntry
};