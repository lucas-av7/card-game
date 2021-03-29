import axios from "axios";

export const instance = axios.create({
  baseURL: "https://api.scryfall.com",
});

export const scryFallRandomCard = () => {
  return instance.get("/cards/random");
};

export const scryFallSearchCard = (text, page = 1) => {
  return instance.get(`/cards/search?q=${text}&page=${page}`);
};

export const scryFallAutoComplete = (text) => {
  return instance.get(`/cards/autocomplete?q=${text}`);
};
