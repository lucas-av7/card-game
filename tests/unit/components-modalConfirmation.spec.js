import { shallowMount } from "@vue/test-utils";
import ModalConfirmation from "@/components/ModalConfirmation";

describe("ModalConfirmation.vue - component", () => {
  const wrapper = shallowMount(ModalConfirmation);

  it("has a main div modal-confirmation", () => {
    const mainDiv = wrapper.find(".modal-confirmation");
    expect(mainDiv.exists()).toBe(true);
  });

  it("emits 'close' event when user clicks in outside of modal", async () => {
    const mainDiv = wrapper.find(".overlay");
    await mainDiv.trigger("click");
    expect(wrapper.emitted().close).toBeTruthy();
  });

  it("emits 'close' event when user clicks on close button", async () => {
    const button = wrapper.find(".cancel");
    await button.trigger("click");
    expect(wrapper.emitted().close.length).toBe(2);
  });

  it("emits 'confirm' event when user clicks on confirm button", async () => {
    const button = wrapper.find(".confirm");
    await button.trigger("click");
    expect(wrapper.emitted().confirm).toBeTruthy();
  });
});
