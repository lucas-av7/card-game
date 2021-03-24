import axios from "axios";

export const instance = axios.create({
  baseURL: "https://api.scryfall.com",
});

export const scryFallSets = () => {
  return instance.get("/sets");
};
