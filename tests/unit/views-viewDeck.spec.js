import { shallowMount, createLocalVue } from "@vue/test-utils";
import { userDecksMock } from "./testUtils/decks";
import Vuex from "vuex";
import ViewDeck from "@/views/ViewDeck";

describe("ViewDeck.vue - view", () => {
  const localVue = createLocalVue();
  localVue.use(Vuex);

  let getters = {
    getUsersDecks: () => userDecksMock,
  };

  let store = new Vuex.Store({
    getters,
  });

  const wrapper = shallowMount(ViewDeck, {
    localVue,
    store,
    propsData: { id: 1 },
  });

  it("has a main div view-deck", () => {
    const mainDiv = wrapper.find(".view-deck");
    expect(mainDiv.exists()).toBe(true);
  });

  it("has a h2 title", () => {
    const mainDiv = wrapper.find("h2");
    expect(mainDiv.exists()).toBe(true);
    expect(mainDiv.text()).toBe("Deck: 1");
  });
});
