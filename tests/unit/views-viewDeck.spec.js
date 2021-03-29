import { shallowMount, createLocalVue } from "@vue/test-utils";
import { userDecksMock } from "./testUtils/decks";
import Vuex from "vuex";
import ViewDeck from "@/views/ViewDeck";
import NewDeck from "@/views/NewDeck";
import { config } from "@vue/test-utils";
import VueRouter from "vue-router";
config.showDeprecationWarnings = false;

const methods = {
  editDeck: jest.spyOn(ViewDeck.methods, "editDeck"),
};

describe("ViewDeck.vue - view", () => {
  const localVue = createLocalVue();
  localVue.use(Vuex);
  localVue.use(VueRouter);

  const routes = [
    {
      path: "/view-deck/:id",
      name: "ViewDeck",
      component: ViewDeck,
      props: true,
    },
    {
      path: "/edit-deck/:id",
      name: "EditDeck",
      component: NewDeck,
      props: true,
    },
  ];

  const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
  });

  let getters = {
    getUsersDecks: () => userDecksMock,
  };

  let actions = {
    removeDeck: jest.fn(),
  };

  let store = new Vuex.Store({
    getters,
    actions,
  });

  const wrapper = shallowMount(ViewDeck, {
    localVue,
    store,
    propsData: { id: 1 },
    methods,
    router,
  });

  it("has a main div view-deck", () => {
    const mainDiv = wrapper.find(".view-deck");
    expect(mainDiv.exists()).toBe(true);
  });

  it("has a h2 title", () => {
    const mainDiv = wrapper.find("h2");
    expect(mainDiv.exists()).toBe(true);
    expect(mainDiv.text()).toBe("Deck: 1");
  });

  it("has edit-deck button", () => {
    const editDeck = wrapper.find(".edit-deck");
    expect(editDeck.exists()).toBe(true);
    expect(editDeck.text()).toBe("Edit deck");
  });

  it("has editDeck method", () => {
    const editDeck = wrapper.vm.editDeck;
    expect(editDeck).not.toBe(undefined);
  });

  it("edit-deck button should calls editDeck method", async () => {
    methods.editDeck.mockClear();
    const editDeck = wrapper.find(".edit-deck");
    await editDeck.trigger("click");
    expect(methods.editDeck).toHaveBeenCalled();
  });

  it("editDeck method should move to EditDeck page", async () => {
    expect(wrapper.vm.$route.name).toBe("EditDeck");
    expect(wrapper.vm.$route.params.id).toBe(1);
  });

  it("has delete-deck button", () => {
    const deleteDeck = wrapper.find(".delete-deck");
    expect(deleteDeck.exists()).toBe(true);
    expect(deleteDeck.text()).toBe("Delete deck");
  });

  it("shows ModalConfirmation when delete-deck button is clicked", async () => {
    const deleteDeck = wrapper.find(".delete-deck");
    await deleteDeck.trigger("click");
    expect(deleteDeck.text()).toBe("Delete deck");

    const ModalConfirmation = wrapper.findComponent({
      name: "ModalConfirmation",
    });
    expect(ModalConfirmation.exists()).toBe(true);
  });

  it("deleteDeck method calls removeDeck action", async () => {
    wrapper.vm.$router.push({ name: "ViewDeck", params: { id: 1 } });
    await wrapper.vm.deleteDeck();
    expect(wrapper.vm.$route.path).toBe("/");
    expect(actions.removeDeck).toHaveBeenCalled();
  });

  it("renders deck-status correctly", async () => {
    const deckStatus = wrapper.find(".deck-status");
    const paragraphs = deckStatus.findAll("p");
    expect(paragraphs.at(0).text()).toBe("Total cards: 9");
  });
});
