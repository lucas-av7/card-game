import { shallowMount } from "@vue/test-utils";
import App from "@/App";

describe("App.vue", () => {
  const wrapper = shallowMount(App, {
    stubs: ["router-link", "router-view"],
  });

  it("renders the component", () => {
    let msg = "Card Game";
    expect(wrapper.text()).toMatch(msg);
  });
});
