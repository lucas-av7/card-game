import store from "@/store";
import { mutations } from "@/store/mutations";

describe("Store - Vuex", () => {
  it("mutations has loadLocalStorage function", () => {
    expect("loadLocalStorage" in store._mutations).toBe(true);
  });

  it("state has autocomplete array", () => {
    expect("autocomplete" in store.state).toBe(true);
    expect(Array.isArray(store.state.autocomplete)).toBe(true);
  });

  it("getters has getAutocomplete function", () => {
    expect("getAutocomplete" in store.getters).toBe(true);
  });

  it("actions has fetchAutocomplete function", () => {
    expect("fetchAutocomplete" in store._actions).toBe(true);
  });

  it("mutations has changeAutocomplete function", () => {
    expect("changeAutocomplete" in store._mutations).toBe(true);
  });

  it("state has userDecks array", () => {
    expect("userDecks" in store.state).toBe(true);
    expect(Array.isArray(store.state.autocomplete)).toBe(true);
  });

  it("getters has getUsersDecks function", () => {
    expect("getUsersDecks" in store.getters).toBe(true);
  });

  it("state has globalLoading", () => {
    expect("globalLoading" in store.state).toBe(true);
    expect(store.state.globalLoading).toBe(false);
  });

  it("getters has getGlobalLoading function", () => {
    expect("getGlobalLoading" in store.getters).toBe(true);
  });

  it("mutations has changeUsersDecks function", () => {
    expect("changeUsersDecks" in store._mutations).toBe(true);
  });

  it("changeUsersDecks change the state", () => {
    const { changeUsersDecks } = mutations;
    const state = { userDecks: [] };
    const newDeck = [{ id: 1 }, { id: 2 }];
    changeUsersDecks(state, newDeck);
    expect(state.userDecks.length).toBe(2);
  });

  it("mutations has changeGlobalLoading function", () => {
    expect("changeGlobalLoading" in store._mutations).toBe(true);
  });

  it("changeGlobalLoading change the state", () => {
    const { changeGlobalLoading } = mutations;
    const state = { globalLoading: false };
    const status = true;
    changeGlobalLoading(state, status);
    expect(state.globalLoading).toBe(true);
  });

  it("state has amountTrack", () => {
    expect("amountTrack" in store.state).toBe(true);
    expect(store.state.amountTrack.current).toBe(0);
    expect(store.state.amountTrack.expected).toBe(0);
  });

  it("getters has getAmountTrack function", () => {
    expect("getAmountTrack" in store.getters).toBe(true);
  });

  it("mutations has changeAmountTrack function", () => {
    expect("changeAmountTrack" in store._mutations).toBe(true);
  });

  it("actions has removeDeck function", () => {
    expect("removeDeck" in store._actions).toBe(true);
  });

  it("state has tmpDeck array", () => {
    expect("tmpDeck" in store.state).toBe(true);
    expect(Array.isArray(store.state.tmpDeck)).toBe(true);
  });

  it("actions has addCardToTmpDeck function", () => {
    expect("addCardToTmpDeck" in store._actions).toBe(true);
  });

  it("mutations has changeTmpDeck function", () => {
    expect("changeTmpDeck" in store._mutations).toBe(true);
  });

  it("changeTmpDeck change the state", () => {
    const { changeTmpDeck } = mutations;
    const state = { tmpDeck: [] };
    const tmpDeck = ["one", "two"];
    changeTmpDeck(state, tmpDeck);
    expect(state.tmpDeck.length).toBe(2);
  });

  it("getters has getTmpDeck function", () => {
    expect("getTmpDeck" in store.getters).toBe(true);
  });

  it("getTmpDeck should return tmpDeck", () => {
    const tmpDeck = store.getters.getTmpDeck;
    const storeTmpDeck = store.state.tmpDeck;
    expect(tmpDeck === storeTmpDeck).toBe(true);
  });

  it("actions has removeCardFromTmpDeck function", () => {
    expect("removeCardFromTmpDeck" in store._actions).toBe(true);
  });

  it("state has loadingAutoComplete", () => {
    expect("loadingAutoComplete" in store.state).toBe(true);
    expect(store.state.loadingAutoComplete).toBe(false);
  });

  it("getters has getLoadingAutoComplete", () => {
    expect("getLoadingAutoComplete" in store.getters).toBe(true);
  });
});
