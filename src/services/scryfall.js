import axios from "axios";

export const instance = axios.create({
  baseURL: "https://api.scryfall.com",
});

export const scryFallSets = () => {
  return instance.get("/sets");
};

export const scryFallRandomCard = () => {
  return instance.get("/cards/random");
};

export const scryFallSearchCard = (text) => {
  return instance.get(`/cards/search?q=${text}`);
};

export const scryFallAutoComplete = (text) => {
  return instance.get(`/cards/autocomplete?q=${text}`);
};
