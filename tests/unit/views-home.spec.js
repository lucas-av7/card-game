import { shallowMount } from "@vue/test-utils";
import Home from "@/views/Home";

describe("Home.vue - view", () => {
  it("renders a button", () => {
    const wrapper = shallowMount(Home);
    const button = wrapper.find("button");
    expect(button.exists()).toBe(true);
    expect(button.text()).toBe("Create new deck");
  });
});
