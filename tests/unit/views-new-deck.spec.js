import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import NewDeck from "@/views/NewDeck";

describe("NewDeck.vue - view", () => {
  const localVue = createLocalVue();
  localVue.use(Vuex);

  let getters = {
    getAutocomplete: () => [],
  };

  let store = new Vuex.Store({
    getters,
  });

  const callGetAutocomplete = jest.spyOn(
    NewDeck.methods,
    "callGetAutocomplete"
  );

  const wrapper = shallowMount(NewDeck, { store, localVue });

  it("renders a H2", () => {
    const h2 = wrapper.find("h2");
    expect(h2.exists()).toBe(true);
    expect(h2.text()).toBe("Create new deck");
  });

  it("has a paragraph to explain the search field", () => {
    const p = wrapper.find(".search-text");
    expect(p.exists()).toBe(true);
    expect(p.element.tagName).toBe("P");
    expect(p.text()).toBe("Search by card name, types, rarity, sets, etc");
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
    const data = wrapper.vm.$data;
    expect("autocomplete" in data).toBe(true);
  });

  it("has searchText on data", () => {
    const data = wrapper.vm.$data;
    expect("searchText" in data).toBe(true);
  });

  it("updates searchText when input values on search field", () => {
    const data = wrapper.vm.$data;
    const inputField = wrapper.find(".input-card-search");
    inputField.setValue("new value");
    expect(data.searchText).toBe("new value");
  });

  it("calls callGetAutocomplete method when type on search field", async () => {
    const inputField = wrapper.find(".input-card-search");
    await inputField.trigger("click");
    expect(callGetAutocomplete).toHaveBeenCalled();
  });

  it("has AutoCompleteBox component", () => {
    const autoCompleteBox = wrapper.findComponent({ name: "AutoCompleteBox" });
    expect(autoCompleteBox.exists()).toBe(true);
  });

  it("change searchText when call autoCompleteSearch with parameter", async () => {
    wrapper.vm.autoCompleteSearch("test");
    const searchText = wrapper.vm.$data.searchText;
    expect(searchText).toBe("test");
  });
});
