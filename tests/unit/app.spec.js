import { shallowMount } from "@vue/test-utils";
import App from "@/App";

describe("App.vue", () => {
  it("renders the component", () => {
    let msg = "Card Game";
    const wrapper = shallowMount(App, {
      stubs: ["router-link", "router-view"],
    });
    expect(wrapper.text()).toMatch(msg);
  });
});
