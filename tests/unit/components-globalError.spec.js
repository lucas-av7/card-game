import { shallowMount } from "@vue/test-utils";
import GlobalError from "@/components/GlobalError";

describe("GlobalError.vue - component", () => {
  const wrapper = shallowMount(GlobalError);

  it("has a main div global-error", () => {
    const mainDiv = wrapper.find(".global-error");
    expect(mainDiv.exists()).toBe(true);
  });

  it("renders error properly", async () => {
    const p = wrapper.find(".global-error p");
    await wrapper.setProps({ error: "Error test" });
    expect(p.text()).toBe("Error test");
  });
});
