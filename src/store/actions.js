import { scryFallAutoComplete } from "@/services/scryfall";

export const actions = {
  fetchAutocomplete({ commit, state }, text) {
    state.loadingAutoComplete = true;
    scryFallAutoComplete(text)
      .then((response) => {
        commit("changeAutocomplete", response.data.data);
        state.loadingAutoComplete = false;
      })
      .catch(() => {
        state.globalError = "Error fetching auto complete data";
        state.loadingAutoComplete = false;
      });
  },
  removeDeck({ commit, state }, index) {
    let newDeck = [...state.userDecks];
    newDeck.splice(index, 1);
    commit("changeUsersDecks", newDeck);
  },
  addCardToTmpDeck({ commit, state }, payload) {
    let newTmpDeck = [...state.tmpDeck];

    let sameCard = 0;
    let indexSameCard = 0;

    const isBasicLand = payload.type_line.includes("Basic Land");

    newTmpDeck.map((card, index) => {
      if (card.id == payload.id) {
        sameCard = newTmpDeck[index].amount;
        indexSameCard = index;
      }
    });

    if (sameCard) {
      if (isBasicLand || sameCard < 4) {
        newTmpDeck[indexSameCard].amount += 1;
        commit("changeTmpDeck", newTmpDeck);
      } else {
        state.globalError = "Only 4 card of the same name, except basic land";
      }
      return;
    }

    const card = {
      object: payload.object,
      id: payload.id,
      name: payload.name,
      image_uris: payload.image_uris,
      type_line: payload.type_line,
      amount: 1,
    };

    newTmpDeck.push(card);
    commit("changeTmpDeck", newTmpDeck);
  },
  removeCardFromTmpDeck({ commit, state }, index) {
    let newTmpDeck = [...state.tmpDeck];
    if (newTmpDeck[index].amount > 1) {
      newTmpDeck[index].amount -= 1;
    } else {
      newTmpDeck.splice(index, 1);
    }
    commit("changeTmpDeck", newTmpDeck);
  },
  addTextError({ state }, text) {
    state.globalError = text;
  },
};
