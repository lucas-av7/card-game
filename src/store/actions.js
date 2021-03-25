import { scryFallAutoComplete } from "@/services/scryfall";

export const actions = {
  fetchAutocomplete({ commit }, text) {
    scryFallAutoComplete(text).then((r) => {
      commit("changeAutocomplete", r.data.data);
    });
  },
  addUsersDeck({ commit, state }, deck) {
    console.log(state, deck);
    return commit;
  },
};
