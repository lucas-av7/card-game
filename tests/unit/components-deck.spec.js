import { shallowMount } from "@vue/test-utils";
import Deck from "@/components/Deck";
import { userDecksMock } from "./testUtils/decks";

describe("AutoCompleteBox.vue - component", () => {
  const wrapper = shallowMount(Deck, {
    propsData: {
      deckCards: userDecksMock[0],
    },
  });

  it("has a main div deck", () => {
    const mainDiv = wrapper.find(".deck");
    expect(mainDiv.exists()).toBe(true);
  });
});
