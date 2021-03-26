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
  removeDeck({ commit, state }, index) {
    let newDeck = [...state.userDecks];
    newDeck.splice(index, 1);
    commit("changeUsersDecks", newDeck);
  },
};
