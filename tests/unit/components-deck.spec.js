import { shallowMount } from "@vue/test-utils";
import Deck from "@/components/Deck";
import { userDecksMock } from "./testUtils/decks";

describe("Deck.vue - component", () => {
  const wrapper = shallowMount(Deck, {
    propsData: {
      deckCards: userDecksMock[0],
      index: 1,
    },
  });

  it("has a main div deck", () => {
    const mainDiv = wrapper.find(".deck");
    expect(mainDiv.exists()).toBe(true);
  });

  it("deck emits an event 'callViewDeck' when cliked", async () => {
    const p = wrapper.find(".deck");
    await p.trigger("click");
    expect(wrapper.emitted().callViewDeck).toBeTruthy();
  });

  it("has three images to compound a deck", () => {
    const images = wrapper.findAll(".deck img");
    expect(images.length).toBe(3);
  });
});
