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
    localStorage.setItem("userDecks", JSON.stringify(newDeck));
  },
  changeGlobalLoading(state, status) {
    state.globalLoading = status;
  },
  changeAmountTrack(state, { cards, minQtyCard }) {
    let newAmountTrack = { ...state.amountTrack };
    newAmountTrack.current = cards;
    newAmountTrack.expected = minQtyCard;
    state.amountTrack = newAmountTrack;
  },
  changeTmpDeck(state, newTmpDeck) {
    state.tmpDeck = newTmpDeck;
  },
};
