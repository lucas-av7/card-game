import Vue from "vue";
import Vuex from "vuex";
import { scryFallAutoComplete } from "@/services/scryfall";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    autocomplete: [],
  },
  mutations: {
    changeAutocomplete(state, words) {
      state.autocomplete = words;
    },
  },
  actions: {
    fetchAutocomplete({ commit }, text) {
      scryFallAutoComplete(text).then((r) => {
        commit("changeAutocomplete", r.data.data);
      });
    },
  },
  getters: {
    getAutocomplete: (state) => {
      return state.autocomplete;
    },
  },
});
