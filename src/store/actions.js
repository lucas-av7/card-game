import { scryFallAutoComplete } from "@/services/scryfall";

export const actions = {
  fetchAutocomplete({ commit }, text) {
    scryFallAutoComplete(text)
      .then((response) => {
        commit("changeAutocomplete", response.data.data);
      })
      .catch((error) => {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      });
  },
  addUsersDeck({ commit, state }, deck) {
    console.log(state, deck);
    return commit;
  },
};
