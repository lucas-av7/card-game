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

  it("has delete-deck button", () => {
    const deleteDeck = wrapper.find(".delete-deck");
    expect(deleteDeck.exists()).toBe(true);
    expect(deleteDeck.text()).toBe("Delete deck");
  });

  it("shows ModalConfirmation when delete-deck button is clicked", async () => {
    const deleteDeck = wrapper.find(".delete-deck");
    await deleteDeck.trigger("click");
    expect(deleteDeck.text()).toBe("Delete deck");

    const ModalConfirmation = wrapper.findComponent({
      name: "ModalConfirmation",
    });
    expect(ModalConfirmation.exists()).toBe(true);
  });

  it("renders deck-status correctly", async () => {
    const deckStatus = wrapper.find(".deck-status");
    const paragraphs = deckStatus.findAll("p");
    expect(paragraphs.at(0).text()).toBe("Total cards: 9");
  });
});
