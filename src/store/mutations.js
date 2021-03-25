export const mutations = {
  loadLocalStorage(state) {
    const userDecks = localStorage.getItem("userDecks");
    if (userDecks) {
      state.userDecks = JSON.parse(userDecks);
    }
  },
  changeAutocomplete(state, words) {
    state.autocomplete = words;
  },
  changeUsersDecks(state, newDeck) {
    state.userDecks = newDeck;
  },
};
