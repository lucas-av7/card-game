import { shallowMount, createLocalVue } from "@vue/test-utils";
import GlobalLoading from "@/components/GlobalLoading";
import Vuex from "vuex";

const localVue = createLocalVue();
localVue.use(Vuex);

let getters = {
  getAmountTrack: () => {
    return { current: 0, expected: 1 };
  },
};

let store = new Vuex.Store({
  getters,
});

describe("GlobalLoading.vue - component", () => {
  const wrapper = shallowMount(GlobalLoading, { localVue, store });

  it("has a main div global-loading", () => {
    const mainDiv = wrapper.find(".global-loading");
    expect(mainDiv.exists()).toBe(true);
  });

  it("has AmountTrack component", () => {
    const AmountTrack = wrapper.findComponent({ name: "AmountTrack" });
    expect(AmountTrack.exists()).toBe(true);
  });
});
