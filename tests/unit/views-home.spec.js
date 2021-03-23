import { shallowMount } from "@vue/test-utils";
import Home from "@/views/Home";

describe("Home.vue - view", () => {
  const wrapper = shallowMount(Home);

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
});
