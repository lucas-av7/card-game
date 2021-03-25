import { shallowMount } from "@vue/test-utils";
import GlobalLoading from "@/components/GlobalLoading";

describe("GlobalLoading.vue - component", () => {
  const wrapper = shallowMount(GlobalLoading);

  it("has a main div global-loading", () => {
    const mainDiv = wrapper.find(".global-loading");
    expect(mainDiv.exists()).toBe(true);
  });

  it("has AmountTrack component", () => {
    const AmountTrack = wrapper.findComponent({ name: "AmountTrack" });
    expect(AmountTrack.exists()).toBe(true);
  });
});
