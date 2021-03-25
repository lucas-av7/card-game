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

  it("actions has addUsersDeck function", () => {
    expect("addUsersDeck" in store._actions).toBe(true);
  });

  it("state has globalLoading", () => {
    expect("globalLoading" in store.state).toBe(true);
    expect(store.state.globalLoading).toBe(false);
  });

  it("getters has getGlobalLoading function", () => {
    expect("getGlobalLoading" in store.getters).toBe(true);
  });
});
