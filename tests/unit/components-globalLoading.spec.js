import { shallowMount } from "@vue/test-utils";
import GlobalLoading from "@/components/GlobalLoading";

describe("GlobalLoading.vue - component", () => {
  const wrapper = shallowMount(GlobalLoading);

  it("has a main div global-loading", () => {
    const mainDiv = wrapper.find(".global-loading");
    expect(mainDiv.exists()).toBe(true);
  });
});
