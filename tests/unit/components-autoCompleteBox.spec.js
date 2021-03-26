import { shallowMount } from "@vue/test-utils";
import AutoCompleteBox from "@/components/AutoCompleteBox";

describe("AutoCompleteBox.vue - component", () => {
  const wrapper = shallowMount(AutoCompleteBox);

  it("has a main div auto-complete-box", () => {
    const mainDiv = wrapper.find(".auto-complete-box");
    expect(mainDiv.exists()).toBe(true);
  });

  it("has words prop", () => {
    expect("words" in wrapper.props()).toBe(true);
  });

  it("paragraph emits an event 'wordClicked' when cliked", async () => {
    await wrapper.setProps({ words: ["orc", "elf"] });
    const p = wrapper.find(".auto-complete-box p");
    await p.trigger("click");
    expect(wrapper.emitted().wordClicked).toBeTruthy();
  });

  it("renders words correctly", async () => {
    const mainDiv = wrapper.find(".auto-complete-box");
    await wrapper.setProps({ words: ["Grand Orc"] });
    expect(mainDiv.text()).toBe("Grand Orc");
  });
});
