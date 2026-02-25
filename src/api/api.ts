import axios from "axios";

const API_KEY = import.meta.env.VITE_LOTR_API_KEY;

export const api = axios.create({
  baseURL: "https://the-one-api.dev/v2",
  headers: {
    Authorization: `Bearer ${API_KEY}`,
  },
});