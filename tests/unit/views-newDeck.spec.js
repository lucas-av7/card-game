import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import NewDeck from "@/views/NewDeck";
import { config } from "@vue/test-utils";
import { userDecksMock } from "./testUtils/decks";
import { mutations } from "@/store/mutations.js";
import { state } from "../../src/store/state";

config.showDeprecationWarnings = false;

describe("NewDeck.vue - view", () => {
  const localVue = createLocalVue();
  localVue.use(Vuex);

  let getters = {
    getAutocomplete: () => [],
    getTmpDeck: (state) => {
      return state.tmpDeck;
    },
    getUsersDecks: (state) => {
      return state.userDecks;
    },
    getLoadingAutoComplete: () => {
      return state.loadingAutoComplete;
    },
  };

  let store = new Vuex.Store({
    getters,
    state: { tmpDeck: [], userDecks: userDecksMock },
    mutations: {
      changeAutocomplete: jest.fn(),
      changeTmpDeck: mutations.changeTmpDeck,
    },
  });

  const methods = {
    autoCompleteSearch: jest.spyOn(NewDeck.methods, "autoCompleteSearch"),
    callGetAutocomplete: jest.fn(),
    searchCard: jest.fn(),
    addCard: jest.fn(),
  };

  const wrapper = shallowMount(NewDeck, {
    localVue,
    methods,
    store,
  });

  const data = wrapper.vm.$data;

  const wrapperEditMode = shallowMount(NewDeck, {
    localVue,
    methods,
    store,
    propsData: { id: 1 },
  });

  it("renders a H2", () => {
    const h2 = wrapper.find("h2");
    expect(h2.exists()).toBe(true);
  });

  it("H2 text changes depending on having id params or not", () => {
    const h2 = wrapper.find("h2");
    expect(h2.text()).toBe("Create new deck");
    const h2EditMode = wrapperEditMode.find("h2");
    expect(h2EditMode.text()).toBe("Edit deck 1");
  });

  it("has a paragraph to explain the search field", () => {
    const p = wrapper.find(".search-text");
    expect(p.exists()).toBe(true);
    expect(p.element.tagName).toBe("P");
    expect(p.text()).toBe("Search by card name");
  });

  it("has a input field", () => {
    const inputField = wrapper.find(".input-card-search");
    expect(inputField.exists()).toBe(true);
  });

  it("has a submit button", () => {
    const button = wrapper.find(".button-card-search");
    expect(button.exists()).toBe(true);
    expect(button.text()).toBe("Search");
  });

  it("has a autocomplete on data", () => {
    expect("autocomplete" in data).toBe(true);
  });

  it("has searchText on data", () => {
    expect("searchText" in data).toBe(true);
  });

  it("updates searchText when input values on search field", () => {
    const inputField = wrapper.find(".input-card-search");
    inputField.setValue("new value");
    expect(data.searchText).toBe("new value");
  });

  it("calls callGetAutocomplete method when type on search field", async () => {
    const inputField = wrapper.find(".input-card-search");
    await inputField.trigger("click");
    expect(methods.callGetAutocomplete).toHaveBeenCalled();
  });

  it("has AutoCompleteBox component", () => {
    const autoCompleteBox = wrapper.findComponent({ name: "AutoCompleteBox" });
    expect(autoCompleteBox.exists()).toBe(true);
  });

  it("change searchText when call autoCompleteSearch with parameter", async () => {
    await wrapper.vm.autoCompleteSearch("test");
    const searchText = wrapper.vm.$data.searchText;
    expect(searchText).toBe("test");
  });

  it("calls autoCompleteSearch and searchCard when word is clicked", () => {
    const autoCompleteBox = wrapper.findComponent({ name: "AutoCompleteBox" });
    autoCompleteBox.vm.$emit("autoCompleteSearch");
    expect(methods.autoCompleteSearch).toHaveBeenCalled();
    expect(methods.searchCard).toHaveBeenCalled();
  });

  it("calls searchCard when button-card-search is clicked", async () => {
    methods.searchCard.mockClear();
    const button = wrapper.find(".button-card-search");
    await button.trigger("click");
    expect(methods.searchCard).toHaveBeenCalled();
  });

  it("calls searchCard when enter is pressed inside input", async () => {
    methods.searchCard.mockClear();
    const input = wrapper.find(".input-card-search");
    await input.trigger("keyup.enter");
    expect(methods.searchCard).toHaveBeenCalled();
  });

  it("has cards array on data", async () => {
    expect("cards" in data).toBe(true);
    expect(Array.isArray(data.cards)).toBe(true);
  });

  it("render cards properly", async () => {
    await wrapper.setData({ cards: userDecksMock[0] });
    const cardsSection = wrapper.find(".cards");
    const imgs = cardsSection.findAll("img");
    expect(imgs.length).toBe(3);
  });

  it("has pagination on data", () => {
    expect("pagination" in data).toBe(true);
    expect(data.pagination.page).toBe(1);
    expect(data.pagination.totalCards).toBe(0);
    expect(data.pagination.hasMore).toBe(false);
  });

  it("has showPagination on data", () => {
    expect("showPagination" in data).toBe(true);
    expect(data.showPagination).toBe(false);
  });

  it("has pagination box with buttons and status", () => {
    const paginationBox = wrapper.find(".pagination-box");
    const status = paginationBox.find("p");
    const buttons = paginationBox.findAll("button");
    expect(paginationBox.exists()).toBe(true);
    expect(status.exists()).toBe(true);
    expect(buttons.length).toBe(2);
  });

  it("render text status properly", async () => {
    const status = wrapper.find(".page-info > p");
    await wrapper.setData({ pagination: { totalCards: 1 } });
    expect(status.text()).toContain("card.");
    await wrapper.setData({ pagination: { totalCards: 10 } });
    expect(status.text()).toContain("cards.");
  });

  it("Previous is disbled in page one and Next when in last page", async () => {
    const buttonsArea = wrapper.find(".buttons-area");
    const buttons = buttonsArea.findAll("button");
    await wrapper.setData({ pagination: { page: 1, hasMore: false } });
    expect(buttons.at(0).element.disabled).toBe(true);
    expect(buttons.at(1).element.disabled).toBe(true);
  });

  it("Previous is enabled in page two+ and Next when has more pages", async () => {
    const buttonsArea = wrapper.find(".buttons-area");
    const buttons = buttonsArea.findAll("button");
    await wrapper.setData({ pagination: { page: 2, hasMore: true } });
    expect(buttons.at(0).element.disabled).toBe(false);
    expect(buttons.at(1).element.disabled).toBe(false);
  });

  it("Should call addCard when add-card-button is clicked", async () => {
    const addCardButton = wrapper.find(".add-card-button");
    await addCardButton.trigger("click");
    expect(methods.addCard).toHaveBeenCalled();
  });

  it("has TmpDeck component", () => {
    const TmpDeck = wrapper.findComponent({ name: "TmpDeck" });
    expect(TmpDeck.exists()).toBe(true);
  });

  it("When in edit mode, loads the deck to tmpDeck", () => {
    expect(wrapperEditMode.vm.$store.state.tmpDeck.length).toBe(3);
  });
});
