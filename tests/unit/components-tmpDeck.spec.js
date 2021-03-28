import { shallowMount, createLocalVue } from "@vue/test-utils";
import { userDecksMock } from "./testUtils/decks";
import TmpDeck from "@/components/TmpDeck";
import Vuex from "vuex";
import { config } from "@vue/test-utils";
config.showDeprecationWarnings = false;

const localVue = createLocalVue();
localVue.use(Vuex);

let getters = {
  getTmpDeck: () => {
    return userDecksMock[0];
  },
};

let actions = {
  removeCardFromTmpDeck: () => null,
};

let mutations = {
  changeTmpDeck: () => null,
};

let store = new Vuex.Store({
  getters,
  actions,
  mutations,
});

const methods = {
  removeCard: jest.spyOn(TmpDeck.methods, "removeCard"),
  cancelDeck: jest.spyOn(TmpDeck.methods, "cancelDeck"),
};

describe("ModalConfirmation.vue - component", () => {
  const wrapper = shallowMount(TmpDeck, {
    localVue,
    store,
    methods,
  });

  it("has a main div tmp-deck", () => {
    const mainDiv = wrapper.find(".tmp-deck");
    expect(mainDiv.exists()).toBe(true);
  });

  it("render tmpDeck cards and images", () => {
    const cards = wrapper.find(".cards");
    const cardBox = cards.findAll(".card-box");
    expect(cardBox.length).toBe(9);
    const images = cards.findAll("img");
    expect(images.length).toBe(9);
  });

  it("each card has a remove buttom", () => {
    const removeButtom = wrapper.find(".card-box .remove-card-buttom");
    expect(removeButtom.exists()).toBe(true);
  });

  it("has status deck", () => {
    const statusDeck = wrapper.find(".tmp-deck .status-deck");
    expect(statusDeck.exists()).toBe(true);
  });

  it("has save button and cancel button", () => {
    const statusDeck = wrapper.find(".status-deck");
    const buttons = statusDeck.findAll("button");
    expect(buttons.at(0).element.innerHTML).toContain("Save");
    expect(buttons.at(1).element.innerHTML).toContain("Cancel");
  });

  it("save button disabled when total cards is < 60", () => {
    const saveButton = wrapper.find(".save-deck");
    expect(saveButton.element.disabled).toBe(true);
  });

  it("has saveDeck method", () => {
    const saveDeck = wrapper.vm.saveDeck;
    expect(saveDeck).not.toBe(undefined);
  });

  it("has cancelDeck method", () => {
    const cancelDeck = wrapper.vm.cancelDeck;
    expect(cancelDeck).not.toBe(undefined);
  });

  it("cancel-deck calls cancelDeck method", async () => {
    methods.cancelDeck.mockClear();
    const cancelDeck = wrapper.find(".cancel-deck");
    await cancelDeck.trigger("click");
    expect(methods.cancelDeck).toBeCalled();
  });

  it("has removeCard method", () => {
    const removeCard = wrapper.vm.removeCard;
    expect(removeCard).not.toBe(undefined);
  });

  it("remove-card-buttom should calls removeCard method", async () => {
    methods.removeCard.mockClear();
    const removeButtom = wrapper.find(".remove-card-buttom");
    await removeButtom.trigger("click");
    expect(methods.removeCard).toBeCalled();
  });

  it("status-deck renders amount of cards", () => {
    const deckStatus = wrapper.find(".status-deck p");
    expect(deckStatus.text()).toBe("Total cards: 9/60");
  });
});
