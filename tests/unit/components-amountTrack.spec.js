import { shallowMount, createLocalVue } from "@vue/test-utils";
import AmountTrack from "@/components/AmountTrack";
import Vuex from "vuex";

describe("AmountTrack.vue - component", () => {
  const localVue = createLocalVue();
  localVue.use(Vuex);

  let getters = {
    getAmountTrack: () => {
      return {
        current: 0,
        expected: 0,
      };
    },
  };

  let store = new Vuex.Store({
    getters,
  });
  const wrapper = shallowMount(AmountTrack, { localVue, store });

  it("has a main div amount-track", () => {
    const mainDiv = wrapper.find(".amount-track");
    expect(mainDiv.exists()).toBe(true);
  });
});
