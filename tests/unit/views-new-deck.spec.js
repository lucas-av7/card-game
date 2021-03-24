import { shallowMount } from "@vue/test-utils";
import NewDeck from "@/views/NewDeck";

describe("NewDeck.vue - view", () => {
  const wrapper = shallowMount(NewDeck);

  it("renders a H2", () => {
    const h2 = wrapper.find("h2");
    expect(h2.exists()).toBe(true);
    expect(h2.text()).toBe("Create new deck");
  });
});
