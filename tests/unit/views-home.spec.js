import { shallowMount, createLocalVue } from "@vue/test-utils";
import VueRouter from "vue-router";
import Home from "@/views/Home";

describe("Home.vue - view", () => {
  const localVue = createLocalVue();
  localVue.use(VueRouter);
  const router = new VueRouter();

  const goToNewDeckView = jest.spyOn(Home.methods, "goToNewDeckView");

  const wrapper = shallowMount(Home, {
    localVue,
    router,
  });

  it("renders a 'create new deck' button", () => {
    const button = wrapper.find(".create-deck-button");
    expect(button.exists()).toBe(true);
    expect(button.text()).toBe("Create new deck");
  });

  it("renders a 'new random deck' button", () => {
    const button = wrapper.find(".random-deck-button");
    expect(button.exists()).toBe(true);
    expect(button.text()).toBe("New random deck");
  });

  it("moves to new-deck route when click on 'create new deck' button", async () => {
    const button = wrapper.find(".create-deck-button");
    await button.trigger("click");
    expect(goToNewDeckView).toHaveBeenCalled();
  });
});
