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

  it("renders 'Are you sure?' when passed as prop", async () => {
    await wrapper.setProps({ msg: "Are you sure?" });
    const modalBox = wrapper.find(".modal-box p");
    expect(modalBox.text()).toBe("Are you sure?");
  });

  it("renders Cancel and Confirm buttons", () => {
    const cancelButton = wrapper.find(".cancel");
    const confirmButton = wrapper.find(".confirm");
    expect(cancelButton.exists()).toBe(true);
    expect(confirmButton.exists()).toBe(true);
  });
});
