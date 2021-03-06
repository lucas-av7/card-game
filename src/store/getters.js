export const getters = {
  getAutocomplete: (state) => {
    return state.autocomplete;
  },
  getUsersDecks: (state) => {
    return state.userDecks;
  },
  getGlobalLoading: (state) => {
    return state.globalLoading;
  },
  getAmountTrack: (state) => {
    return state.amountTrack;
  },
  getTmpDeck: (state) => {
    return state.tmpDeck;
  },
  getLoadingAutoComplete: (state) => {
    return state.loadingAutoComplete;
  },
  getGlobalError(state) {
    return state.globalError;
  },
};
