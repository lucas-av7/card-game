import { shallowMount, createLocalVue } from "@vue/test-utils";
import VueRouter from "vue-router";
import Vuex from "vuex";
import Home from "@/views/Home";
import { userDecksMock } from "./testUtils/decks";
import { config } from "@vue/test-utils";
config.showDeprecationWarnings = false;

const goToNewDeckView = jest.fn();
const randomDeck = jest.fn();

describe("Home.vue - view", () => {
  const localVue = createLocalVue();
  localVue.use(VueRouter);
  localVue.use(Vuex);

  let getters = {
    getUsersDecks: () => userDecksMock,
  };

  const router = new VueRouter();
  let store = new Vuex.Store({
    getters,
  });

  const wrapper = shallowMount(Home, {
    localVue,
    router,
    store,
    methods: {
      goToNewDeckView,
      randomDeck,
    },
  });

  it("renders a 'create new deck' button", () => {
    const button = wrapper.find(".create-deck-button");
    expect(button.exists()).toBe(true);
    expect(button.text()).toBe("Create new deck");
  });

  it("renders a 'new random deck' button", () => {
    const button = wrapper.find(".random-deck-button");
    expect(button.exists()).toBe(true);
    expect(button.text()).toBe("New random deck");
  });

  it("moves to new-deck route when click on 'create new deck' button", async () => {
    const button = wrapper.find(".create-deck-button");
    await button.trigger("click");
    expect(goToNewDeckView).toHaveBeenCalled();
  });

  it("has Deck component", () => {
    const deckComponent = wrapper.findComponent({ name: "Deck" });
    expect(deckComponent.exists()).toBe(true);
  });

  it("has randomDeck method", () => {
    const randomDeck = wrapper.vm.randomDeck;
    expect(randomDeck).not.toBe(undefined);
  });

  it("random-deck-button calling randomDeck method", async () => {
    const button = wrapper.find(".random-deck-button");
    await button.trigger("click");
    expect(randomDeck).toHaveBeenCalled();
  });
});
