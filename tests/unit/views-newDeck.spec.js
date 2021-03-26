import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import NewDeck from "@/views/NewDeck";
import { config } from "@vue/test-utils";
import { userDecksMock } from "./testUtils/decks";
config.showDeprecationWarnings = false;

describe("NewDeck.vue - view", () => {
  const localVue = createLocalVue();
  localVue.use(Vuex);

  let getters = {
    getAutocomplete: () => [],
  };

  let store = new Vuex.Store({
    getters,
  });

  const methods = {
    autoCompleteSearch: jest.spyOn(NewDeck.methods, "autoCompleteSearch"),
    callGetAutocomplete: jest.fn(),
    searchCard: jest.fn(),
  };

  const wrapper = shallowMount(NewDeck, {
    localVue,
    methods,
    propsData: {
      deckCards: userDecksMock[0],
    },
    store,
  });

  const data = wrapper.vm.$data;

  it("renders a H2", () => {
    const h2 = wrapper.find("h2");
    expect(h2.exists()).toBe(true);
    expect(h2.text()).toBe("Create new deck");
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

  it("render cards properly", () => {
    const cardsSection = wrapper.find(".cards");
    const imgs = cardsSection.findAll("img");
    expect(imgs.length).toBe(3);
  });
});
