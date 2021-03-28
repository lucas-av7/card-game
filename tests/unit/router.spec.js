import vueRouter from "@/router/";

describe("Router - Vue Router", () => {
  const router = vueRouter.options;

  it("Router has history mode", () => {
    expect(router.mode).toBe("history");
  });

  it("Router has home route", () => {
    const home = router.routes.filter((route) => {
      return route.name == "Home";
    });
    expect(home.length).toBe(1);
    expect(home[0].path).toBe("/");
    expect(home[0].component.name).toBe("Home");
  });

  it("Router has NewDeck route", () => {
    const home = router.routes.filter((route) => {
      return route.name == "NewDeck";
    });
    expect(home.length).toBe(1);
    expect(home[0].path).toBe("/new-deck");
    expect(home[0].component.name).toBe("NewDeck");
  });

  it("Router has ViewDeck route", () => {
    const home = router.routes.filter((route) => {
      return route.name == "ViewDeck";
    });
    expect(home.length).toBe(1);
    expect(home[0].path).toBe("/view-deck/:id");
    expect(home[0].component.name).toBe("ViewDeck");
    expect(home[0].props).toBe(true);
  });
});
