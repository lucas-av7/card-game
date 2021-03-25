import { shallowMount, createLocalVue } from "@vue/test-utils";
import App from "@/App";
import Vuex from "vuex";

describe("App.vue", () => {
  const localVue = createLocalVue();
  localVue.use(Vuex);

  let getters = {
    getGlobalLoading: () => false,
  };

  let store = new Vuex.Store({
    getters,
  });

  const wrapper = shallowMount(App, {
    stubs: ["router-link", "router-view"],
    localVue,
    store,
  });

  it("renders the component", () => {
    let msg = "Card Game";
    expect(wrapper.text()).toMatch(msg);
  });

  it("has GlobalLoading component", () => {
    const globalLoading = wrapper.findComponent({ name: "GlobalLoading" });
    expect(globalLoading.exists()).toBe(true);
  });
});
