import Vue from "vue";
import Vuex from "vuex";
import { scryFallAutoComplete } from "@/services/scryfall";
import { userDecksMock } from "../../tests/unit/testUtils/decks";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    autocomplete: [],
    userDecks: [userDecksMock],
  },
  mutations: {
    loadLocalStorage(state) {
      const userDecks = localStorage.getItem("userDecks");
      if (userDecks) {
        state.userDecks = JSON.parse(userDecks);
      }
    },
    changeAutocomplete(state, words) {
      state.autocomplete = words;
    },
    changeUsersDeck(state, deck) {
      state.userDecks.push(deck);
    },
  },
  actions: {
    fetchAutocomplete({ commit }, text) {
      scryFallAutoComplete(text).then((r) => {
        commit("changeAutocomplete", r.data.data);
      });
    },
    addUsersDeck({ commit }) {
      return commit;
    },
  },
  getters: {
    getAutocomplete: (state) => {
      return state.autocomplete;
    },
    getUsersDecks: (state) => {
      return state.userDecks;
    },
  },
});
