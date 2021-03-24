import { shallowMount } from "@vue/test-utils";
import NewDeck from "@/views/NewDeck";

describe("NewDeck.vue - view", () => {
  const wrapper = shallowMount(NewDeck);

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
});
